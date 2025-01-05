document.getElementById("evento-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const data = document.getElementById("data").value;
    const categoriaNome = document.getElementById("categoria-nome").value;
    const categoriaCor = document.getElementById("categoria-cor").value;
    const categoriaIcone = document.getElementById("categoria-icone").value;

    const evento = {
        titulo: titulo,
        data: data,
        categoria: {
            nome: categoriaNome,
            cor: categoriaCor,
            icone: categoriaIcone,
        },
    };

    try {
        const response = await fetch("http://127.0.0.1:5000/criar_evento", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(evento),
        });

        if (response.ok) {
            alert("Evento criado com sucesso!");
            listarEventos();
        } else {
            const error = await response.json();
            alert("Erro: " + error.erro);
        }
    } catch (error) {
        console.error("Erro:", error);
    }
});

async function listarEventos() {
    try {
        const response = await fetch("http://127.0.0.1:5000/listar_eventos");
        const eventos = await response.json();
        const eventosList = document.getElementById("eventos-list");
        eventosList.innerHTML = eventos
            .map(
                (evento) => `
            <div>
                <h3>${evento.titulo} (${evento.data})</h3>
                <p>Categoria: ${evento.categoria.nome} (Cor: ${evento.categoria.cor}, Ícone: ${evento.categoria.icone})</p>
            </div>
        `
            )
            .join("");
    } catch (error) {
        console.error("Erro ao listar eventos:", error);
    }
}

// Listar eventos ao carregar a página
listarEventos();
