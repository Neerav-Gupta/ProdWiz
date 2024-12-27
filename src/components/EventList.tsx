import React from 'react';
import { Clock } from 'lucide-react';
import { format } from '../utils/dateUtils';
import { useTheme } from '../hooks/useTheme';

interface Event {
  id: number;
  title: string;
  time: string;
  type: 'business' | 'shopping' | 'tv' | 'call' | 'mail';
  color: string;
  date: Date;
}

const allEvents: Event[] = [
  { 
    id: 1, 
    title: 'Business meeting', 
    time: '08:30 AM', 
    type: 'business', 
    color: 'bg-pink-500',
    date: new Date(2024, 5, 15)
  },
  { 
    id: 2, 
    title: 'Shopping for today\'s dinner', 
    time: '11:40 AM', 
    type: 'shopping', 
    color: 'bg-green-500',
    date: new Date(2024, 5, 15)
  },
  { 
    id: 3, 
    title: 'Premiere of the new season', 
    time: '03:00 PM', 
    type: 'tv', 
    color: 'bg-blue-500',
    date: new Date(2024, 5, 16)
  }
];

interface EventListProps {
  selectedDate: Date;
}

export default function EventList({ selectedDate }: EventListProps) {
  const { isDark } = useTheme();
  const events = allEvents.filter(
    event => format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} h-full rounded-lg p-6 shadow-lg`}>
      <h2 className={`${isDark ? 'text-white' : 'text-gray-900'} text-lg font-semibold mb-4`}>
        Events for {format(selectedDate, 'MM/dd/yyyy')}
      </h2>
      {events.length === 0 ? (
        <p className={`${isDark ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
          No events scheduled for this day
        </p>
      ) : (
        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${event.color}`} />
              <div className="flex-1">
                <p className={`${isDark ? 'text-white' : 'text-gray-900'} text-sm`}>
                  {event.title}
                </p>
                <div className={`flex items-center ${isDark ? 'text-gray-400' : 'text-gray-500'} text-xs mt-1`}>
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}