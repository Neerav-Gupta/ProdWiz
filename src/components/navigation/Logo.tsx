import React from 'react';
import { Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';

export default function Logo() {
  const { isDark } = useTheme();
  
  return (
    <Link to="/" className="flex items-center space-x-2">
      <Sparkles className={`w-8 h-8 ${isDark ? 'text-cyan-400' : 'text-cyan-500'}`} />
      <span className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Prodwiz
      </span>
    </Link>
  );
}