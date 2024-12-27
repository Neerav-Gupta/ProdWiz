import React, { useState } from 'react';
import CalendarView from '../components/calendar/CalendarView';
import DailyView from '../components/calendar/DailyView';
import TabButton from '../components/common/TabButton';
import { useTheme } from '../hooks/useTheme';

type ViewType = 'calendar' | 'daily';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeView, setActiveView] = useState<ViewType>('calendar');
  const { isDark } = useTheme();

  return (
    <div className="p-4">
      <div className="flex gap-4 mb-4">
        <TabButton
          active={activeView === 'calendar'}
          onClick={() => setActiveView('calendar')}
          isDark={isDark}
        >
          Calendar
        </TabButton>
        <TabButton
          active={activeView === 'daily'}
          onClick={() => setActiveView('daily')}
          isDark={isDark}
        >
          Daily View
        </TabButton>
      </div>

      {activeView === 'calendar' ? (
        <CalendarView
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
        />
      ) : (
        <DailyView selectedDate={selectedDate} />
      )}
    </div>
  );
}