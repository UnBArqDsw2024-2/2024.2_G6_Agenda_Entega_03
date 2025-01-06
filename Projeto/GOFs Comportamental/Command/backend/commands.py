from flask import Flask, request, jsonify
from flask_cors import CORS

class Command:
    def execute(self):
        pass

    def undo(self):
        pass

class PersonalizarConfiguracoesCommand(Command):
    def __init__(self, perfil, nome=None, email=None, senha=None, foto=None):
        self.perfil = perfil
        self.nome = nome
        self.email = email
        self.senha = senha
        self.foto = foto

        # Para undo
        self.prev_perfil = perfil.copy()

    def execute(self):
        if self.nome:
            self.perfil["nome"] = self.nome
        if self.email:
            self.perfil["email"] = self.email
        if self.senha:
            self.perfil["senha"] = self.senha
        if self.foto:
            self.perfil["foto"] = self.foto

    def undo(self):
        self.perfil.update(self.prev_perfil)

class ConfiguracaoInvoker:
    def __init__(self):
        self.history = []

    def execute_command(self, command):
        self.history.append(command)
        command.execute()

    def undo_command(self):
        if self.history:
            command = self.history.pop()
            command.undo()

app = Flask(__name__)
CORS(app)

# Simula dados de um perfil de usuário
perfil_usuario = {
    "nome": "Usuário Exemplo",
    "email": "exemplo@dominio.com",
    "senha": "senha123",
    "foto": None  # Pode ser uma URL da foto de perfil
}

invoker = ConfiguracaoInvoker()

@app.route("/perfil", methods=["GET"])
def get_perfil():
    return jsonify(perfil_usuario)

@app.route("/perfil", methods=["POST"])
def update_perfil():
    data = request.form

    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")
    foto = request.files.get("foto")

    if foto:
        foto_path = f"uploads/{foto.filename}"
        foto.save(foto_path)
        foto = foto_path

    command = PersonalizarConfiguracoesCommand(
        perfil_usuario,
        nome=nome,
        email=email,
        senha=senha,
        foto=foto
    )
    invoker.execute_command(command)

    return jsonify({"message": "Perfil atualizado com sucesso!"})

@app.route("/perfil/undo", methods=["POST"])
def undo_perfil():
    invoker.undo_command()
    return jsonify({"message": "Alterações desfeitas!", "perfil": perfil_usuario})

if __name__ == "__main__":
    app.run(debug=True)
