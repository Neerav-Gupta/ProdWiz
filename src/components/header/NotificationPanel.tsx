import React from 'react';
import { Bell } from 'lucide-react';

interface Notification {
  id: number;
  title: string;
  time: string;
  read: boolean;
}

const notifications: Notification[] = [
  { id: 1, title: 'New event scheduled', time: '5 min ago', read: false },
  { id: 2, title: 'Meeting reminder', time: '1 hour ago', read: false },
  { id: 3, title: 'Task completed', time: '2 hours ago', read: true },
];

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export default function NotificationPanel({ isOpen, onClose, isDark }: NotificationPanelProps) {
  return (
    <div className="relative">
      <button 
        className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} relative`}
        onClick={onClose}
      >
        <Bell className="w-5 h-5" />
        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          ></div>
          <div className={`fixed md:absolute right-0 mt-2 w-full md:w-80 rounded-lg shadow-lg z-50 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } ${window.innerWidth < 768 ? 'top-16 mx-auto max-w-[92%] left-0 right-0' : ''}`}>
            <div className="p-4 max-h-[80vh] overflow-y-auto">
              <h3 className={`${isDark ? 'text-white' : 'text-gray-900'} font-semibold mb-4`}>
                Notifications
              </h3>
              <div className="space-y-3">
                {notifications.map((notification) => (
                  <div 
                    key={notification.id} 
                    className={`p-3 rounded-lg ${
                      notification.read 
                        ? isDark ? 'bg-gray-700' : 'bg-gray-50' 
                        : isDark ? 'bg-gray-700' : 'bg-blue-50'
                    }`}
                  >
                    <p className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm`}>
                      {notification.title}
                    </p>
                    <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs mt-1`}>
                      {notification.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}