// Aguarda o carregamento do DOM
document.addEventListener("DOMContentLoaded", function () {
    carregarCategorias();
    configurarFormulario();
});

// Função para carregar categorias dinamicamente
function carregarCategorias() {
    fetch("http://127.0.0.1:5000/api/categorias")
        .then((response) => response.json())
        .then((result) => {
            const categoriaSelect = document.getElementById("categoria");
            result.categorias.forEach((cat) => {
                const option = document.createElement("option");
                option.value = cat.nome.toLowerCase();
                option.textContent = `${cat.nome} (Prioridade: ${cat.prioridade})`;
                categoriaSelect.appendChild(option);
            });
        })
        .catch((error) => console.error("Erro ao carregar categorias:", error));
}

// Função para configurar o formulário e enviar os dados ao backend
function configurarFormulario() {
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
            prioridade: document.getElementById("prioridade").value,
        };

        // Validação básica
        if (!data.categoria) {
            alert("Por favor, selecione uma categoria.");
            return;
        }

        // Envia os dados para o backend
        fetch("http://127.0.0.1:5000/api/eventos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((result) => {
                if (result.erro) {
                    alert("Erro ao criar evento: " + result.erro);
                } else {
                    alert("Evento criado com sucesso!");
                    document.getElementById("evento-form").reset(); // Limpa o formulário
                }
            })
            .catch((error) => console.error("Erro ao criar evento:", error));
    });
}
