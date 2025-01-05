from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Simulando um banco de dados
USERS = {
    "user1": {"role": "admin"},
    "user2": {"role": "viewer"}
}

EVENTS = {
    1: {"title": "Reunião de Equipe", "owner": "user1", "shared_with": ["user2"]}
}

# Objeto Real
class EventManager:
    def get_event(self, event_id):
        event = EVENTS.get(event_id)
        if not event:
            return {"error": "Evento não encontrado"}, 404
        return {"event": event}

    def share_event(self, event_id, user):
        event = EVENTS.get(event_id)
        if not event:
            return {"error": "Evento não encontrado"}, 404
        event["shared_with"].append(user)
        return {"message": "Evento compartilhado com sucesso"}

# Proxy
class PermissionProxy:
    def __init__(self, user_id):
        self.user_id = user_id
        self.event_manager = EventManager()

    def has_permission(self, event_id, action):
        event = EVENTS.get(event_id)
        if not event:
            return False
        if action == "view":
            return self.user_id in event["shared_with"] or self.user_id == event["owner"]
        if action == "share":
            return self.user_id == event["owner"]
        return False

    def get_event(self, event_id):
        if not self.has_permission(event_id, "view"):
            return {"error": "Acesso negado"}, 403
        return self.event_manager.get_event(event_id)

    def share_event(self, event_id, user):
        if not self.has_permission(event_id, "share"):
            return {"error": "Permissão negada"}, 403
        return self.event_manager.share_event(event_id, user)

@app.route("/event/<int:event_id>", methods=["GET"])
def view_event(event_id):
    user_id = request.headers.get("User-ID")
    if not user_id:
        return jsonify({"error": "ID do usuário não fornecido"}), 400

    proxy = PermissionProxy(user_id)
    return jsonify(proxy.get_event(event_id))

@app.route("/event/<int:event_id>/share", methods=["POST"])
def share_event(event_id):
    user_id = request.headers.get("User-ID")
    if not user_id:
        return jsonify({"error": "ID do usuário não fornecido"}), 400

    data = request.json
    target_user = data.get("user")
    if not target_user:
        return jsonify({"error": "Usuário alvo não especificado"}), 400

    proxy = PermissionProxy(user_id)
    return jsonify(proxy.share_event(event_id, target_user))

if __name__ == "__main__":
    app.run(debug=True)
