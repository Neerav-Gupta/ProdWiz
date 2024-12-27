import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Plus, Star } from 'lucide-react';
import { format, getDaysInMonth, addMonths, subMonths } from '../../utils/dateUtils';
import { useTheme } from '../../hooks/useTheme';

// Holiday dates for the calendar
const holidays = [
  { date: '2024-05-27', name: 'Memorial Day' },
  { date: '2024-07-04', name: 'Independence Day' },
  { date: '2024-09-02', name: 'Labor Day' },
  { date: '2024-11-28', name: 'Thanksgiving' },
  { date: '2024-12-25', name: 'Christmas' },
];

interface FullCalendarProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function FullCalendar({ selectedDate, onDateSelect }: FullCalendarProps) {
  const { isDark } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const { dates, monthYear } = getDaysInMonth(currentMonth);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const handlePrevMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const isHoliday = (date: Date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return holidays.find(h => h.date === dateStr);
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-4 md:p-6 h-full flex flex-col`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className={`text-xl md:text-2xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            {monthYear}
          </h1>
          <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
            {format(selectedDate, 'MM/dd/yyyy')}
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button className={`${isDark ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'} 
            px-3 md:px-4 py-2 rounded-lg flex items-center gap-2 transition-colors`}>
            <Plus className="w-4 h-4" />
            <span className="hidden md:inline">Add Event</span>
            <span className="md:hidden">Add</span>
          </button>
          <div className="flex gap-1 md:gap-2">
            <button 
              onClick={handlePrevMonth}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={handleNextMonth}
              className={`p-2 rounded-lg ${
                isDark 
                  ? 'text-gray-400 hover:text-white hover:bg-gray-700' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 md:gap-4 flex-1">
        {days.map(day => (
          <div key={day} className={`text-center text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {day}
          </div>
        ))}
        {dates.map((date, i) => {
          const holiday = date ? isHoliday(date) : null;
          return (
            <button
              key={i}
              onClick={() => date && onDateSelect(date)}
              disabled={!date}
              className={`aspect-square rounded-lg p-2 relative ${
                date ? `
                  transition-colors
                  ${isDark 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-gray-50'
                  }
                  ${format(date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                    ? isDark 
                      ? 'bg-cyan-600 text-white' 
                      : 'bg-cyan-100 text-cyan-900'
                    : isDark 
                      ? 'text-gray-300' 
                      : 'text-gray-700'
                  }
                ` : isDark ? 'text-gray-700' : 'text-gray-300'
              }`}
            >
              {date && (
                <>
                  <span className="text-sm">{format(date, 'd')}</span>
                  {holiday && (
                    <Star 
                      className={`absolute top-1 right-1 w-3 h-3 ${
                        isDark ? 'text-yellow-500' : 'text-yellow-600'
                      }`} 
                    />
                  )}
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}