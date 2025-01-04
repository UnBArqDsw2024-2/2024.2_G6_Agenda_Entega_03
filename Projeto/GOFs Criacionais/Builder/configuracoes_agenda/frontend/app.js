document.getElementById("config-form").addEventListener("submit", async (event) => {
    event.preventDefault();

    const fuso_horario = document.getElementById("fuso_horario").value;
    const idioma = document.getElementById("idioma").value;
    const tema = document.getElementById("tema").value;

    try {
        await fetch("http://127.0.0.1:5000/configuracoes", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ fuso_horario, idioma, tema }),
        });

        alert("Configurações atualizadas com sucesso!");
        carregarConfiguracoes();
    } catch (error) {
        console.error("Erro ao atualizar configurações:", error);
    }
});

async function carregarConfiguracoes() {
    try {
        const response = await fetch("http://127.0.0.1:5000/configuracoes");
        const configuracoes = await response.json();

        document.getElementById("config-output").innerText = JSON.stringify(configuracoes, null, 2);
    } catch (error) {
        console.error("Erro ao carregar configurações:", error);
    }
}

// Carregar configurações ao iniciar
carregarConfiguracoes();
