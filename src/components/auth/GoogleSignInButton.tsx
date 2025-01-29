import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { auth } from './googleAuth';
import { useAuth } from '../auth/AuthContext';
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
} from "firebase/auth";
import AWS from 'aws-sdk';
import { useState } from 'react';
import { LoadingOverlay, useLoadingPhrases } from '../loading-overlay';

const GoogleSignInButton: React.FC = () => {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const loadingPhrase = useLoadingPhrases(isLoading);

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
    prompt: 'select_account'
  });
  googleProvider.addScope("https://www.googleapis.com/auth/classroom.courses.readonly");
  googleProvider.addScope("https://www.googleapis.com/auth/classroom.coursework.me.readonly");
  googleProvider.addScope("https://www.googleapis.com/auth/calendar.readonly");

  AWS.config.update({
    region: 'us-east-2',
    accessKeyId: 'AKIAYS2NRHAYPOXDAYV6',
    secretAccessKey: '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',
  });

  const dynamoDB = new AWS.DynamoDB.DocumentClient();

  const handleSignIn = async () => {
    setIsLoading(true);
    if (user) {
      console.log("User already signed in");
      navigate('/dashboard');
      return;
    }
    let userEmail: string | null = "";
    let userName: string | null = "";
    let userProfileImage: string | null = "";
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;
      userEmail = result.user?.email;
      userName = result.user?.displayName;
      userProfileImage = result.user?.photoURL;

      if (!accessToken || !userEmail || !userName) {
        console.log("Access token or user email or user name not found");
        throw new Error("Access token or user email or user name not found");
      }

      console.log(userEmail, userName, userProfileImage);

      const getUserParams = {
        TableName: "Users",
        Key: { Email: userEmail, Name: userName },
      };

      const userExists = await dynamoDB.get(getUserParams).promise();
      console.log(userExists);
      if (userExists.Item) {
        console.log("User already exists in the Users table. Skipping...");
        setIsLoading(false);
        navigate('/dashboard');
        return;
      }
      console.log("User does not exist in the Users table");

      const putUserParams = {
        TableName: "Users",
        Item: {
          Email: userEmail,
          Name: userName,
          profileImage: userProfileImage || "No image available",
        },
      };

      await dynamoDB.put(putUserParams).promise();
      console.log("User added to Users table");

      const classesResponse = await fetch(
        "https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const classesData = await classesResponse.json();

      for (const course of classesData.courses || []) {
        const putCoursesParams = {
          TableName: "Classes",
          Item: {
            Email: userEmail,
            Name: course.name,
            Section: course.section,
            Description: course.description,
            Link: course.alternateLink,
            Type: "Unknown",
          },
        };

        await dynamoDB.put(putCoursesParams).promise();
      }

      const calendarResponse = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const calendarData = await calendarResponse.json();

      for (const course of classesData.courses || []) {
        const assignmentsResponse = await fetch(
          `https://classroom.googleapis.com/v1/courses/${course.id}/courseWork`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const assignmentsData = await assignmentsResponse.json();

        for (const assignment of assignmentsData.courseWork || []) {
          const putAssignmentParams = {
            TableName: "Assignments",
            Item: {
              Email: userEmail,
              Name: assignment.title,
              courseId: course.id,
              title: assignment.title,
              dueDate: assignment.dueDate,
              link: assignment.alternateLink,
              description: assignment.description,
            },
          };

          await dynamoDB.put(putAssignmentParams).promise();
        }
      }

      for (const event of calendarData.items || []) {
        const putEventParams = {
          TableName: "Calendar",
          Item: {
            Email: userEmail,
            Name: `${event.summary || "Unnamed Event"}`,
            summary: event.summary,
            start: event.start?.dateTime || event.start?.date,
            end: event.end?.dateTime || event.end?.date,
            location: event.location,
            description: event.description,
          },
        };

        await dynamoDB.put(putEventParams).promise();
      }

      console.log("Assignments and Calendar events stored in DynamoDB");
    } catch (e: any) {
      console.log("Error: " + e.message);
    }
    setIsLoading(false);
    navigate('/settings/classes');
  };

  return (
    <button
      onClick={handleSignIn}
      className={`px-6 py-3 rounded-lg flex items-center gap-3 transition-colors ${isDark
        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
        : 'bg-cyan-500 text-white hover:bg-cyan-600'
        }`}
    >
      {isLoading && <LoadingOverlay phrase={loadingPhrase} />}
      <svg className="w-5 h-5" viewBox="0 0 24 24">
        <path
          fill="currentColor"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="currentColor"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="currentColor"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="currentColor"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      Sign in with Google
    </button>
  );
}

export default GoogleSignInButton;