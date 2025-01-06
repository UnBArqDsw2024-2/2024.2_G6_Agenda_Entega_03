const apiUrl = "http://127.0.0.1:5000";

document.getElementById("config-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const tema = document.getElementById("tema").value;
    const notificacoes = document.getElementById("notificacoes").checked;
    const idioma = document.getElementById("idioma").value;

    const response = await fetch(`${apiUrl}/configuracao`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tema, notificacoes, idioma }),
    });

    const data = await response.json();
    alert(data.message);
});

document.getElementById("undo-btn").addEventListener("click", async () => {
    const response = await fetch(`${apiUrl}/configuracao/undo`, { method: "POST" });
    const data = await response.json();
    alert(data.message);
});
