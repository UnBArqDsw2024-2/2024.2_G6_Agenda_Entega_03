
# Documentação da Aplicação de Visualizar Tarefas

## Sobre o Projeto

A aplicação de Visualizar Tarefas foi projetada para facilitar o gerenciamento de compromissos, permitindo que os usuários criem, visualizem e organizem suas tarefas de forma eficiente. O projeto utiliza uma arquitetura simples, porém eficaz, combinando um backend em Flask com um frontend em HTML/CSS/JavaScript. A aplicação se destaca pela implementação do padrão de projeto **Bridge**, que permite a flexibilidade na exibição dos compromissos de acordo com diferentes necessidades (diário, semanal ou mensal).

Essa abordagem torna o sistema modular e fácil de manter, possibilitando a adição de novos modos de exibição e funcionalidades sem alterar drasticamente o código existente.

---

## Estrutura do Projeto

A estrutura do projeto segue uma organização clara para separar as responsabilidades de frontend e backend, além de centralizar as dependências Python no arquivo `requirements.txt`.

```
visualizar_tarefas/
├── frontend/
│   ├── index.html         # Página principal do frontend
│   ├── css/
│   │   └── styles.css     # Estilos do frontend
│   └── js/
│       └── main.js        # Script principal para interações
├── backend/
│   └── app.py             # Backend Flask
└── requirements.txt       # Dependências Python
```

- **Frontend:** Contém os arquivos necessários para a interface do usuário, permitindo interações como criação e visualização de compromissos.
- **Backend:** Centraliza a lógica de negócios e a interação com os dados dos compromissos.
- **Requirements.txt:** Lista todas as dependências Python necessárias para o funcionamento do backend.

---

## O que é o Padrão de Projeto Bridge?

O padrão de projeto **Bridge** é um padrão estrutural que busca desacoplar a abstração da sua implementação, permitindo que ambas evoluam independentemente. Ele é frequentemente utilizado em sistemas que precisam lidar com múltiplas dimensões de variação, como modos de visualização, estilos de layout ou diferentes formas de manipulação de dados.

No contexto deste projeto, o padrão Bridge resolve o problema de criar modos de exibição para os compromissos (diário, semanal e mensal), separando a lógica de exibição da interface de abstração, o que facilita a manutenção e a extensibilidade do código.

---

## Principais Elementos do Padrão Bridge

- **Abstraction:** Define a interface principal que os clientes utilizam. No projeto, isso é representado pela classe `ScheduleView`.
- **RefinedAbstraction:** Extende a abstração principal para incluir funcionalidades adicionais, como filtragem. Exemplo: `CustomScheduleView`.
- **Implementor:** Define a interface para as implementações específicas, como `DisplayMode`.
- **ConcreteImplementor:** São as implementações concretas dos modos de exibição, como `DayMode`, `WeekMode` e `MonthMode`.

---

## Aplicação no Projeto

### Abstração e Implementação no Sistema

- **Implementor:** Interface `DisplayMode` que define o método `display` para modos de exibição.
- **ConcreteImplementor:** Implementações específicas de `DisplayMode` para exibição diária, semanal e mensal.
- **Abstraction:** Interface `ScheduleView` que encapsula um modo de exibição e permite sua interação.
- **RefinedAbstraction:** Extensão de `ScheduleView` que adiciona funcionalidades de filtragem.

---

## Diagrama do Padrão Bridge no Projeto

Abaixo está o diagrama que ilustra a aplicação do padrão **Bridge** no projeto. Ele ajuda a visualizar a separação entre abstração e implementação, evidenciando a flexibilidade e modularidade do sistema.

<p style="text-align: center"><b>Diagrama 1:</b> Diagrama Bridge</p>
<div align="center">
  <img src="./images/3.2.Estruturais/bridge.png" width="850px">
</div>

### Contextualização do Diagrama:

