import { useState } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { createRecurringEvents } from './services/api';

const App = () => {
  const [events, setEvents] = useState([]);

  const handleCreateEvents = async (formData) => {
    console.log('Form data enviado:', formData);
    const recurringEvents = await createRecurringEvents(formData);
    console.log('Eventos retornados do backend:', recurringEvents);
    setEvents(recurringEvents);
  };

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Agenda Online</h1>
      <EventForm onCreateEvents={handleCreateEvents} />
      <EventList events={events} />
    </div>
  );
};

export default App;
