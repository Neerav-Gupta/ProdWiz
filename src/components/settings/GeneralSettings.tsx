import { User, Mail, Camera, Trash2 } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../auth/AuthContext';
import AWS from "aws-sdk";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../auth/googleAuth';
import { deleteUser } from 'firebase/auth';
import { LoadingOverlay, useLoadingPhrases } from "../loading-overlay";

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: 'AKIAYS2NRHAYPOXDAYV6',
    secretAccessKey: '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',
});

export default function GeneralSettings() {
    const { isDark } = useTheme();
    const { user, signOut } = useAuth();
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const loadingPhrase = useLoadingPhrases(isLoading);

    if (!user) {
        return null;
    }

    const deleteItemsByEmail = async (tableName: string, email: string): Promise<void> => {
        const queryParams = {
            TableName: tableName,
            KeyConditionExpression: '#usr = :userId',
            ExpressionAttributeNames: {
                '#usr': 'Email',
            },
            ExpressionAttributeValues: {
                ':userId': email,
            },
        };

        try {
            const queryResult = await dynamoDB.query(queryParams).promise();
            const items = queryResult.Items;
            console.log(items)

            if (items && items.length > 0) {
                const deletePromises = items.map((item) => {
                    const deleteParams = {
                        TableName: tableName,
                        Key: {
                            Email: item.Email,
                            Name: item.Name,
                        },
                    };

                    return dynamoDB.delete(deleteParams).promise();
                });

                await Promise.all(deletePromises);
                console.log(`Deleted all items for email: ${email} in table: ${tableName}`);
            } else {
                console.log(`No items found for email: ${email} in table: ${tableName}`);
            }
        } catch (error) {
            console.error(`Error deleting items in table ${tableName}:`, error);
            throw error;
        }
    };

    const handleSignout = async () => {
        try {
            await signOut();
            console.log('Signed out');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    async function handleDeleteAccount() {
        try {
            const tables = ["Classes", "Assignments", "Calendar", "Users"];
            setIsLoading(true);
            const deletePromises = tables.map((table) => deleteItemsByEmail(table, user?.email || ""));
            await Promise.all(deletePromises);
            console.log(`Successfully deleted all information for email: ${user?.email}`);
            setIsLoading(false);
            const firebase_user = auth.currentUser;
            try {
                if (firebase_user && firebase_user.email === user?.email) {
                    await deleteUser(firebase_user);
                    console.log(`Successfully deleted Firebase user: ${user?.email}`);
                } else {
                    console.log(`No Firebase user signed in or email mismatch for: ${user?.email}`);
                }
            } catch (error : any) {
                if (error.code === "auth/requires-recent-login") {
                    console.error("Error: Requires recent login. Signing out.");
                } else {
                    throw error;
                }
            }
            handleSignout();
        } catch (error) {
            console.error(`Error deleting user information:`, error);
            throw error;
        }
    }

    return (
        <div className="max-w-2xl">
            {isLoading && <LoadingOverlay phrase={loadingPhrase} />}
            <div className="flex items-center space-x-8 mb-8">
                <div className="relative">
                    <img
                        src={user?.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full"
                        referrerPolicy="no-referrer" 
                    />
                    <button
                        className={`absolute bottom-0 right-0 p-2 rounded-full ${isDark ? 'bg-gray-700' : 'bg-gray-100'
                            }`}
                    >
                        <Camera className="w-4 h-4" />
                    </button>
                </div>
                <div>
                    <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                        Profile Settings
                    </h2>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        Update your personal information
                    </p>
                </div>
            </div>

            <div className="space-y-6">
                <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Full Name
                    </label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            readOnly
                            type="text"
                            defaultValue={user.name}
                            className={`pl-10 block w-full rounded-lg ${isDark
                                ? 'bg-gray-700 text-white border-gray-600'
                                : 'bg-white text-gray-900 border-gray-300'
                                } border shadow-sm focus:ring-cyan-500 focus:border-cyan-500 p-2 mt-3`}
                        />
                    </div>
                </div>

                <div>
                    <label className={`block text-sm font-medium ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                        Email
                    </label>
                    <div className="mt-1 relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                            readOnly
                            type="email"
                            defaultValue={user.email}
                            className={`pl-10 block w-full rounded-lg ${isDark
                                ? 'bg-gray-700 text-white border-gray-600'
                                : 'bg-white text-gray-900 border-gray-300'
                                } border shadow-sm focus:ring-cyan-500 focus:border-cyan-500 p-2 mt-3`}
                        />
                    </div>
                </div>
            </div>
            <button
                onClick={handleDeleteAccount}
                className="flex items-center justify-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors mt-8"
            >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
            </button>
        </div>
    );
}