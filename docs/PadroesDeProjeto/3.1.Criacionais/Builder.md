
# Documentação da Aplicação de Criação de Eventos

## Sobre o Projeto

Este projeto utiliza o padrão de projeto **Builder**, que faz parte dos padrões criacionais definidos pela Gang of Four (GoF). A aplicação é projetada para criar eventos personalizados com diversos atributos, como título, data, local, descrição, lembrete, categoria e status. 

O uso do Builder neste contexto facilita a criação de objetos complexos (eventos), separando a lógica de construção do objeto da sua representação. Isso permite flexibilidade na construção dos eventos, adicionando ou omitindo campos conforme necessário.

---

## Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
builder_eventos/
├── app.py            # Código principal da aplicação Flask
└── requirements.txt  # Dependências do projeto
```

---

## O que é o Padrão de Projeto Builder?

O padrão **Builder** é um padrão criacional que separa a construção de um objeto complexo da sua representação, permitindo que o mesmo processo de construção crie diferentes representações. 

No projeto atual, o Builder é utilizado para criar objetos da classe `Evento`, onde cada evento pode ter uma combinação única de atributos, mas o processo de construção é padronizado.

### Principais Benefícios do Builder

1. **Separação da Lógica de Construção:** A lógica de como o objeto é criado é separada da sua representação.
2. **Flexibilidade:** Permite adicionar ou omitir atributos durante a construção.
3. **Facilidade de Manutenção:** Reduz a complexidade do código ao encapsular a lógica de construção em uma classe separada.

---

## Diagrama do Padrão Builder no Projeto

![Diagrama do Padrão Builder](/2024.2_G6_Agenda_Entega_03/docs/images/3.1.Criacionais/Builder.png)

### Contextualização do Diagrama

- **Classe Evento:** Representa o objeto final que será construído.
- **EventoBuilder:** Contém toda a lógica de construção, permitindo criar eventos com diferentes combinações de atributos.
- **Métodos de Configuração:** Cada método do Builder define um atributo específico do evento.
- **Build:** Finaliza o processo de construção, garantindo que os requisitos obrigatórios sejam atendidos.

---

## Aplicação no Projeto

### 1. **Classe Evento**

A classe `Evento` define o objeto que será construído pelo Builder. Ela contém todos os atributos necessários para um evento e um método `to_dict` para facilitar a conversão em JSON.

```python
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
```

### 2. **Classe EventoBuilder**

A classe `EventoBuilder` encapsula o processo de construção de objetos `Evento`. Ela fornece métodos para definir cada atributo do evento e um método `build` para criar o objeto final.

```python
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
```

### 3. **Rota para Criar um Evento**

A rota `/criar_evento` utiliza o `EventoBuilder` para criar eventos com base nos dados enviados pelo cliente.

```python
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
```

- **Objetivo:** Permitir a criação de eventos personalizados.
- **Uso do Builder:** Cada atributo do evento é configurado usando os métodos do `EventoBuilder`.

---

## Vantagens do Padrão Builder no Projeto

1. **Personalização:** Permite criar eventos personalizados de maneira estruturada.
2. **Validação Centralizada:** A lógica de validação (como título e data obrigatórios) é encapsulada no método `build`.
3. **Facilidade de Extensão:** Novos atributos podem ser adicionados ao evento sem alterar o fluxo principal.

---

## Histórico de Versão

| Versão | Data       | Descrição                  | Autor(es)                     | Data de Revisão | Revisor(es) |
|--------|------------|----------------------------|--------------------------------|-----------------|-------------|
| `1.0`  | 06/01/2025 | Versão inicial do projeto. | João Barreto e Johnny da Ponte| -               | -           |
