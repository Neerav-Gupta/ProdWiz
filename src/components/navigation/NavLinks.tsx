import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

interface NavLinksProps {
  mobile?: boolean;
}

export default function NavLinks({ mobile }: NavLinksProps) {
  const { isDark } = useTheme();
  const links = [
    { to: '/about', label: 'About Us' },
    { to: '/contact', label: 'Contact Us' },
  ];

  const baseClasses = `transition-colors ${
    isDark ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
  }`;
  
  const mobileClasses = 'block py-2';
  const desktopClasses = '';

  return (
    <div className={mobile ? 'space-y-2' : 'flex space-x-8'}>
      {links.map(link => (
        <Link
          key={link.to}
          to={link.to}
          className={`${baseClasses} ${mobile ? mobileClasses : desktopClasses}`}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}