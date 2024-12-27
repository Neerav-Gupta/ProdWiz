import React from 'react';
import FullCalendar from './FullCalendar';
import ImportantDates from './ImportantDates';
import UpcomingEvents from './UpcomingEvents';

interface CalendarViewProps {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
}

export default function CalendarView({ selectedDate, onDateSelect }: CalendarViewProps) {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-12 lg:col-span-9 h-full">
        <FullCalendar 
          selectedDate={selectedDate}
          onDateSelect={onDateSelect}
        />
      </div>
      <div className="col-span-12 lg:col-span-3 space-y-4 h-full">
        <div className="overflow-auto">
          <UpcomingEvents selectedDate={selectedDate} />
        </div>
        <div className="overflow-auto">
          <ImportantDates selectedDate={selectedDate} />
        </div>
      </div>
    </div>
  );
}