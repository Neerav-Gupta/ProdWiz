import React, { useState } from 'react';
import { Menu, Search as SearchIcon } from 'lucide-react';
import NotificationPanel from './NotificationPanel';
import ProfileDropdown from './ProfileDropdown';
import { useTheme } from '../../hooks/useTheme';

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { isDark } = useTheme();

  return (
    <header className={`${isDark ? 'bg-gray-800' : 'bg-white'} p-4 flex justify-between items-center shadow-md`}>
      <div className="flex items-center">
        <button 
          onClick={onMenuClick}
          className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} lg:hidden mr-4`}
        >
          <Menu className="w-6 h-6" />
        </button>
        <h1 className={`${isDark ? 'text-white' : 'text-gray-900'} text-xl font-semibold`}>
          My Calendar
        </h1>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden md:block">
          <SearchIcon className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 ${
            isDark ? 'text-gray-400' : 'text-gray-500'
          }`} />
          <input
            type="text"
            placeholder="Search..."
            className={`${
              isDark ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'
            } pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 w-64`}
          />
        </div>

        <NotificationPanel 
          isOpen={notificationsOpen}
          onClose={() => setNotificationsOpen(!notificationsOpen)}
        />

        <ProfileDropdown 
          isOpen={profileOpen}
          onClose={() => setProfileOpen(!profileOpen)}
        />
      </div>
    </header>
  );
}