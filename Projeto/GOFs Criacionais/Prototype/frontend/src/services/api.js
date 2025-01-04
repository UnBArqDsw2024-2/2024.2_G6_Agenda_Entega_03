import axios from 'axios';

export async function createRecurringEvents(formData) {
  try {
    const response = await axios.post(
      'http://localhost:3000/task/create',
      formData
    );
    return response.data;
  } catch (error) {
    console.error('Erro ao criar eventos recorrentes:', error);
    return [];
  }
}
