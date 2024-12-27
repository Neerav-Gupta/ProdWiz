import React from 'react';
import { Settings, User, LogOut } from 'lucide-react';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export default function ProfileDropdown({ isOpen, onClose, isDark }: ProfileDropdownProps) {
  const menuItems = [
    { icon: User, label: 'Profile' },
    { icon: Settings, label: 'Settings' },
    { icon: LogOut, label: 'Sign out' },
  ];

  return (
    <div className="relative">
      <button onClick={onClose}>
        <img
          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt="Profile"
          className="w-8 h-8 rounded-full"
        />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={onClose}
          ></div>
          <div className={`fixed md:absolute right-0 mt-2 w-full md:w-48 rounded-lg shadow-lg z-50 ${
            isDark ? 'bg-gray-800' : 'bg-white'
          } ${window.innerWidth < 768 ? 'top-16 mx-auto max-w-[92%] left-0 right-0' : ''}`}>
            <div className="p-2">
              <div className={`p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>Michael Scott</p>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>michael@example.com</p>
              </div>
              <div className="py-2">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${
                      isDark 
                        ? 'text-gray-300 hover:bg-gray-700' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}