# Command

## Introdução

O **Command** é um padrão de design comportamental que encapsula uma solicitação como um objeto, permitindo parametrizar outros objetos com diferentes solicitações, enfileirar ou registrar solicitações e oferecer suporte à operação de desfazer. Esse padrão promove o desacoplamento entre os emissores e os receptores, delegando a execução da solicitação a objetos específicos chamados "Comandos".

Seu principal objetivo é tornar as solicitações de operações flexíveis, reutilizáveis e controláveis, promovendo uma maior organização e modularidade no sistema.

O padrão **Command** é amplamente utilizado para implementar sistemas de histórico, como "desfazer/refazer", além de facilitar a implementação de funcionalidades como filas de tarefas e processamento assíncrono.

---

## Elementos Principais do Command

O padrão **Command** é composto por cinco elementos principais, que trabalham juntos para garantir a execução eficiente e controlada das solicitações. A seguir, detalhamos como esses elementos se aplicam ao nosso projeto:

### **1. Command (Comando Abstrato)**

A interface ou classe abstrata que define o método que será executado pelos comandos concretos. Ela garante que todos os comandos compartilhem uma estrutura comum, permitindo que o cliente interaja com eles de forma uniforme.

No nosso projeto, o `Command` define os métodos **execute()** e **undo()**, que serão implementados pelas classes concretas.

### **2. ConcreteCommand (Comandos Concretos)**

As classes que implementam o comando abstrato. Elas encapsulam uma solicitação específica e delegam a execução para os objetos responsáveis (receptores).

Por exemplo, no sistema de personalização de configurações do usuário, o `PersonalizarConfiguracoesCommand` é um comando concreto que altera as configurações do usuário, como nome, email, senha e foto.

### **3. Receiver (Receptor)**

O objeto que realiza a ação associada ao comando. Ele contém a lógica específica necessária para executar a operação solicitada.

No projeto, o **Receptor** é representado pelo dicionário `perfil_usuario`, que contém as informações do perfil do usuário.

### **4. Invoker (Invocador)**

O **Invoker** é responsável por armazenar e executar os comandos. Ele não conhece os detalhes da solicitação, apenas invoca os métodos do comando para realizar a operação desejada.

No nosso sistema, o `Invoker` gerencia uma lista de comandos para suporte ao desfazer e executar.

### **5. Client (Cliente)**

O cliente é responsável por criar os comandos concretos e configurá-los com os objetos receptores necessários. Ele passa os comandos ao invocador para serem executados.

No projeto, o cliente é representado pelas rotas Flask que criam e executam os comandos concretos com base nos dados recebidos da requisição.

---

## Código

A implementação do padrão **Command** foi realizada no sistema de personalização de configurações de usuário.

### 1. **Interface Command**
```python
class Command:
    def execute(self):
        pass

    def undo(self):
        pass
```

### 2. **Comando Concreto**
```python
class PersonalizarConfiguracoesCommand(Command):
    def __init__(self, perfil, nome=None, email=None, senha=None, foto=None):
        self.perfil = perfil
        self.nome = nome
        self.email = email
        self.senha = senha
        self.foto = foto

        # Para undo
        self.prev_perfil = perfil.copy()

    def execute(self):
        if self.nome:
            self.perfil["nome"] = self.nome
        if self.email:
            self.perfil["email"] = self.email
        if self.senha:
            self.perfil["senha"] = self.senha
        if self.foto:
            self.perfil["foto"] = self.foto

    def undo(self):
        self.perfil.update(self.prev_perfil)
```

### 3. **Invoker**
```python
class ConfiguracaoInvoker:
    def __init__(self):
        self.history = []

    def execute_command(self, command):
        self.history.append(command)
        command.execute()

    def undo_command(self):
        if self.history:
            command = self.history.pop()
            command.undo()
```

### 4. **Rotas Flask**
```python
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

perfil_usuario = {
    "nome": "Usuário Exemplo",
    "email": "exemplo@dominio.com",
    "senha": "senha123",
    "foto": None
}

invoker = ConfiguracaoInvoker()

@app.route("/perfil", methods=["GET"])
def get_perfil():
    return jsonify(perfil_usuario)

@app.route("/perfil", methods=["POST"])
def update_perfil():
    data = request.form

    nome = data.get("nome")
    email = data.get("email")
    senha = data.get("senha")
    foto = request.files.get("foto")

    if foto:
        foto_path = f"uploads/{foto.filename}"
        foto.save(foto_path)
        foto = foto_path

    command = PersonalizarConfiguracoesCommand(
        perfil_usuario,
        nome=nome,
        email=email,
        senha=senha,
        foto=foto
    )
    invoker.execute_command(command)

    return jsonify({"message": "Perfil atualizado com sucesso!"})

@app.route("/perfil/undo", methods=["POST"])
def undo_perfil():
    invoker.undo_command()
    return jsonify({"message": "Alterações desfeitas!", "perfil": perfil_usuario})

if __name__ == "__main__":
    app.run(debug=True)
```

---

## Resultados

### 1. **Página de Edição de Perfil Preenchida**

A figura 1 mostra o formulário de edição de perfil preenchido no servidor local, pronto para salvar as alterações.

<p style="text-align: center"><b>Figura 1:</b> Tela de início</p>
<div align="center">
  <img src="./images/3.3.Comportamentais/Command/figura1.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/JoaoBarreto03">João Barreto</a> e <a href="https://github.com/JohnnyLopess">Johnny Lopes</a>,, 2025</p></font>

### 2. **Página de Confirmação**

Após salvar as alterações, a figura 2 exibe a página de confirmação, indicando que o perfil foi atualizado com sucesso.

<p style="text-align: center"><b>Figura 2:</b> Tela de confirmação</p>
<div align="center">
  <img src="./images/3.3.Comportamentais/Command/figura2.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/JoaoBarreto03">João Barreto</a> e <a href="https://github.com/JohnnyLopess">Johnny Lopes</a>,, 2025</p></font>


---

## Referências

1. Gamma, E., Helm, R., Johnson, R., & Vlissides, J. (1994). *Design Patterns: Elements of Reusable Object-Oriented Software*. Addison-Wesley.
2. Refactoring Guru. *Command Pattern*. Disponível em: [https://refactoring.guru/design-patterns/command](https://refactoring.guru/design-patterns/command).

## Histórico de Versões

| Versão | Data       | Descrição                       | Autor                  |
|--------|------------|---------------------------------|------------------------|
| 1.0    | 05/01/2025 | Início do artefato.   | [Johnny Lopes](https://github.com/JohnnyLopess) e [Jõao Barreto](https://github.com/JoaoBarreto03)          |

