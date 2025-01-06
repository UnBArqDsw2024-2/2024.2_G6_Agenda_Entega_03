const apiUrl = "http://127.0.0.1:5000";

document.getElementById("profile-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const foto = document.getElementById("foto").files[0];

    // Cria um objeto FormData para enviar a foto
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("email", email);
    formData.append("senha", senha);
    if (foto) {
        formData.append("foto", foto);
    }

    const response = await fetch(`${apiUrl}/perfil`, {
        method: "POST",
        body: formData,
    });

    if (response.ok) {
        window.location.href = "confirmacao.html";
    } else {
        const data = await response.json();
        alert(data.message || "Erro ao atualizar perfil.");
    }
});

document.getElementById("undo-btn").addEventListener("click", () => {
    window.location.href = "index.html"; // Redireciona para a página principal
});
