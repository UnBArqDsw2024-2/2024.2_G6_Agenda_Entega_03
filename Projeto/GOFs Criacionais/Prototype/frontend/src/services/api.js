import axios from 'axios';

export async function createRecurringEvents(formData) {
  try {
    const response = await axios.post(
      'http://localhost:8080/task/create',
      formData
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao criar eventos recorrentes:', error);
    return [];
  }
}

export async function getEvents() {
  try {
    const response = await axios.get('http://localhost:8080/task/');
    return response.data;
  } catch (error) {
    console.error('Erro ao criar eventos recorrentes:', error);
    return [];
  }
}
