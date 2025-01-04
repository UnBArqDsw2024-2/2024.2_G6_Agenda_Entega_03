from flask import Flask, jsonify, request
from flask_cors import CORS  # Suporte ao CORS
from abc import ABC, abstractmethod
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)  # Ativar suporte ao CORS

# Simulação de banco de dados em memória
events = {
    1: {"id": 1, "title": "Reunião", "date": "2025-01-10"},
    2: {"id": 2, "title": "Consulta Médica", "date": "2025-01-12"},
    3: {"id": 3, "title": "Aniversário", "date": "2025-01-15"},
}

next_id = 4

# Implementor
class DisplayMode(ABC):
    @abstractmethod
    def display(self, events):
        pass

# ConcreteImplementor: Modo Diário
class DayMode(DisplayMode):
    def display(self, events):
        today = datetime.today().date()
        return [event for event in events if datetime.strptime(event["date"], "%Y-%m-%d").date() == today]

# ConcreteImplementor: Modo Semanal
class WeekMode(DisplayMode):
    def display(self, events):
        today = datetime.today().date()
        return [
            event for event in events
            if today <= datetime.strptime(event["date"], "%Y-%m-%d").date() <= today + timedelta(days=7)
        ]

# ConcreteImplementor: Modo Mensal
class MonthMode(DisplayMode):
    def display(self, events):
        today = datetime.today().date()
        return [
            event for event in events
            if datetime.strptime(event["date"], "%Y-%m-%d").date().month == today.month
        ]

# Abstraction
class ScheduleView(ABC):
    def __init__(self, mode: DisplayMode):
        self.mode = mode

    @abstractmethod
    def show(self, events):
        pass

# RefinedAbstraction
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

# Rota para obter compromissos
@app.route("/events", methods=["GET"])
def get_events():
    mode = request.args.get("view")  # Ex: `day`, `week`, `month`
    filter_criteria = request.args.get("filter")  # Filtro por título
    display_mode = None

    # Define o modo de exibição com base no parâmetro `view`
    if mode == "day":
        display_mode = DayMode()
    elif mode == "week":
        display_mode = WeekMode()
    elif mode == "month":
        display_mode = MonthMode()
    else:
        # Retorna todos os eventos se nenhum modo for especificado
        return jsonify({"events": list(events.values())})

    # Usa o Bridge para processar os eventos
    schedule_view = CustomScheduleView(display_mode, filter_criteria)
    filtered_events = schedule_view.show(list(events.values()))

    return jsonify({"events": filtered_events})

# Rota para criar um compromisso
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

# Rota para excluir um compromisso
@app.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    if event_id not in events:
        return jsonify({"error": "Compromisso não encontrado."}), 404

    del events[event_id]
    return jsonify({"message": "Compromisso excluído com sucesso!"})

if __name__ == "__main__":
    app.run(debug=True)
