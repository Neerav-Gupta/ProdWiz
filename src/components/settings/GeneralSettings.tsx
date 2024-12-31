import React from 'react';
import { User, Mail, Camera } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../auth/AuthContext';
import { isRouteErrorResponse } from 'react-router-dom';

export default function GeneralSettings() {
    const { isDark } = useTheme();
    const { user } = useAuth();

    if (!user) {
        return null;
    }

    return (
        <div className="max-w-2xl">
            <div className="flex items-center space-x-8 mb-8">
                <div className="relative">
                    <img
                        src={user.profileImage}
                        alt="Profile"
                        className="w-24 h-24 rounded-full"
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
        </div>
    );
}