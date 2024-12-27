import React, { useState, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useOnClickOutside } from '../../hooks/useOnClickOutside';
import { User } from '../../types/auth';

interface UserMenuProps {
  user: User;
}

export default function UserMenu({ user }: UserMenuProps) {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  
  useOnClickOutside(menuRef, () => setIsOpen(false));

  return (
    <div ref={menuRef} className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <img
          src={user.photoUrl}
          alt={user.name}
          className="w-8 h-8 rounded-full"
        />
        <span className={isDark ? 'text-white' : 'text-gray-900'}>
          {user.name}
        </span>
      </button>

      {isOpen && (
        <div className={`absolute right-0 mt-2 w-48 rounded-lg shadow-lg py-1 ${
          isDark ? 'bg-gray-700' : 'bg-white'
        }`}>
          <div className="px-4 py-2 border-b border-gray-200">
            <p className={`text-sm font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {user.name}
            </p>
            <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-500'}`}>
              {user.email}
            </p>
          </div>
          {/* Add menu items here */}
        </div>
      )}
    </div>
  );
}