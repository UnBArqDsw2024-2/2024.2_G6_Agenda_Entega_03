# Observer

## Introdução

O padrão Observer é um dos padrões comportamentais do catálogo GoF. Ele define uma relação de dependência um-para-muitos entre objetos, de modo que quando um objeto muda de estado, todos os seus dependentes são notificados automaticamente. Esse padrão é especialmente útil em sistemas onde há necessidade de atualização contínua entre componentes, promovendo um alto grau de desacoplamento.

## Elementos Principais do Observer:

- **Subject (Evento)**: 
    - É o objeto observado. Contém o estado principal que interessa a outros objetos.
    - Mantém uma lista de observadores e provê métodos para adicioná-los, removê-los e notificá-los.
  
- **Observer (Usuário ou Sistema de Notificação)**: 
    - Define uma interface para ser notificado sobre mudanças no estado do Subject.

- **ConcreteSubject**
    - Implementa os métodos do Subject e armazena o estado relevante para os observadores.
    - Notifica os observadores sempre que ocorre uma alteração em seu estado.

- **ConcreteObserver**
    - Implementa a interface do Observer e atualiza seu estado para se manter consistente com o Subject.

## Vantagens e Justificativas para o Uso do Proxy:

O uso do padrão Observer é vantajoso em cenários onde múltiplos objetos precisam reagir dinamicamente às mudanças de estado de outro objeto. As principais vantagens incluem:

- **Desacoplamento**: 
    - Os Observadores e o Subject estão fracamente acoplados. O Subject não precisa saber os detalhes dos Observadores.

- **Flexibilidade**: 
    - Novos observadores podem ser adicionados em tempo de execução sem alterar o código do Subject.

- **Atualizações automáticas**: 
    - Todas as mudanças no estado do Subject são automaticamente propagadas para os Observadores.

## Metodologia

A implementação do padrão Observer no sistema de Agenda foi direcionada à funcionalidade de CRUD de eventos, permitindo que alterações nos eventos (como criação, atualização e exclusão) sejam automaticamente propagadas para usuários ou sistemas que tenham interesse nessas mudanças. Essa abordagem melhora a experiência do usuário e a comunicação interna entre os componentes do sistema, além de garantir flexibilidade para futuras expansões.

Essa metodologia, ao combinar o padrão Observer com um CRUD de eventos, permite que o sistema seja responsivo, escalável e desacoplado. O backend gerencia a lógica central de notificações, enquanto o frontend garante que os usuários recebam informações atualizadas sem esforço adicional. Essa separação de responsabilidades facilita a manutenção e futuras melhorias no sistema

## Modelagem

![Diagrama Observer](https://github.com/UnBArqDsw2024-2/2024.2_G6_Agenda_Entega_03/blob/528378b2ced4579f90c408a871dcd6aa44e8d440/docs/PadroesDeProjeto/images/observer.png)

<p style="text-align: center"><b>Figura 1:</b> Diagrama referente a implementação Observer.</p>
<div align="center">

</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/JoaoBarreto03">João Barreto</a> e <a href="https://github.com/paulohborba">Paulo Borba</a>, 2025</p></font>

## Implementação

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


## Referências
> <a>1.</a> GOF Comportamental - Observer. **Observer Design Pattern**. Disponível em: [Observer Design Pattern](https://sourcemaking.com/design_patterns/observer)  Acesso em: 04/01/2025. <br>
> <a>2.</a> GOF Comportamental - Observer em Python. **Observer in Python**. Disponível em: [Observer in Python](https://sourcemaking.com/design_patterns/proxy/python/1)  Acesso em: 04/01/2025. <br>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 05/01/2025 | Criacão do artefato | [Paulo Borba](https://github.com/paulohborba) e [João Barreto](https://github.com/JoaoBarreto03) |  |
