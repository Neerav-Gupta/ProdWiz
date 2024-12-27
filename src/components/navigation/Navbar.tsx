import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
// import { useAuth } from '../../hooks/useAuth';

export default function Navbar() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  // const { user } = useAuth();

  return (
    <nav className={`fixed w-full z-50 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
             {/* {user ? (
              <UserMenu user={user} />
            ) : ( */}
              <Link
                to="/get-started"
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isDark
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                }`}
              >
                Get Started
              </Link>
            {/* )} */}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4">
            <NavLinks mobile />
            {/* {!user && ( */}
              <Link
                to="/get-started"
                className={`block px-4 py-2 mt-4 text-center rounded-lg ${
                  isDark
                    ? 'bg-cyan-600 text-white hover:bg-cyan-700'
                    : 'bg-cyan-500 text-white hover:bg-cyan-600'
                }`}
              >
                Get Started
              </Link>
            {/* )} */}
          </div>
        )}
      </div>
    </nav>
  );
}