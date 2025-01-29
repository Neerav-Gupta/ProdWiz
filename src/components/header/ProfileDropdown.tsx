import React from 'react';
import { Settings, User, LogOut } from 'lucide-react';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';

interface ProfileDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  isDark: boolean;
}

export default function ProfileDropdown({ isOpen, onClose, isDark }: ProfileDropdownProps) {
  const { user, signOut } = useAuth();
  const navigate = useNavigate(); 

  if (!user) {
    return null;
  }

  const handleSignout = async () => {
    try {
      await signOut();
      console.log('Signed out');
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="relative">
      <button onClick={onClose}>
        <img
          src={user.profileImage}
          alt="Profile"
          className="w-8 h-8 rounded-full"
          referrerPolicy="no-referrer" 
        />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={onClose}
          ></div>
          <div className={`fixed md:absolute right-0 mt-2 w-full md:w-auto rounded-lg shadow-lg z-50 ${isDark ? 'bg-gray-800' : 'bg-white'
            } ${window.innerWidth < 768 ? 'top-16 mx-auto max-w-[92%] left-0 right-0' : ''}`}>
            <div className="p-2">
              <div className={`p-3 border-b ${isDark ? 'border-gray-700' : 'border-gray-100'}`}>
                <p className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>{user?.name}</p>
                <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>{user?.email}</p>
              </div>
              <div className="py-2">
                <button
                  onClick={() => navigate("/settings/general")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${isDark
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <User className="w-4 h-4 mr-2" />
                  Profile
                </button>
                <button
                  onClick={() => navigate("/settings/classes")}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${isDark
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </button>
                <button
                  onClick={handleSignout}
                  className={`w-full flex items-center px-3 py-2 text-sm rounded-lg ${isDark
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-700 hover:bg-gray-100'
                    }`}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}