- **DisplayMode (Interface):** Define o contrato que todos os modos de exibição precisam seguir.
- **DayMode, WeekMode, MonthMode:** Implementações específicas que exibem os compromissos conforme o modo selecionado.
- **ScheduleView (Interface):** Permite que os modos de exibição sejam encapsulados e utilizados de forma independente.
- **CustomScheduleView:** Extende `ScheduleView` e adiciona funcionalidades de filtragem, permitindo que o usuário personalize os resultados exibidos.

Esse diagrama reflete como as classes se relacionam, reforçando a separação de responsabilidades e a possibilidade de expansão futura do sistema.

---

## Exemplo no Código

## 1. Configuração Inicial do Backend

Este trecho configura o backend usando Flask, com suporte a CORS para permitir requisições de diferentes origens.

```python
from flask import Flask, jsonify, request
from flask_cors import CORS  # Suporte ao CORS
from abc import ABC, abstractmethod
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Ativar suporte ao CORS
```

- **Objetivo:** Criar a base do backend e configurar a API para aceitar requisições de diferentes origens.
- **CORS:** Necessário para evitar problemas ao integrar o frontend com o backend em diferentes servidores.

---

## 2. Banco de Dados Simulado

Aqui, utilizamos um dicionário em memória para armazenar os compromissos. Este banco simulado é ideal para propósitos de desenvolvimento e testes.

```python
events = {
    1: {"id": 1, "title": "Reunião", "date": "2025-01-10"},
    2: {"id": 2, "title": "Consulta Médica", "date": "2025-01-12"},
    3: {"id": 3, "title": "Aniversário", "date": "2025-01-15"},
}
next_id = 4
```

- **Objetivo:** Gerenciar os compromissos em tempo de execução, simulando um banco de dados.
- **`next_id`:** Controla os IDs únicos para novos compromissos.

---

## 3. Definição do Padrão Bridge

### 3.1. Interface `DisplayMode` (Implementor)

Define a interface base para todos os modos de exibição.

```python
class DisplayMode(ABC):
    @abstractmethod
    def display(self, events):
        pass
```

- **Papel no Bridge:** Fornece um contrato para os modos concretos (diário, semanal, mensal).

### 3.2. Implementações Concretas

Cada classe concreta implementa a lógica para exibir os compromissos em diferentes modos.

#### Modo Diário

```python
class DayMode(DisplayMode):
    def display(self, events):
        today = datetime.today().date()
        return [event for event in events if datetime.strptime(event["date"], "%Y-%m-%d").date() == today]
```

- **Objetivo:** Filtrar compromissos que acontecem no dia atual.

<p style="text-align: center"><b>Diagrama 2:</b> Modo Diario</p>
<div align="center">
  <img src="./images/3.2.Estruturais/ModoDiario.png" width="850px">
</div>


#### Modo Semanal

```python
class WeekMode(DisplayMode):
    def display(self, events):
        today = datetime.today().date()
        return [
            event for event in events
            if today <= datetime.strptime(event["date"], "%Y-%m-%d").date() <= today + timedelta(days=7)
        ]
```

- **Objetivo:** Filtrar compromissos que acontecem na semana atual.

<p style="text-align: center"><b>Diagrama 3:</b> Modo Semanal</p>
<div align="center">
  <img src="./images/3.2.Estruturais/ModoSemanal.png" width="850px">
</div>

#### Modo Mensal

```python
class MonthMode(DisplayMode):
    def display(self, events):
        today = datetime.today().date()
        return [
            event for event in events
            if datetime.strptime(event["date"], "%Y-%m-%d").date().month == today.month
        ]
```

- **Objetivo:** Filtrar compromissos que acontecem no mês atual.


<p style="text-align: center"><b>Diagrama 4:</b> Modo Mensal</p>
<div align="center">
  <img src="./images/3.2.Estruturais/ModoMensal.png" width="850px">
</div>

---

## 4. Abstração e Extensão (ScheduleView e CustomScheduleView)

