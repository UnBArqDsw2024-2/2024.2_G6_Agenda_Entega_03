import PropTypes from 'prop-types';
import { useState } from 'react';

const EventForm = ({ onCreateEvents }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState(
    new Date().toISOString().slice(0, 16) // Define o valor inicial como a data/hora atual
  );
  const [endDate, setEndDate] = useState(
    new Date(new Date().getTime() + 3600000).toISOString().slice(0, 16) // Define o valor inicial como 1 hora depois
  );
  const [recurrence, setRecurrence] = useState('daily');
  const [occurrences, setOccurrences] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!startDate || !endDate) {
      alert('Por favor, preencha as datas corretamente.');
      return;
    }

    if (new Date(startDate) >= new Date(endDate)) {
      alert('A data de início deve ser anterior à data de término.');
      return;
    }

    onCreateEvents({
      title,
      description,
      startTime: startDate,
      endTime: endDate,
      recurrenceRule: recurrence,
      occurrences: Number(occurrences),
    });
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-4'>
      <div>
        <label className='block font-medium'>Título</label>
        <input
          type='text'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border rounded p-2 w-full'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>Descrição</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border rounded p-2 w-full'
        />
      </div>
      <div>
        <label className='block font-medium'>Início</label>
        <input
          type='datetime-local'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className='border rounded p-2 w-full'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>Fim</label>
        <input
          type='datetime-local'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className='border rounded p-2 w-full'
          required
        />
      </div>
      <div>
        <label className='block font-medium'>Recorrência</label>
        <select
          value={recurrence}
          onChange={(e) => setRecurrence(e.target.value)}
          className='border rounded p-2 w-full'
        >
          <option value='daily'>Diário</option>
          <option value='weekly'>Semanal</option>
        </select>
      </div>
      <div>
        <label className='block font-medium'>Ocorrências</label>
        <input
          type='number'
          value={occurrences}
          onChange={(e) => setOccurrences(e.target.value)}
          className='border rounded p-2 w-full'
          min={1}
        />
      </div>
      <button
        type='submit'
        className='bg-blue-500 text-white px-4 py-2 rounded'
      >
        Criar Eventos
      </button>
    </form>
  );
};
EventForm.propTypes = {
  onCreateEvents: PropTypes.func.isRequired,
};

export default EventForm;
