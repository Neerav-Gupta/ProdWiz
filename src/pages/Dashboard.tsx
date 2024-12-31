import EventList from '../components/EventList';
import Calendar from '../components/Calendar';
import Stats from '../components/Stats';
import { useState } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const navigate = useNavigate();
  const { user } = useAuth();
  if (!user) navigate('/');
  console.log(user);

  return (
    <main className="p-4 md:p-6">
      <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 lg:col-span-3 order-2 lg:order-1">
          <div className="h-[300px] md:h-[350px] lg:h-[calc(100vh-8rem)] overflow-auto">
            <EventList selectedDate={selectedDate} />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-6 order-1 lg:order-2">
          <div className="h-[400px] md:h-[450px] lg:h-[calc(100vh-8rem)] overflow-auto">
            <Calendar 
              selectedDate={selectedDate}
              onDateSelect={setSelectedDate}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-3 order-3">
          <div className="h-[400px] md:h-[300px] lg:h-[calc(100vh-8rem)] overflow-auto">
            <Stats />
          </div>
        </div>
      </div>
    </main>
  );
}