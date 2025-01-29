import React, { useEffect, useState } from 'react';
import { ChevronRight, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../auth/AuthContext';
import { LoadingOverlay, useLoadingPhrases } from "../loading-overlay";
import AWS from "aws-sdk";

AWS.config.update({
    region: 'us-east-2',
    accessKeyId: 'AKIAYS2NRHAYPOXDAYV6',
    secretAccessKey: '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',
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();

interface ClassItem {
    Email: string;
    Name: string;
    Type: string;
    Link: string;
}

async function fetchClasses(email: any) {
    const params = {
        TableName: 'Classes',
        KeyConditionExpression: '#usr = :userId',
        ExpressionAttributeNames: {
            '#usr': 'Email',
        },
        ExpressionAttributeValues: {
            ':userId': email,
        },
    };

    try {
        const data = await dynamoDB.query(params).promise();
        return data.Items as ClassItem[];
    } catch (error) {
        console.error('Error fetching classes:', error);
    }
}

export default function ClassesSettings() {
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { user } = useAuth();
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState(false);
    const loadingPhrase = useLoadingPhrases(isLoading);

    useEffect(() => {
        const getClasses = async () => {
            try {
                const fetchedClasses = await fetchClasses(user?.email);
                setClasses(fetchedClasses ? fetchedClasses : []);
            } catch (error) {
                console.error("Error fetching classes:", error);
            } finally {
                setLoading(false);
            }
        };
        getClasses();
    }, [user]);

    const handleDropdownChange = (name: string, value: string) => {
        setClasses((prevClasses) => {
            return prevClasses.map((cls) =>
                cls.Name === name ? { ...cls, Type: value } : cls
            );
        });
    };

    const handleUpdate = async () => {
        setIsLoading(true);
        try {
            const updatePromises = classes.map((cls) => {
                const params = {
                    TableName: "Classes",
                    Key: {
                        Email: user?.email,
                        Name: cls.Name,
                    },
                    UpdateExpression: "SET #type = :type",
                    ExpressionAttributeNames: {
                        "#type": "Type",
                    },
                    ExpressionAttributeValues: {
                        ":type": cls.Type,
                    },
                };
                return dynamoDB.update(params).promise();
            });

            await Promise.all(updatePromises);
            console.log("Database updated successfully!");
        } catch (error) {
            console.error("Error updating database:", error);
        }
        setIsLoading(false);
    };

    return (
        <div>
            {isLoading && <LoadingOverlay phrase={loadingPhrase} />}
            <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Classes Settings
            </h2>
            <p className={`mb-6 mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                On this page you can change the type of your class for enhanced Priority Sorting.
            </p>
            {classes.length === 0 && (
                <p className={`mb-6 mt-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    You have no classes. Please add a class to get started.
                </p>
            )}
            {classes.length > 0 && (
                <div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead>
                                <tr>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'
                                        } uppercase tracking-wider`}>
                                        Class Name
                                    </th>
                                    <th className={`px-6 py-3 text-left text-xs font-medium ${isDark ? 'text-gray-300' : 'text-gray-500'
                                        } uppercase tracking-wider`}>
                                        Type
                                    </th>
                                    <th className="px-6 py-3 relative">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className={`${isDark ? 'text-gray-300' : 'text-gray-900'} divide-y divide-gray-200 dark:divide-gray-700`}>
                                {classes.map((classItem, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {classItem.Name}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <select
                                                id={`class-${classItem.Name}`}
                                                defaultValue={classItem.Type}
                                                onChange={(e) => handleDropdownChange(classItem.Name, e.target.value)}
                                                className={`rounded-lg ${isDark
                                                    ? 'bg-gray-700 text-white border-gray-600'
                                                    : 'bg-white text-gray-900 border-gray-300'
                                                    } border shadow-sm focus:ring-cyan-500 focus:border-cyan-500 p-2`}
                                            >
                                                <option value="Unknown">Unknown</option>
                                                <option value="Academic">Academic</option>
                                                <option value="Extracurricular">Extracurricular</option>
                                            </select>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => { window.location.href = classItem.Link; }}
                                                className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600"
                                            >
                                                View Class
                                                <ChevronRight className="ml-2 h-4 w-4" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="mt-6">
                        <button
                            className="inline-flex items-center px-4 py-2 rounded-lg bg-cyan-500 text-white hover:bg-cyan-600"
                            onClick={handleUpdate}
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Update Classes
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}