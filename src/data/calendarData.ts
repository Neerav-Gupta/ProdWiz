import { setHours } from '../utils/dateUtils';

const today = new Date();

export const holidays = [
  { date: '2024-01-01', name: 'New Year\'s Day' },
  { date: '2024-01-15', name: 'Martin Luther King Jr. Day' },
  { date: '2024-02-19', name: 'Presidents\' Day' },
  { date: '2024-05-27', name: 'Memorial Day' },
  { date: '2024-06-19', name: 'Juneteenth' },
  { date: '2024-07-04', name: 'Independence Day' },
  { date: '2024-09-02', name: 'Labor Day' },
  { date: '2024-10-14', name: 'Columbus Day' },
  { date: '2024-11-11', name: 'Veterans Day' },
  { date: '2024-11-28', name: 'Thanksgiving Day' },
  { date: '2024-12-25', name: 'Christmas Day' },
];

export const dailyEvents = [
  {
    id: 1,
    title: 'Team Stand-up',
    startTime: setHours(today,9).toISOString(),
    endTime: setHours(today, 10).toISOString(),
    location: 'Conference Room A',
    color: 'bg-blue-500'
  },
  {
    id: 2,
    title: 'Client Meeting',
    startTime: setHours(today, 11).toISOString(),
    endTime: setHours(today, 12).toISOString(),
    location: 'Virtual',
    color: 'bg-purple-500'
  },
  {
    id: 3,
    title: 'Lunch Break',
    startTime: setHours(new Date(), 12).toISOString(),
    endTime: setHours(today, 13).toISOString(),
    color: 'bg-green-500'
  },
  {
    id: 4,
    title: 'Project Review',
    startTime: setHours(today, 14).toISOString(),
    endTime: setHours(today, 15).toISOString(),
    location: 'Meeting Room B',
    color: 'bg-pink-500'
  },
  {
    id: 5,
    title: 'Team Building',
    startTime: setHours(today, 16).toISOString(),
    endTime: setHours(today, 17).toISOString(),
    location: 'Game Room',
    color: 'bg-orange-500'
  }
];