### 4.1. Abstração (ScheduleView)

A classe base que conecta a abstração (`ScheduleView`) à implementação (`DisplayMode`).

```python
class ScheduleView(ABC):
    def __init__(self, mode: DisplayMode):
        self.mode = mode

    @abstractmethod
    def show(self, events):
        pass
```

- **Papel no Bridge:** Faz a ponte entre a abstração e as implementações concretas.

### 4.2. Extensão (CustomScheduleView)

Extende a abstração para adicionar funcionalidade extra, como filtragem.

```python
class CustomScheduleView(ScheduleView):
    def __init__(self, mode: DisplayMode, filter_criteria=None):
        super().__init__(mode)
        self.filter_criteria = filter_criteria

    def show(self, events):
        filtered_events = self.mode.display(events)
        if self.filter_criteria:
            filtered_events = [
                event for event in filtered_events if self.filter_criteria.lower() in event["title"].lower()
            ]
        return filtered_events
```

- **Objetivo:** Permitir filtros adicionais baseados no título dos compromissos.

---

## 5. Rotas do Flask

### 5.1. Rota para Obter Compromissos

Essa rota utiliza o padrão Bridge para exibir compromissos com base no modo (diário, semanal, mensal) e aplicar filtros.

```python
@app.route("/events", methods=["GET"])
def get_events():
    mode = request.args.get("view")  # Ex: `day`, `week`, `month`
    filter_criteria = request.args.get("filter")  # Filtro por título
    display_mode = None

    if mode == "day":
        display_mode = DayMode()
    elif mode == "week":
        display_mode = WeekMode()
    elif mode == "month":
        display_mode = MonthMode()
    else:
        return jsonify({"events": list(events.values())})

    schedule_view = CustomScheduleView(display_mode, filter_criteria)
    filtered_events = schedule_view.show(list(events.values()))
    return jsonify({"events": filtered_events})
```

- **Uso do Bridge:** O `CustomScheduleView` conecta a abstração ao modo concreto, aplicando filtros conforme necessário.

### 5.2. Rota para Criar um Compromisso

Permite criar novos compromissos e adicioná-los ao banco simulado.

```python
@app.route("/events", methods=["POST"])
def create_event():
    global next_id
    data = request.json

    if not data or not all(key in data for key in ["title", "date"]):
        return jsonify({"error": "Dados inválidos. Informe 'title' e 'date'."}), 400

    new_event = {
        "id": next_id,
        "title": data["title"],
        "date": data["date"],
    }
    events[next_id] = new_event
    next_id += 1
    return jsonify({"message": "Compromisso criado com sucesso!", "event": new_event}), 201
```

### 5.3. Rota para Excluir um Compromisso

Remove um compromisso do banco simulado com base no ID.

```python
@app.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    if event_id not in events:
        return jsonify({"error": "Compromisso não encontrado."}), 404

    del events[event_id]
    return jsonify({"message": "Compromisso excluído com sucesso!"})
```

---

## 6. Execução do Backend

O servidor Flask é iniciado no modo de depuração.

```python
if __name__ == "__main__":
    app.run(debug=True)
```


## Vantagens do Padrão Bridge

- **Extensibilidade:** Permite adicionar novos modos de exibição ou filtros sem alterar o código existente.
- **Reutilização:** Componentes como `DisplayMode` podem ser reutilizados em diferentes partes do sistema.
- **Separação de Responsabilidades:** Facilita a manutenção e evolução do sistema.

---

## Histórico de Versão

| Versão | Data       | Descrição                    | Autor(es)                     | Data de revisão | Revisor(es) |
|--------|------------|------------------------------|--------------------------------|-----------------|-------------|
| `1.0`  | 23/12/2024 | Versão inicial da documentação.   | [João Barreto](https://github.com/JoaoBarreto03) e [Johnny da Ponte](https://github.com/JohnnyLopess) |  06/01/2025       |    [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) 
