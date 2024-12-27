import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getDaysInMonth, format } from '../utils/dateUtils';
import { useTheme } from '../hooks/useTheme';

interface CalendarProps {
  onDateSelect: (date: Date) => void;
  selectedDate: Date;
}

export default function Calendar({ onDateSelect, selectedDate }: CalendarProps) {
  const { isDark } = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  
  const { dates, monthYear } = getDaysInMonth(currentDate);

  const handlePrevMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() - 1);
    setCurrentDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + 1);
    setCurrentDate(newDate);
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} h-full rounded-lg p-6 shadow-lg`}>
      <div className="flex items-center justify-between mb-6">
        <button 
          onClick={handlePrevMonth}
          className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className={`${isDark ? 'text-white' : 'text-gray-900'} font-medium`}>
          {monthYear}
        </h2>
        <button 
          onClick={handleNextMonth}
          className={`${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
      
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div key={day} className={`${isDark ? 'text-gray-400' : 'text-gray-600'} text-xs text-center py-2`}>
            {day}
          </div>
        ))}
        {dates.map((date, i) => (
          <button
            key={i}
            onClick={() => date && onDateSelect(date)}
            className={`h-8 text-sm rounded-full flex items-center justify-center ${
              date
                ? format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                  ? isDark ? 'bg-cyan-600 text-white' : 'bg-cyan-500 text-white'
                  : isDark
                    ? 'text-gray-300 hover:bg-gray-700'
                    : 'text-gray-700 hover:bg-gray-100'
                : isDark ? 'text-gray-700' : 'text-gray-200'
            }`}
            disabled={!date}
          >
            {date ? format(date, 'd') : ''}
          </button>
        ))}
      </div>
    </div>
  );
}