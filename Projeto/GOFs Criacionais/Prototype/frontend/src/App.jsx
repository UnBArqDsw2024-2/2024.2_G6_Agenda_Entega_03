import { useEffect, useState } from 'react';
import CalendarView from './components/CalendarView';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { createRecurringEvents, getEvents } from './services/api';

const App = () => {
  const [events, setEvents] = useState([]);

  const fetchEvents = async () => {
    const allEvents = await getEvents();
    setEvents(allEvents);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleCreateEvents = async (formData) => {
    console.log('Form data enviado:', formData);
    await createRecurringEvents(formData);
    fetchEvents();
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Agenda Online</h1>
      <div className='flex space-x-4'>
        {/* Coluna 1: Formulário */}
        <div className='flex-1'>
          <EventForm onCreateEvents={handleCreateEvents} />
        </div>

        {/* Coluna 2: Lista de Eventos */}
        <div className='flex-1'>
          <EventList events={events} />
        </div>

        {/* Coluna 3: Calendário */}
        <div className='flex-1'>
          <CalendarView events={events} />
        </div>
      </div>
    </div>
  );
};

export default App;
