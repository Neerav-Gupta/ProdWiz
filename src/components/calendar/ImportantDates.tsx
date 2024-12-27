import React from 'react';
import { Calendar as CalendarIcon, Star } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { format } from '../../utils/dateUtils';

interface ImportantDate {
  id: number;
  title: string;
  date: Date;
  type: 'holiday' | 'birthday' | 'anniversary';
  color: string;
}

const importantDates: ImportantDate[] = [
  {
    id: 1,
    title: 'Memorial Day',
    date: new Date(2024, 4, 27),
    type: 'holiday',
    color: 'bg-red-500'
  },
  {
    id: 2,
    title: 'Independence Day',
    date: new Date(2024, 6, 4),
    type: 'holiday',
    color: 'bg-blue-500'
  },
  {
    id: 3,
    title: 'Labor Day',
    date: new Date(2024, 8, 2),
    type: 'holiday',
    color: 'bg-green-500'
  }
];

interface ImportantDatesProps {
  selectedDate: Date;
}

export default function ImportantDates({ selectedDate }: ImportantDatesProps) {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Important Dates
      </h2>
      <div className="space-y-4">
        {importantDates.map(date => (
          <div 
            key={date.id}
            className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}
          >
            <div className="flex items-start gap-3">
              <div className={`${date.color} w-2 h-2 rounded-full mt-2`} />
              <div className="flex-1">
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {date.title}
                </h3>
                <p className={`flex items-center text-sm mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <CalendarIcon className="w-4 h-4 mr-2" />
                  {format(date.date, 'MM/dd/yyyy')}
                </p>
              </div>
              {date.type === 'holiday' && (
                <Star className={`w-4 h-4 ${isDark ? 'text-yellow-500' : 'text-yellow-600'}`} />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}