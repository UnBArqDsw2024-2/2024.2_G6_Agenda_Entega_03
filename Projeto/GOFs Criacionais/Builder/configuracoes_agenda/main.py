# EXPLICAÇÃO DO SINGLETON
# A classe Configuracoes usa o método __new__ para garantir que apenas uma instância será criada durante a execução da aplicação.
# Todas as alterações feitas às configurações são refletidas globalmente, mantendo a consistência no uso da agenda.

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class Configuracoes:
    _instancia = None

    def __new__(cls, *args, **kwargs):
        if not cls._instancia:
            cls._instancia = super().__new__(cls)
            # Configurações padrão
            cls._instancia.fuso_horario = "UTC"
            cls._instancia.idioma = "pt-BR"
            cls._instancia.tema = "claro"
        return cls._instancia

    def atualizar_configuracoes(self, fuso_horario=None, idioma=None, tema=None):
        if fuso_horario:
            self.fuso_horario = fuso_horario
        if idioma:
            self.idioma = idioma
        if tema:
            self.tema = tema

    def to_dict(self):
        return {
            "fuso_horario": self.fuso_horario,
            "idioma": self.idioma,
            "tema": self.tema,
        }


@app.route("/configuracoes", methods=["GET", "POST"])
def gerenciar_configuracoes():
    configuracoes = Configuracoes()

    if request.method == "POST":
        data = request.json
        configuracoes.atualizar_configuracoes(
            fuso_horario=data.get("fuso_horario"),
            idioma=data.get("idioma"),
            tema=data.get("tema"),
        )
        return jsonify({"mensagem": "Configurações atualizadas com sucesso!"}), 200

    return jsonify(configuracoes.to_dict()), 200


if __name__ == "__main__":
    app.run(debug=True)
