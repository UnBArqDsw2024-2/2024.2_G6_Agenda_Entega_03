# Guia para Rodar a Aplicação de Agendador de Eventos

Este projeto consiste em uma aplicação para criar, visualizar e gerenciar compromissos utilizando um backend em Flask e um frontend em HTML/CSS/JavaScript. A aplicação implementa o padrão de projeto **Bridge** para gerenciar diferentes modos de visualização de compromissos (diário, semanal e mensal).

---

## Estrutura do Projeto

```
agendador_eventos/
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

---

## Requisitos

- **Python 3.8 ou superior**
- **Pip** instalado para gerenciar pacotes Python
- **Navegador** compatível com ES6 (JavaScript moderno)

---

## O que é o Padrão de Projeto Bridge?

O padrão de projeto **Bridge** é um dos padrões estruturais definidos pela Gang of Four (GoF). Ele é usado para desacoplar uma abstração da sua implementação, permitindo que ambas possam evoluir de forma independente.

### Aplicação no Projeto

Neste projeto, o padrão Bridge foi usado para implementar diferentes modos de visualização de compromissos:

- **Implementor**: Define a interface para modos de exibição (`DisplayMode`).
- **ConcreteImplementor**: Modos de exibição específicos (`DayMode`, `WeekMode`, `MonthMode`).
- **Abstraction**: Define a interface de visualização (`ScheduleView`).
- **RefinedAbstraction**: Extende a abstração para aplicar filtros adicionais (`CustomScheduleView`).

### Exemplo no Código

#### Backend (Python)
```python
class DisplayMode(ABC):
    @abstractmethod
    def display(self, events):
        pass

class DayMode(DisplayMode):
    def display(self, events):
        return [event for event in events if event["date"] == "2025-01-01"]

class CustomScheduleView(ScheduleView):
    def __init__(self, mode: DisplayMode, filter_criteria=None):
        super().__init__(mode)
        self.filter_criteria = filter_criteria

    def show(self, events):
        filtered_events = self.mode.display(events)
        if self.filter_criteria:
            filtered_events = [e for e in filtered_events if self.filter_criteria in e["title"]]
        return filtered_events
```

**Vantagens:**
- **Extensibilidade:** Permite adicionar novos modos de exibição sem alterar o código existente.
- **Flexibilidade:** Abstração e implementação podem ser alteradas ou substituídas de forma independente.

---

## Passo a Passo para Rodar o Projeto

### 1. Clonar o Repositório

Faça o download do código fonte do projeto ou clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd agendador_eventos
```

### 2. Configurar o Backend

1. **Crie e ative um ambiente virtual** (opcional, mas recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

2. **Instale as dependências necessárias**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Inicie o servidor backend**:
   ```bash
   python backend/app.py
   ```

   O backend estará disponível em: `http://127.0.0.1:5000`

### 3. Configurar o Frontend

1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Inicie um servidor HTTP local:
   ```bash
   python -m http.server 8000
   ```

3. Acesse o frontend no navegador:
   ```
   http://127.0.0.1:8000/index.html
   ```

---

## Testar a Aplicação

1. Abra o navegador e acesse `http://127.0.0.1:8000/index.html`.
2. Use o formulário para criar compromissos com título e data.
3. Visualize compromissos nos modos diário, semanal ou mensal.
4. Filtre compromissos por título usando o campo de filtro.

---

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) | Data de revisão | Revisor(es) |
| :-: | :-: | :-: | :-: | :-: | :-: |
| `1.0` | 23/12/2024  | Versão inicial do projeto. | [João Barreto](https://github.com/JoaoBarreto03) e [Johnny da Ponte](https://github.com/JohnnyLopess) | - | - |