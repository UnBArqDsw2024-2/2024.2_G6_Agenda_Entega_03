from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Interface Observer
class Observer:
    def update(self, event, action):
        pass

# Gerenciador de Eventos (Subject)
class EventManager:
    def __init__(self):
        self.events = {}
        self.observers = []

    def attach(self, observer: Observer):
        self.observers.append(observer)

    def detach(self, observer: Observer):
        self.observers.remove(observer)

    def notify(self, event, action):
        for observer in self.observers:
            observer.update(event, action)

    def create_event(self, title, date, time):
        event_id = len(self.events) + 1
        event = {"id": event_id, "title": title, "date": date, "time": time}
        self.events[event_id] = event
        self.notify(event, "created")
        return event

    def edit_event(self, event_id, title, date, time):
        if event_id not in self.events:
            raise ValueError("Evento não encontrado.")
        event = self.events[event_id]
        event.update({"title": title, "date": date, "time": time})
        self.notify(event, "updated")
        return event

    def delete_event(self, event_id):
        if event_id not in self.events:
            raise ValueError("Evento não encontrado.")
        event = self.events.pop(event_id)
        self.notify(event, "deleted")
        return event


# Serviço de Notificação (Observer)
class NotificationService(Observer):
    def __init__(self):
        self.notifications = []

    def update(self, event, action):
        message = f"Evento '{event['title']}' foi {action}."
        self.notifications.append(message)
        print(f"Notificação: {message}")

    def get_notifications(self):
        return self.notifications

event_manager = EventManager()
notification_service = NotificationService()

# Registrando o observador
event_manager.attach(notification_service)


# Rotas da API
@app.route("/events", methods=["POST"])
def create_event():
    data = request.json
    try:
        event = event_manager.create_event(data["title"], data["date"], data["time"])
        return jsonify({"message": "Evento criado com sucesso!", "event": event}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400


@app.route("/events/<int:event_id>", methods=["PUT"])
def edit_event(event_id):
    data = request.json
    try:
        event = event_manager.edit_event(event_id, data["title"], data["date"], data["time"])
        return jsonify({"message": "Evento atualizado com sucesso!", "event": event})
    except Exception as e:
        return jsonify({"error": str(e)}), 404


@app.route("/events/<int:event_id>", methods=["DELETE"])
def delete_event(event_id):
    try:
        event_manager.delete_event(event_id)
        return jsonify({"message": "Evento excluído com sucesso!"})
    except Exception as e:
        return jsonify({"error": str(e)}), 404


@app.route("/events", methods=["GET"])
def list_events():
    return jsonify({"events": list(event_manager.events.values())})


@app.route("/notifications", methods=["GET"])
def list_notifications():
    notifications = notification_service.get_notifications()
    return jsonify({"notifications": notifications})

@app.route("/events/<int:event_id>", methods=["GET"])
def get_event(event_id):
    if event_id not in event_manager.events:
        return jsonify({"error": "Evento não encontrado"}), 404
    return jsonify({"event": event_manager.events[event_id]})


if __name__ == "__main__":
    app.run(debug=True)
