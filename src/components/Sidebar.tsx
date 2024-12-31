import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Users, Mail, ClipboardList, Search, PieChart, Layout, Settings, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../hooks/useTheme';

const menuItems = [
  { icon: Layout, label: 'Dashboard', path: '/dashboard' },
  { icon: Calendar, label: 'Calendar', path: '/calendar' },
  { icon: Users, label: 'Meetings', path: '/meetings' },
  { icon: Mail, label: 'Mail', path: '/mail' },
  { icon: ClipboardList, label: 'Assignments', path: '/assignments' },
  { icon: Search, label: 'Search', path: '/search' },
  { icon: PieChart, label: 'Summary', path: '/summary' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

interface SidebarProps {
  isExpanded: boolean;
  onToggle: () => void;
  isMobile: boolean;
  onMobileClose: () => void;
}

export default function Sidebar({ isExpanded, onToggle, isMobile, onMobileClose }: SidebarProps) {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      {isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onMobileClose}
        ></div>
      )}

      <div className={`fixed left-0 top-0 h-screen shadow-xl transition-all duration-300 ease-in-out z-50
        ${isDark ? 'bg-gray-800' : 'bg-white'}
        ${isExpanded ? 'w-64' : 'w-20'} 
        ${isMobile ? 'translate-x-0 w-64' : '-translate-x-full'} 
        lg:translate-x-0`}
      >
        <div className="flex flex-col h-ful">
          <div className="p-4 flex justify-between items-center border-b border-gray-700">
            <ThemeToggle />
            <div className="flex items-center space-x-2">
              <button 
                onClick={onToggle}
                className="text-gray-400 hover:text-white transition-colors hidden lg:block"
              >
                {isExpanded ? '←' : '→'}
              </button>
              <button 
                onClick={onMobileClose}
                className="text-gray-400 hover:text-white transition-colors lg:hidden"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <nav className="flex-1 py-4 w-full">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) onMobileClose();
                }}
                className={`w-full py-3 px-4 text-gray-400 hover:text-white hover:bg-gray-700 transition-all flex items-center ${
                  location.pathname === item.path ? 'text-white bg-gray-700' : ''
                }`}
              >
                <item.icon className="w-5 h-5 min-w-[20px]" />
                {(isExpanded || isMobile) && (
                  <span className="ml-3 text-sm whitespace-nowrap">{item.label}</span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
}