from flask import Flask, request, jsonify
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Permite requisições de qualquer origem


# Evento e Builder
class Evento:
    def __init__(self, titulo, data, local=None, descricao=None, lembrete=False,
                 categoria=None, status="Agendado", dataCriacao=None):
        self.titulo = titulo
        self.data = data
        self.local = local
        self.descricao = descricao
        self.lembrete = lembrete
        self.categoria = categoria
        self.status = status
        self.dataCriacao = dataCriacao if dataCriacao else datetime.now()

    def to_dict(self):
        return {
            "titulo": self.titulo,
            "data": self.data.strftime("%Y-%m-%d %H:%M:%S"),
            "local": self.local,
            "descricao": self.descricao,
            "lembrete": self.lembrete,
            "categoria": self.categoria,
            "status": self.status,
            "dataCriacao": self.dataCriacao.strftime("%Y-%m-%d %H:%M:%S"),
        }


class EventoBuilder:
    def __init__(self):
        self.titulo = None
        self.data = None
        self.local = None
        self.descricao = None
        self.lembrete = False
        self.categoria = None
        self.status = "Agendado"

    def set_titulo(self, titulo):
        self.titulo = titulo
        return self

    def set_data(self, data):
        self.data = datetime.strptime(data, "%Y-%m-%d %H:%M:%S")
        return self

    def set_local(self, local):
        self.local = local
        return self

    def set_descricao(self, descricao):
        self.descricao = descricao
        return self

    def set_lembrete(self, lembrete):
        self.lembrete = lembrete
        return self

    def set_categoria(self, categoria):
        self.categoria = categoria
        return self

    def build(self):
        if not self.titulo or not self.data:
            raise ValueError("Título e Data são obrigatórios.")
        return Evento(
            titulo=self.titulo,
            data=self.data,
            local=self.local,
            descricao=self.descricao,
            lembrete=self.lembrete,
            categoria=self.categoria,
            status=self.status,
        )


# Rota para criar um evento
@app.route("/criar_evento", methods=["POST"])
def criar_evento():
    data = request.json
    try:
        builder = EventoBuilder()
        evento = (builder
                  .set_titulo(data["titulo"])
                  .set_data(data["data"])
                  .set_local(data.get("local"))
                  .set_descricao(data.get("descricao"))
                  .set_lembrete(data.get("lembrete", False))
                  .set_categoria(data.get("categoria"))
                  .build())
        return jsonify(evento.to_dict()), 201
    except Exception as e:
        return jsonify({"erro": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True)
