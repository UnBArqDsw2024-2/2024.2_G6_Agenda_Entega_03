import PropTypes from 'prop-types';

const EventList = ({ events }) => {
  return (
    <div className='mt-8'>
      <h2 className='text-xl font-bold mb-4'>Eventos Criados</h2>
      {events.length === 0 ? (
        <p>Nenhum evento criado ainda.</p>
      ) : (
        <ul className='space-y-4'>
          {events.map((event) => (
            <li key={event.id} className='border rounded p-4'>
              <h3 className='font-bold'>{event.title}</h3>
              <p>{event.description}</p>
              <p>
                <strong>Início:</strong>{' '}
                {new Date(event.startTime).toLocaleString()}
              </p>
              <p>
                <strong>Fim:</strong> {new Date(event.endTime).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
EventList.propTypes = {
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

export default EventList;
