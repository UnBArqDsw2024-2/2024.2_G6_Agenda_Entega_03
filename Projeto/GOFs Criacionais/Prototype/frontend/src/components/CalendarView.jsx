import PropTypes from 'prop-types';
import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CalendarView = ({ events }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const eventsForDate = events.filter((event) => {
    const eventDate = new Date(event.startTime).toDateString();
    return eventDate === selectedDate.toDateString();
  });

  return (
    <div className='border rounded p-4 shadow'>
      <h2 className='text-xl font-bold mb-4'>Calendário</h2>
      <Calendar
        value={selectedDate}
        onChange={setSelectedDate}
        tileContent={({ date }) => {
          const hasEvents = events.some(
            (event) =>
              new Date(event.startTime).toDateString() === date.toDateString()
          );
          return hasEvents ? (
            <div className='bg-blue-300 rounded-full w-2 h-2 mx-auto mt-1'></div>
          ) : null;
        }}
      />

      <div className='mt-4'>
        <h3 className='font-bold'>Eventos do Dia</h3>
        {eventsForDate.length === 0 ? (
          <p>Nenhum evento para esta data.</p>
        ) : (
          <ul>
            {eventsForDate.map((event) => (
              <li key={event.id} className='border-b py-2'>
                <h4 className='font-bold'>{event.title}</h4>
                <p>{event.description}</p>
                <p>
                  <strong>Início:</strong>{' '}
                  {new Date(event.startTime).toLocaleTimeString()}
                </p>
                <p>
                  <strong>Fim:</strong>{' '}
                  {new Date(event.endTime).toLocaleTimeString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

CalendarView.propTypes = {
  events: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      startTime: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CalendarView;
