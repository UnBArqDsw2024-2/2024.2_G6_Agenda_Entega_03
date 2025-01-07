// Dados mockados para simular lembretes
const lembretes = [];

// Função para criar lembrete
document.getElementById("criar-btn").addEventListener("click", () => {
    const mensagem = document.getElementById("mensagem").value;
    const dataHora = document.getElementById("data-hora").value;

    if (mensagem && dataHora) {
        const novoLembrete = {
            id: lembretes.length + 1,
            mensagem: mensagem,
            dataHora: dataHora
        };
        lembretes.push(novoLembrete);

        // Redirecionar para a página de confirmação
        window.location.href = "confirmacao.html";
    } else {
        alert("Erro: Preencha todos os campos para criar um lembrete.");
    }
});

// Função para obter lembrete
document.getElementById("obter-btn").addEventListener("click", () => {
    const id = parseInt(document.getElementById("id-lembrete").value);

    const lembrete = lembretes.find((l) => l.id === id);

    if (lembrete) {
        alert(`Lembrete encontrado: ${JSON.stringify(lembrete)}`);
    } else {
        alert("Erro: Lembrete não encontrado.");
    }
});

// Função para atualizar lembrete
document.getElementById("atualizar-btn").addEventListener("click", () => {
    const id = parseInt(document.getElementById("id-atualizar").value);
    const mensagem = document.getElementById("mensagem-atualizar").value;
    const dataHora = document.getElementById("data-hora-atualizar").value;

    const lembrete = lembretes.find((l) => l.id === id);

    if (lembrete && mensagem && dataHora) {
        lembrete.mensagem = mensagem;
        lembrete.dataHora = dataHora;
        alert(`Lembrete atualizado: ${JSON.stringify(lembrete)}`);
    } else {
        alert("Erro: Preencha todos os campos ou verifique o ID.");
    }
});
