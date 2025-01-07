from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simula dados de um perfil de usuário
perfil_usuario = {
    "nome": "Usuário Exemplo",
    "email": "exemplo@dominio.com",
    "senha": "senha123",
    "foto": None  # Pode ser uma URL da foto de perfil
}

@app.route("/perfil", methods=["GET"])
def get_perfil():
    return jsonify(perfil_usuario)

@app.route("/perfil", methods=["POST"])
def update_perfil():
    data = request.form
    perfil_usuario["nome"] = data.get("nome", perfil_usuario["nome"])
    perfil_usuario["email"] = data.get("email", perfil_usuario["email"])
    perfil_usuario["senha"] = data.get("senha", perfil_usuario["senha"])
    
    # Lidar com upload de foto
    foto = request.files.get("foto")
    if foto:
        # Salva a foto no servidor (apenas simulado aqui)
        perfil_usuario["foto"] = f"uploads/{foto.filename}"
        foto.save(f"uploads/{foto.filename}")
    
    return jsonify({"message": "Perfil atualizado com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)
