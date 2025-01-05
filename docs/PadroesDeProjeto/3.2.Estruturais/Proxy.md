# Proxy

## Introdução

O Proxy é um padrão de projeto estrutural que fornece um substituto ou placeholder para outro objeto. Um proxy controla o acesso ao objeto original, permitindo que você faça algo antes ou depois que a solicitação chega ao objeto original. É frequentemente usado para adicionar uma camada extra de controle sobre operações que podem ser custosas ou precisam de segurança adicional.

## Elementos Principais do Abstract Factory:

- **Interface (Subject)**: 
    - Define a interface comum entre o Proxy e o RealSubject.
    - Garante que o Proxy possa ser usado em qualquer lugar onde o objeto real é esperado.
  
- **RealSubject (EventManager)**: 
    - Classe que contém a lógica de negócio real.
    - Implementa as operações concretas.
    - É a classe que o Proxy representa e controla acesso.

- **Proxy (PermissionProxy)**
    - Mantém uma referência ao RealSubject.
    - Implementa a mesma interface do RealSubject.
    - Controla acesso e pode adicionar funcionalidades extras.

## Vantagens e Justificativas para o Uso do Proxy:

O uso do **Proxy** é vantajoso em cenários onde o acesso a um objeto precisa ser controlado ou otimizado. As principais vantagens incluem:

- **Segurança**: 
    - Adiciona uma camada de proteção ao objeto real.
    - Permite verificação de permissões antes do acesso.
    - Controla quais métodos podem ser acessados por quais usuários

- **Desempenho**: 
    - Pode implementar cache de resultados.
    - Evita operações repetidas ao banco de dados.
    - Permite lazy loading de recursos pesados.

- **Controle de Acesso**: 
    - Gerencia quem pode acessar determinados recursos.
    - Registra tentativas de acesso (logging).
    - Permite políticas de autorização granulares.

- **Extensibilidade**: 
    - Adiciona comportamentos sem modificar o código existente.
    - Permite incluir novas verificações ou regras.
    - Facilita a manutenção e evolução do sistema.

## Metodologia

### **Metodologia**

A implementação do padrão Proxy no sistema de Agenda foca exclusivamente na funcionalidade de compartilhamento de eventos. O objetivo principal é garantir que apenas usuários autorizados possam compartilhar eventos, adicionando uma camada de segurança e controle sobre essa operação.

A lógica do compartilhamento de eventos foi centralizada no PermissionProxy, que atua como intermediário entre o cliente e o objeto real, o EventManager.

Benefícios da Abordagem
Segurança: Somente proprietários de eventos podem compartilhar.
Modularidade: O uso do Proxy desacopla a lógica de autorização do restante do sistema.
 
Essa implementação promove um sistema seguro e eficiente, garantindo que o compartilhamento de eventos seja realizado de forma controlada e escalável.

## Modelagem

![Diagrama Proxy](https://github.com/UnBArqDsw2024-2/2024.2_G6_Agenda_Entega_03/blob/17e742de91f4549832cd660fb8fa6b65a2316ca4/docs/images/3.2.Estruturais/proxy.png)

<p style="text-align: center"><b>Figura 1:</b> Diagrama referente a implementação Proxy.</p>
<div align="center">

</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/JoaoBarreto03">João Barreto</a> e <a href="https://github.com/paulohborba">Paulo Borba</a>, 2025</p></font>

## Implementação

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

## Referências
> <a>1.</a> GOF Estrutural - Proxy. **Proxy Design Pattern**. Disponível em: [Proxy Design Pattern](https://sourcemaking.com/design_patterns/proxy)  Acesso em: 04/01/2025. <br>
> <a>2.</a> GOF Estrutural - Proxy. **Proxy Design Pattern in Python**. Disponível em: [Proxy Design Pattern in Python](https://sourcemaking.com/design_patterns/proxy/python/1)  Acesso em: 04/01/2025. <br>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 05/01/2025 | Criacão do artefato | [Paulo Borba](https://github.com/paulohborba) e [João Barreto](https://github.com/JoaoBarreto03) |  |
