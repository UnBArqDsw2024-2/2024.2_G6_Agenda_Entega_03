from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Flyweight: CategoriaFlyweight
class CategoriaFlyweight:
    _instances = {}

    def __new__(cls, nome, cor, icone):
        key = (nome, cor, icone)
        if key not in cls._instances:
            instance = super().__new__(cls)
            instance.nome = nome
            instance.cor = cor
            instance.icone = icone
            cls._instances[key] = instance
        return cls._instances[key]

    def to_dict(self):
        return {"nome": self.nome, "cor": self.cor, "icone": self.icone}


# Evento
class Evento:
    def __init__(self, titulo, data, categoria):
        self.titulo = titulo
        self.data = data
        self.categoria = categoria

    def to_dict(self):
        return {
            "titulo": self.titulo,
            "data": self.data,
            "categoria": self.categoria.to_dict(),
        }


# Simulando armazenamento em memória
eventos = []

# Rota para criar um evento com categoria
@app.route("/criar_evento", methods=["POST"])
def criar_evento():
    data = request.json
    try:
        categoria = CategoriaFlyweight(
            nome=data["categoria"]["nome"],
            cor=data["categoria"]["cor"],
            icone=data["categoria"]["icone"]
        )
        evento = Evento(
            titulo=data["titulo"],
            data=data["data"],
            categoria=categoria
        )
        eventos.append(evento)
        return jsonify(evento.to_dict()), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400


# Rota para listar eventos
@app.route("/listar_eventos", methods=["GET"])
def listar_eventos():
    return jsonify([evento.to_dict() for evento in eventos]), 200


if __name__ == "__main__":
    app.run(debug=True)
