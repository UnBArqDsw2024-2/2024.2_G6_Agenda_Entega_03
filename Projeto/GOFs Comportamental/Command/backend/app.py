from flask import Flask, request, jsonify
from flask_cors import CORS
from configuracao import ConfiguracaoUsuario
from commands import PersonalizarConfiguracoesCommand

app = Flask(__name__)
CORS(app)

configuracao_usuario = ConfiguracaoUsuario()
historico = []

@app.route("/configuracao", methods=["GET"])
def get_configuracao():
    return jsonify({
        "tema": configuracao_usuario.tema,
        "notificacoes": configuracao_usuario.notificacoes,
        "idioma": configuracao_usuario.idioma,
    })

@app.route("/configuracao", methods=["POST"])
def update_configuracao():
    data = request.json
    command = PersonalizarConfiguracoesCommand(
        configuracao_usuario,
        tema=data.get("tema", "padrão"),
        notificacoes=data.get("notificacoes", True),
        idioma=data.get("idioma", "pt-BR"),
    )
    command.execute()
    historico.append(command)

    return jsonify({"message": "Configuração atualizada com sucesso!"})

@app.route("/configuracao/undo", methods=["POST"])
def undo_configuracao():
    if historico:
        command = historico.pop()
        command.undo()
        return jsonify({"message": "Alteração desfeita!"})
    return jsonify({"message": "Nada para desfazer!"}), 400

if __name__ == "__main__":
    app.run(debug=True)
