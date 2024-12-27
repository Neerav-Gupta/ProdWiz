import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export default function DashboardPreview() {
  const { isDark } = useTheme();

  return (
    <section className="py-12">
      <h2 className={`text-3xl font-bold text-center mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Your Productivity Dashboard
      </h2>
      <p className={`text-center mb-12 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
        Everything you need, right where you need it
      </p>
      
      <div className={`rounded-xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
        <img
          src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2426"
          alt="Dashboard Preview"
          className="w-full h-auto object-cover"
        />
      </div>
    </section>
  );
}