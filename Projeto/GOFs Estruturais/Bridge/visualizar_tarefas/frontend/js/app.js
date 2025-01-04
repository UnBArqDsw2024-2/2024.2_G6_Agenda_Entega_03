const apiBase = "http://127.0.0.1:5000/events";

// Carregar compromissos ao iniciar
document.addEventListener("DOMContentLoaded", () => {
  loadEvents();

  // Configuração do formulário para adicionar compromissos
  const eventForm = document.getElementById("event-form");
  eventForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    await createEvent();
    loadEvents();
    eventForm.reset();
  });

  // Configuração do filtro e modo de visualização
  const applyFilterButton = document.getElementById("apply-filter");
  applyFilterButton.addEventListener("click", () => {
    applyFilter();
  });

  // Permitir o uso da tecla Enter no campo de filtro
  const filterInput = document.getElementById("filter");
  filterInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      applyFilter();
    }
  });
});

// Função para carregar compromissos
async function loadEvents(mode = null, filter = null) {
  const url = new URL(apiBase);
  if (mode) url.searchParams.append("view", mode);
  if (filter) url.searchParams.append("filter", filter);

  const response = await fetch(url);
  const data = await response.json();

  const eventsList = document.getElementById("events-list");
  eventsList.innerHTML = "";

  data.events.forEach((event) => {
    const eventItem = document.createElement("div");
    eventItem.classList.add("event-item");

    eventItem.innerHTML = `
      <strong>${event.title}</strong><br>
      Data: ${event.date}<br>
      <button onclick="deleteEvent(${event.id})">Excluir</button>
    `;
    eventsList.appendChild(eventItem);
  });
}

// Função para criar um novo compromisso
async function createEvent() {
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;

  const response = await fetch(apiBase, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, date }),
  });

  if (!response.ok) {
    alert("Erro ao criar compromisso. Verifique os dados.");
  }
}

// Função para excluir um compromisso
async function deleteEvent(id) {
  const response = await fetch(`${apiBase}/${id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    loadEvents();
  } else {
    alert("Erro ao excluir compromisso.");
  }
}

// Função para aplicar filtros
function applyFilter() {
  const mode = document.getElementById("view-mode").value;
  const filter = document.getElementById("filter").value;
  loadEvents(mode, filter);
}
