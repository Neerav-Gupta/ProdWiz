import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import NavLinks from './NavLinks';
import UserMenu from './UserMenu';
import GoogleSignInButton from '../auth/GoogleSignInButton';

export default function Navbar() {
  const { isDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={`fixed w-full z-50 ${isDark ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Logo />

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />
            <GoogleSignInButton />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden py-4">
            <NavLinks mobile />
            <GoogleSignInButton />
          </div>
        )}
      </div>
    </nav>
  );
}