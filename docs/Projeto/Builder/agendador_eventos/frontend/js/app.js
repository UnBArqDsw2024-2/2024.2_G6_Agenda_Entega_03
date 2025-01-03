document.getElementById("evento-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    // Captura os dados do formulário
    const data = {
        titulo: document.getElementById("titulo").value,
        data: document.getElementById("data").value.replace("T", " ") + ":00",
        local: document.getElementById("local").value,
        descricao: document.getElementById("descricao").value,
        lembrete: document.getElementById("lembrete").checked,
        categoria: document.getElementById("categoria").value,
    };

    // Envia os dados para o backend
    fetch("http://127.0.0.1:5000/criar_evento", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.erro) {
                alert("Erro: " + result.erro);
            } else {
                // Redireciona para a página de sucesso com os parâmetros do evento
                window.location.href = `sucesso.html?titulo=${encodeURIComponent(data.titulo)}&data=${encodeURIComponent(data.data)}&local=${encodeURIComponent(data.local)}&descricao=${encodeURIComponent(data.descricao)}&lembrete=${data.lembrete}&categoria=${encodeURIComponent(data.categoria)}`;
            }
        })
        .catch((error) => console.error("Erro:", error));
});
