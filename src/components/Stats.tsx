import React from 'react';
import { useTheme } from '../hooks/useTheme';

export default function Stats() {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} h-full rounded-lg p-6 shadow-lg`}>
      <h2 className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm mb-4`}>
        Information
      </h2>
      <div className="space-y-6">
        <div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Active events
          </p>
          <p className="text-cyan-500 text-3xl font-bold">128</p>
        </div>
        <div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Completed events
          </p>
          <p className="text-cyan-500 text-3xl font-bold">57</p>
        </div>
        <div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Time to next event
          </p>
          <p className="text-cyan-500 text-3xl font-bold">3h 12m</p>
        </div>
        <div>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-sm`}>
            Important events
          </p>
          <p className="text-cyan-500 text-3xl font-bold">12</p>
        </div>
      </div>
    </div>
  );
}