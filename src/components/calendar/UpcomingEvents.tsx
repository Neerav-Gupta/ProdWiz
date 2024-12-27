import React from 'react';
import { Clock, MapPin } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location?: string;
  type: 'meeting' | 'appointment' | 'reminder';
  color: string;
}

const upcomingEvents: Event[] = [
  {
    id: 1,
    title: 'Team Planning Meeting',
    date: 'Today',
    time: '10:00 AM',
    location: 'Conference Room A',
    type: 'meeting',
    color: 'bg-cyan-500'
  },
  {
    id: 2,
    title: 'Dentist Appointment',
    date: 'Tomorrow',
    time: '2:30 PM',
    location: 'Dental Clinic',
    type: 'appointment',
    color: 'bg-pink-500'
  },
  {
    id: 3,
    title: 'Project Deadline',
    date: 'Mar 25',
    time: '5:00 PM',
    type: 'reminder',
    color: 'bg-purple-500'
  }
];

export default function UpcomingEvents() {
  const { isDark } = useTheme();

  return (
    <div className={`${isDark ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg p-6`}>
      <h2 className={`text-xl font-semibold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
        Upcoming Events
      </h2>
      <div className="space-y-6">
        {upcomingEvents.map(event => (
          <div 
            key={event.id}
            className={`${isDark ? 'bg-gray-700' : 'bg-gray-50'} rounded-lg p-4`}
          >
            <div className="flex items-start gap-3">
              <div className={`${event.color} w-2 h-2 rounded-full mt-2`} />
              <div className="flex-1">
                <h3 className={`font-medium ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {event.title}
                </h3>
                <div className="mt-2 space-y-1">
                  <p className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <Clock className="w-4 h-4 mr-2" />
                    {event.date} at {event.time}
                  </p>
                  {event.location && (
                    <p className={`flex items-center text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}