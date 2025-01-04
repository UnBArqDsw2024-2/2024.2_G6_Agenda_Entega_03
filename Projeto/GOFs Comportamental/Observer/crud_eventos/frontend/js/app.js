const apiBase = "http://127.0.0.1:5000/events";

document.getElementById("event-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.getElementById("event-id").value;
  const title = document.getElementById("title").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  const eventData = { title, date, time };

  if (id) {
    // Editar evento
    await fetch(`${apiBase}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
  } else {
    // Criar evento
    await fetch(apiBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(eventData),
    });
  }

  document.getElementById("event-form").reset();
  loadEvents();
});

async function loadEvents() {
  const response = await fetch(apiBase);
  const data = await response.json();

  const eventsList = document.getElementById("events-list");
  eventsList.innerHTML = "";

  data.events.forEach((event) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${event.title} - ${event.date} ${event.time}
      <div>
        <button onclick="editEvent(${event.id})">Editar</button>
        <button onclick="deleteEvent(${event.id})">Excluir</button>
      </div>
    `;
    eventsList.appendChild(li);
  });
}

async function editEvent(id) {
  const response = await fetch(`${apiBase}/${id}`);
  const event = (await response.json()).event;

  document.getElementById("event-id").value = event.id;
  document.getElementById("title").value = event.title;
  document.getElementById("date").value = event.date;
  document.getElementById("time").value = event.time;
}

async function deleteEvent(id) {
  await fetch(`${apiBase}/${id}`, { method: "DELETE" });
  loadEvents();
}

// Carregar eventos ao iniciar
loadEvents();
