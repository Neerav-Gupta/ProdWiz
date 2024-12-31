import React, { useState } from 'react';
import GeneralSettings from '../components/settings/GeneralSettings';
import ClassesSettings from '../components/settings/ClassesSettings';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';

type Tab = 'general' | 'classes';

export default function SettingsPage(){
    const { page } = useParams();
    const [activeTab, setActiveTab] = useState<Tab>(page ? page as Tab : 'general');
    const navigate = useNavigate();
    const { isDark } = useTheme();
    const { user } = useAuth();
    if (!user) navigate('/');

    const tabs = [
        { id: 'general', label: 'General' },
        { id: 'classes', label: 'Classes' },
    ];

    return (
        <div className="p-4">
            <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
                <div className="border-b border-gray-200 dark:border-gray-700">
                    <nav className="flex space-x-8">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as Tab)}
                                className={`py-4 px-1 inline-flex items-center border-b-2 font-medium text-sm ${activeTab === tab.id
                                    ? `border-cyan-500 ${isDark ? 'text-white' : 'text-gray-900'}`
                                    : `border-transparent ${isDark ? 'text-gray-400' : 'text-gray-500'} hover:text-gray-700 hover:border-gray-300`
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="mt-6">
                    {activeTab === 'general' ? <GeneralSettings /> : <ClassesSettings />}
                </div>
            </div>
        </div>
    );
}