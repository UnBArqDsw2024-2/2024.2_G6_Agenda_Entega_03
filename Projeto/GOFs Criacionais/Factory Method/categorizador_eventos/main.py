from abc import ABC, abstractmethod
from datetime import datetime
from typing import Optional, Dict, List
from flask import Flask, request, jsonify
from flask_cors import CORS
import json

# Product
class EventoBase(ABC):
    def __init__(self, titulo: str, data: datetime, local: Optional[str] = None,
                 descricao: Optional[str] = None, lembrete: bool = False):
        self.titulo = titulo
        self.data = data
        self.local = local
        self.descricao = descricao
        self.lembrete = lembrete
        self.dataCriacao = datetime.now()
        self.status = "Agendado"

    @abstractmethod
    def get_prioridade(self) -> str:
        pass

    def to_dict(self) -> dict:
        return {
            "titulo": self.titulo,
            "data": self.data.strftime("%Y-%m-%d %H:%M:%S"),
            "local": self.local,
            "descricao": self.descricao,
            "lembrete": self.lembrete,
            "categoria": self.__class__.__name__,
            "prioridade": self.get_prioridade(),
            "status": self.status,
            "dataCriacao": self.dataCriacao.strftime("%Y-%m-%d %H:%M:%S")
        }

# Creator
class EventoFactory(ABC):
    @abstractmethod
    def criar_evento(self, titulo: str, data: str, local: Optional[str] = None,
                    descricao: Optional[str] = None, lembrete: bool = False) -> EventoBase:
        pass

# Dynamic Event Class Generator
def criar_classe_evento(nome: str, prioridade: str) -> type:
    """Cria dinamicamente uma nova classe de evento"""
    def get_prioridade(self) -> str:
        return self._prioridade

    # Cria nova classe de evento dinamicamente
    return type(
        nome,
        (EventoBase,),
        {
            'get_prioridade': get_prioridade,
            '_prioridade': prioridade
        }
    )

# Dynamic Factory Class Generator
def criar_classe_factory(nome: str, classe_evento: type) -> type:
    """Cria dinamicamente uma nova classe factory"""
    def criar_evento(self, titulo: str, data: str, local: Optional[str] = None,
                    descricao: Optional[str] = None, lembrete: bool = False) -> EventoBase:
        data_obj = datetime.strptime(data, "%Y-%m-%d %H:%M:%S")
        return classe_evento(titulo, data_obj, local, descricao, lembrete)

    # Cria nova classe factory dinamicamente
    return type(
        f"{nome}Factory",
        (EventoFactory,),
        {
            'criar_evento': criar_evento
        }
    )

class GerenciadorEventos:
    def __init__(self):
        self.categorias: Dict[str, Dict] = {}  # nome -> {prioridade, factory}
        self.carregar_configuracoes()

    def carregar_configuracoes(self):
        """Carrega configurações do arquivo"""
        try:
            with open('configuracoes.json', 'r') as f:
                dados = json.load(f)
                for categoria in dados.get('categorias', []):
                    self.registrar_categoria(
                        categoria['nome'],
                        categoria['prioridade']
                    )
        except FileNotFoundError:
            # Cria categoria padrão se arquivo não existir
            self.registrar_categoria("Geral", "Média")

    def salvar_configuracoes(self):
        """Salva configurações em arquivo"""
        dados = {
            'categorias': [
                {
                    'nome': nome,
                    'prioridade': info['prioridade']
                }
                for nome, info in self.categorias.items()
            ]
        }
        with open('configuracoes.json', 'w') as f:
            json.dump(dados, f)

    def registrar_categoria(self, nome: str, prioridade: str) -> None:
        """Registra uma nova categoria de evento com sua factory"""
        nome_normalizado = nome.title().replace(" ", "")
        
        # Cria classe de evento para a categoria
        classe_evento = criar_classe_evento(nome_normalizado, prioridade)
        
        # Cria factory para a categoria
        classe_factory = criar_classe_factory(nome_normalizado, classe_evento)
        
        # Instancia e registra a factory
        self.categorias[nome.lower()] = {
            'prioridade': prioridade,
            'factory': classe_factory()
        }
        
        self.salvar_configuracoes()

    def remover_categoria(self, nome: str) -> None:
        """Remove uma categoria de evento"""
        if nome.lower() in self.categorias:
            del self.categorias[nome.lower()]
            self.salvar_configuracoes()

    def get_factory(self, categoria: str) -> EventoFactory:
        """Retorna a factory para uma categoria específica"""
        info = self.categorias.get(categoria.lower())
        if not info:
            raise ValueError(f"Categoria não encontrada: {categoria}")
        return info['factory']

# Flask Application
app = Flask(__name__)
CORS(app)

gerenciador = GerenciadorEventos()

@app.route("/api/categorias", methods=["GET"])
def listar_categorias():
    """Lista todas as categorias disponíveis"""
    return jsonify({
        "categorias": [
            {
                "nome": nome,
                "prioridade": info['prioridade']
            }
            for nome, info in gerenciador.categorias.items()
        ]
    })

@app.route("/api/categorias", methods=["POST"])
def criar_categoria():
    """Cria uma nova categoria"""
    dados = request.json
    try:
        nome = dados["nome"]
        prioridade = dados["prioridade"]
        
        if nome.lower() in gerenciador.categorias:
            return jsonify({"erro": "Categoria já existe"}), 400
        
        gerenciador.registrar_categoria(nome, prioridade)
        return jsonify({"mensagem": "Categoria criada com sucesso"}), 201
    
    except KeyError as e:
        return jsonify({"erro": f"Campo obrigatório ausente: {str(e)}"}), 400

@app.route("/api/eventos", methods=["POST"])
def criar_evento():
    """Cria um novo evento"""
    dados = request.json
    try:
        categoria = dados["categoria"]
        factory = gerenciador.get_factory(categoria)
        
        evento = factory.criar_evento(
            titulo=dados["titulo"],
            data=dados["data"],
            local=dados.get("local"),
            descricao=dados.get("descricao"),
            lembrete=dados.get("lembrete", False)
        )
        
        return jsonify(evento.to_dict()), 201
    
    except (KeyError, ValueError) as e:
        return jsonify({"erro": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)