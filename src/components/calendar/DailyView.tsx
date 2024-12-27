import React from 'react';
import { format } from '../../utils/dateUtils';
import { useTheme } from '../../hooks/useTheme';
import { Calendar, Clock } from 'lucide-react';
import { dailyEvents } from '../../data/calendarData';

interface DailyViewProps {
  selectedDate: Date;
}

export default function DailyView({ selectedDate }: DailyViewProps) {
  const { isDark } = useTheme();
  const hours = Array.from({ length: 24 }, (_, i) => i);
  
  const getEventsForHour = (hour: number) => {
    return dailyEvents.filter(event => {
      const eventHour = new Date(event.startTime).getHours();
      return eventHour === hour && 
        format(new Date(event.startTime), 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd');
    });
  };

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6 h-[calc(100vh-10rem)]`}>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className={`text-xl font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Daily Schedule
          </h2>
          <p className={`flex items-center mt-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <Calendar className="w-4 h-4 mr-2" />
            {format(selectedDate, 'MM/dd/yyyy')}
          </p>
        </div>
      </div>

      <div className="overflow-y-auto h-[calc(100%-5rem)]">
        {hours.map(hour => {
          const events = getEventsForHour(hour);
          let timeString = hour%12 == 0 ? "12:00" : `${((12+hour)%12).toString().padStart(2, '0')}:00`;
          timeString += hour >= 12 ? " PM" : " AM";
          
          return (
            <div 
              key={hour}
              className={`flex gap-4 py-4 ${
                hour !== 23 ? (isDark ? 'border-b border-gray-700' : 'border-b border-gray-100') : ''
              }`}
            >
              <div className={`w-25 flex items-start ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                <Clock className="w-4 h-4 mr-2 mt-1" />
                {timeString}
              </div>
              <div className="flex-1">
                {events.map(event => (
                  <div
                    key={event.id}
                    className={`${event.color} p-3 rounded-lg mb-2 last:mb-0`}
                  >
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <p className="text-sm text-white/90 mt-1">
                      {format(new Date(event.startTime), 'hh:mm a')} - {format(new Date(event.endTime), 'hh:mm a')}
                    </p>
                    {event.location && (
                      <p className="text-sm text-white/80 mt-1">{event.location}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}