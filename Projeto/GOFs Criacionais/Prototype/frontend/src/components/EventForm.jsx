import PropTypes from 'prop-types';
import { useState } from 'react';

const EventForm = ({ onCreateEvents }) => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [isAllDay, setIsAllDay] = useState(false);
  const [recurrence, setRecurrence] = useState('none');
  const [recurrence1, setRecurrence1] = useState('none');
  const [showCustomRecurrence, setShowCustomRecurrence] = useState(false);
  const [customRecurrence, setCustomRecurrence] = useState({
    frequency: 'daily',
    endOption: 'never',
    endDate: '',
    occurrences: 1,
  });

  const handleRecurrenceChange = (value) => {
    setRecurrence1(value);
    setShowCustomRecurrence(value === 'custom');
    if (value !== 'custom') {
      if(value === 'daily'){
        setRecurrence({
          frequency: 'daily',
          endOption: 'never',
          endDate: '',
          occurrences: "365",
        });

      }
      if(value === 'weekly'){
        setRecurrence({
          frequency: 'weekly',
          endOption: 'never',
          endDate: '',
          occurrences: "52",
        });

      }
      if(value === 'monthly'){
        setRecurrence({
          frequency: 'monthly',
          endOption: 'never',
          endDate: '',
          occurrences: "12",
        });

      }
      if(value === 'yearly'){
        setRecurrence({
          frequency: 'yearly',
          endOption: 'never',
          endDate: '',
          occurrences: "5",
        });

      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data enviado:', {
      title,
      startDate,
      isAllDay,
      recurrence,
      customRecurrence,
    });

    const eventData = {
      title,
      startTime: startDate,
      isAllDay,
      recurrenceRule: recurrence === 'custom' ? customRecurrence : recurrence,
    };

    onCreateEvents(eventData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='space-y-6 p-4 bg-white rounded shadow'
    >
      <div>
        <h2 className='text-lg font-bold mb-2'>Detalhes do Evento</h2>
        <div className='space-y-4'>
          <div>
            <label className='block font-medium'>Título</label>
            <input
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Adicione um título para o evento'
              className='border rounded p-2 w-full'
              required
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
        </div>
      </div>

      <div>
        <h2 className='text-lg font-bold mb-2'>Recorrência</h2>
        <div className='space-y-4'>
          <div>
            <label className='block font-medium'>Tipo de Recorrência</label>
            <select
              value={recurrence1}
              onChange={(e) => handleRecurrenceChange(e.target.value)}
              className='border rounded p-2 w-full'
            >
              <option value='none'>Não se repete</option>
              <option value='daily'>Todos os dias</option>
              <option value='weekly'>Semanal</option>
              <option value='monthly'>Mensal</option>
              <option value='yearly'>Anual</option>
              <option value='custom'>Personalizado...</option>
            </select>
          </div>

          {showCustomRecurrence && (
            <div className='border rounded p-4 space-y-4'>
              <div>
                <label className='block font-medium'>Frequência</label>
                <select
                  value={customRecurrence.frequency}
                  onChange={(e) =>
                    setCustomRecurrence((prev) => ({
                      ...prev,
                      frequency: e.target.value,
                    }))
                  }
                  className='border rounded p-2 w-full'
                >
                  <option value='daily'>Todos os dias</option>
                  <option value='weekly'>Semanal</option>
                  <option value='monthly'>Mensal</option>
                  <option value='yearly'>Anual</option>
                </select>
              </div>

              <div>
                <label className='block font-medium'>Término</label>
                <select
                  value={customRecurrence.endOption}
                  onChange={(e) =>
                    setCustomRecurrence((prev) => ({
                      ...prev,
                      endOption: e.target.value,
                    }))
                  }
                  className='border rounded p-2 w-full'
                >
                  <option value='never'>Nunca</option>
                  <option value='afterOccurrences'>Após X ocorrências</option>
                </select>
              </div>

              {customRecurrence.endOption === 'endDate' && (
                <div>
                  <label className='block font-medium'>Data de término</label>
                  <input
                    type='date'
                    value={customRecurrence.endDate}
                    onChange={(e) =>
                      setCustomRecurrence((prev) => ({
                        ...prev,
                        endDate: e.target.value,
                      }))
                    }
                    className='border rounded p-2 w-full'
                  />
                </div>
              )}

              {customRecurrence.endOption === 'afterOccurrences' && (
                <div>
                  <label className='block font-medium'>
                    Número de ocorrências
                  </label>
                  <input
                    type='number'
                    value={customRecurrence.occurrences}
                    onChange={(e) =>
                      setCustomRecurrence((prev) => ({
                        ...prev,
                        occurrences: e.target.value,
                      }))
                    }
                    className='border rounded p-2 w-full'
                    min={1}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className='text-right'>
        <button
          type='submit'
          className='bg-blue-500 text-white px-4 py-2 rounded'
        >
          Criar Evento
        </button>
      </div>
    </form>
  );
};
EventForm.propTypes = {
  onCreateEvents: PropTypes.func.isRequired,
};

export default EventForm;
