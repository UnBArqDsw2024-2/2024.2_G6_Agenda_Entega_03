# Flyweight

## Introdução

O padrão de projeto <b>Flyweight</b> é um dos padrões estruturais definidos pela Gang of Four (GoF) e tem como principal objetivo reduzir o consumo de memória e otimizar o desempenho em sistemas que 
precisam manipular um grande número de objetos semelhantes. Ele faz isso promovendo o compartilhamento de partes comuns dos objetos, armazenando-as em um local centralizado e reutilizando-as sempre
que possível.

O Flyweight é amplamente utilizado em cenários onde há a necessidade de criar múltiplas instâncias semelhantes de uma classe, como:

- Renderização de gráficos ou textos.
- Representação de peças em jogos de tabuleiro.
- Gerenciamento de conexões em sistemas distribuídos.

## Elementos Principais do Flyweight

### **1. Flyweight (Interface ou Classe Abstrata)**

Define a interface comum para todos os objetos Flyweight. Essa interface normalmente contém métodos que permitem manipular o estado extrínseco, que será fornecido pelo cliente no momento da
execução.

- Representa o comportamento compartilhado pelos objetos.
- Garante que os estados intrínsecos sejam imutáveis.

### **2. Concrete Flyweight (Implementação Concreta)**

É a implementação concreta da interface Flyweight. Armazena o estado intrínseco (compartilhado e imutável) e implementa as operações definidas na interface ou classe abstrata.

- Otimiza o uso de memória compartilhando o estado intrínseco.
- Representa os objetos reutilizáveis no sistema.

### **3. Unshared Flyweight**

Em alguns casos, objetos Flyweight não são totalmente compartilhados. O padrão permite objetos individuais que não seguem o compartilhamento, geralmente para armazenar informações específicas
que não podem ser generalizadas.

- Útil quando parte do sistema exige instâncias exclusivas.

### **4. Flyweight Factory (Fábrica de Flyweight)**

Responsável por gerenciar e garantir o compartilhamento das instâncias Flyweight. Ela:

- Cria novos objetos Flyweight apenas quando necessário.
- Retorna instâncias existentes se o objeto já tiver sido criado anteriormente.
- Centraliza o gerenciamento do pool de objetos compartilhados.

### **5. Client (Cliente)**

Representa o código que usa o Flyweight. O cliente é responsável por:

- Fornecer o estado extrínseco necessário ao usar um Flyweight.
- Delegar a criação ou obtenção de objetos à fábrica.

## Vantagens e Justificativas para o uso do Flyweight:

O padrão Flyweight é especialmente útil em situações onde a criação e manipulação de um grande número de objetos impacta diretamente o desempenho e o consumo de memória do sistema.

1. **Redução no consumo de memória**: ao compartilhar o estado intrínseco (imutável), o Flyweight minimiza a duplicação de dados, reduzindo significativamente o uso de memória.
2. **Melhor desempenho**: com menos objetos alocados na memória, operações como buscas, ordenações e manipulações se tornam mais rápidas.
3. **Flexibilidade**: a separação entre os estados intrínseco e extrínseco oferece flexibilidade para personalizar objetos sem necessidade de criar novas instâncias.
4. **Organização centralizada**: o uso de uma fábrica (Flyweight Factory) facilita o gerenciamento dos objetos Flyweight e garante a consistência no compartilhamento.
5. **Facilidade de manutenção**: Como o estado intrínseco é centralizado, as alterações necessárias nesse estado impactam todas as instâncias compartilhadas, tornando a manutenção mais simples.

## Metodologia

Para aplicar o padrão Flyweight, seguimos uma abordagem incremental, que permite validar a eficácia do padrão à medida que os componentes são desenvolvidos:

1. **Análise do Domínio e Identificação de Estados**:
   - O sistema de gerenciamento de eventos foi analisado para identificar atributos comuns entre as categorias (estado intrínseco) e atributos específicos de cada evento (estado extrínseco).
   - Atributos como **nome**, **cor** e **ícone** foram definidos como parte do estado intrínseco.

2. **Implementação do Flyweight**:
   - A classe `CategoriaFlyweight` foi implementada para gerenciar os estados intrínsecos.
   - Uma fábrica (`Flyweight Factory`) foi desenvolvida para gerenciar as instâncias de `CategoriaFlyweight`, evitando duplicações.

3. **Criação de Eventos**:
   - A classe `Evento` foi projetada para incluir um título, data e uma referência à categoria compartilhada.
   - O estado extrínseco (específico do evento) é armazenado diretamente na instância de `Evento`.

4. **Testes e Validação**:
   - Testamos o sistema criando eventos com diferentes categorias, garantindo que as instâncias de categorias compartilhadas fossem reutilizadas corretamente.
   - Monitoramos o consumo de memória para validar os ganhos obtidos com o Flyweight.

## Modelagem

### Diagrama de Classes

```plaintext
+--------------------+          +------------------------+
|  CategoriaFlyweight |<--------|      FlyweightFactory  |
+--------------------+          +------------------------+
| - nome             |          | - categorias: dict     |
| - cor              |          | + get_flyweight(...)   |
| - icone            |          |                        |
+--------------------+          +------------------------+
        ^
        |
        |
+--------------------+
|      Evento        |
+--------------------+
| - titulo           |
| - data             |
| - categoria:       |
|   CategoriaFlyweight|
+--------------------+
```

## Código

O código é dividio em front-end e back-end. Por ser uma aplicação muito simples, o back-end inteiro se dispõe no arquivo main.py:

```python
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
```

## Como rodar

Tenha o [pyhton 3](https://www.python.org/downloads/) e o gerenciador de pacote pip instalado em sua máquina.

Abra o local do arquivo:
```bash
 cd '.\Projeto\GOFs Estruturais\flyweight_categorias\'
```

Instale as dependências com:
```bash
pip install -r requirements.txt
```

Inicie o Back-end:
```bash
python main.py
```

Abra o arquivo `frontend/index.html` no navegador da sua preferência e teste.

## Referências
> <a>1.</a> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>2.</a> FREEMAN, Eric; FREEMAN, Elisabeth Robson. Head First Design Patterns: A Brain-Friendly Guide. 2. ed. Sebastopol: O'Reilly Media, 2020. <br>
> <a>3.</a> FOWLER, Martin. Patterns of Enterprise Application Architecture. Boston: Addison-Wesley, 2003. <br>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 05/01/2025 | Estrutura do artefato | [Gabriel Souza](https://github.com/GabrielMS00) | [Yago](https://github.com/yagompassos) |
| `1.1`  | 05/01/2025 | Metodologia | [Yago](https://github.com/yagompassos) | |