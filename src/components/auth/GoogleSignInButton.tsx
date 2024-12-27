import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { auth } from './googleAuth';
import {
  signInWithPopup,
  setPersistence,
  browserLocalPersistence,
  GoogleAuthProvider,
} from "firebase/auth";

export default function GoogleSignInButton() {
  const { isDark } = useTheme();
  const navigate = useNavigate();

  const googleProvider = new GoogleAuthProvider();
  googleProvider.setCustomParameters({
      prompt: 'select_account'
  });
  googleProvider.addScope("https://www.googleapis.com/auth/classroom.courses.readonly");
  googleProvider.addScope("https://www.googleapis.com/auth/classroom.coursework.me.readonly");
  googleProvider.addScope("https://www.googleapis.com/auth/calendar.readonly");

  const handleSignIn = async () => {
    try {
      await setPersistence(auth, browserLocalPersistence);
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const accessToken = credential?.accessToken;

      if (!accessToken) {
        console.log("Access token not found");
        return;
      }
      const classesResponse = await fetch(
        "https://classroom.googleapis.com/v1/courses?courseStates=ACTIVE",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const classesData = await classesResponse.json();
      console.log("Active Classes:", classesData);

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
        console.log(`Assignments for course ${course.name}:`, assignmentsData);
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
      console.log("Calendar Events:", calendarData);

      const displayData = {
        classes: classesData.courses || [],
        calendarEvents: calendarData.items || [],
      };
      console.log("Combined Data:", displayData);
    } catch (e: any) {
      console.log(`Error: $(e.message}`);
    }
    // navigate('/dashboard');
  };

  return (
    <button
      onClick={handleSignIn}
      className={`px-6 py-3 rounded-lg flex items-center gap-3 transition-colors ${isDark
        ? 'bg-cyan-600 text-white hover:bg-cyan-700'
        : 'bg-cyan-500 text-white hover:bg-cyan-600'
        }`}
    >
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