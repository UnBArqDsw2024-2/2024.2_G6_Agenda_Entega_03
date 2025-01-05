document.getElementById('view-event-btn').addEventListener('click', async () => {
    const eventId = document.getElementById('event-id').value;
    const userId = document.getElementById('user-id-view').value;
    const output = document.getElementById('event-output');
  
    // Certifique-se de que o bloco está oculto inicialmente
    output.classList.add('hidden');
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/event/${eventId}`, {
        method: 'GET',
        headers: { 'User-ID': userId }
      });
  
      const data = await response.json();
      if (response.ok) {
        // Formatar os dados para exibição
        const { title, owner, shared_with } = data.event;
        output.innerHTML = `
          <strong>Título:</strong> ${title} <br>
          <strong>Proprietário:</strong> ${owner} <br>
          <strong>Compartilhado com:</strong> ${shared_with.length > 0 ? shared_with.join(', ') : 'Nenhum usuário'}
        `;
        output.classList.remove('hidden'); // Mostrar o bloco
      } else {
        output.textContent = `Erro: ${data.error}`;
        output.classList.remove('hidden'); // Mostrar o bloco
      }
    } catch (error) {
      output.textContent = 'Erro na requisição.';
      output.classList.remove('hidden'); // Mostrar o bloco
    }
  });  
  
  document.getElementById('share-event-btn').addEventListener('click', async () => {
    const eventId = document.getElementById('event-id-share').value;
    const userId = document.getElementById('user-id-share').value;
    const targetUserId = document.getElementById('target-user-id').value;
    const output = document.getElementById('share-output');
  
    try {
      const response = await fetch(`http://127.0.0.1:5000/event/${eventId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'User-ID': userId },
        body: JSON.stringify({ user: targetUserId })
      });
  
      const data = await response.json();
      if (response.ok) {
        output.textContent = data.message;
      } else {
        output.textContent = `Erro: ${data.error}`;
      }
    } catch (error) {
      output.textContent = 'Erro na requisição.';
    }
  });
  