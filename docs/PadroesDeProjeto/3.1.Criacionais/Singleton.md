# Singleton

## Introdução

O padrão de projeto **Singleton** é um padrão criacional que garante a existência de uma única instância de uma classe, fornecendo um ponto global de acesso a essa instância. Ele é amplamente utilizado em sistemas que precisam de controle centralizado, como gerenciadores de configuração, logs, ou, neste caso, o gerenciamento de uma agenda de eventos.

### Contexto

Na configuração da agenda de eventos, o Singleton é aplicado para garantir que a agenda seja gerenciada de forma centralizada, evitando inconsistências e redundâncias. A agenda precisa ser acessada por diferentes partes do sistema, mas deve haver apenas uma instância para evitar conflitos.

## Elementos Principais do Singleton

1. **Classe Singleton**:
   - Possui um construtor privado para evitar a criação direta de novas instâncias.
   - Fornece um método estático para retornar a instância única da classe.

2. **Cliente**:
   - Código que utiliza a instância do Singleton para configurar e acessar a agenda.

## Metodologia

A implementação do Singleton na configuração da agenda seguiu os seguintes passos:

1. **Identificação do Problema**:
   - Foi identificado que múltiplas instâncias da agenda poderiam levar a inconsistências no gerenciamento de eventos.

2. **Definição da Classe Singleton**:
   - Criamos uma classe chamada `AgendaSingleton` para centralizar o gerenciamento da agenda.

3. **Implementação do Método de Instância Única**:
   - Implementamos um método estático `get_instance` que garante que apenas uma instância da classe seja criada.

4. **Teste e Validação**:
   - Testamos a solução verificando que todas as partes do sistema acessavam e manipulavam a mesma instância da agenda.

## Modelagem

### Diagrama de Classes

```plaintext
+--------------------+
|  AgendaSingleton   |
+--------------------+
| - instancia:       |
|   AgendaSingleton   |
| - eventos: list    |
+--------------------+
| + get_instance()   |
| + adicionar_evento()|
| + listar_eventos() |
+--------------------+
```

## Código

Arquivo main.py:
```python
# EXPLICAÇÃO DO SINGLETON
# A classe Configuracoes usa o método __new__ para garantir que apenas uma instância será criada durante a execução da aplicação.
# Todas as alterações feitas às configurações são refletidas globalmente, mantendo a consistência no uso da agenda.

from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


class Configuracoes:
    _instancia = None

    def __new__(cls, *args, **kwargs):
        if not cls._instancia:
            cls._instancia = super().__new__(cls)
            # Configurações padrão
            cls._instancia.fuso_horario = "UTC"
            cls._instancia.idioma = "pt-BR"
            cls._instancia.tema = "claro"
        return cls._instancia

    def atualizar_configuracoes(self, fuso_horario=None, idioma=None, tema=None):
        if fuso_horario:
            self.fuso_horario = fuso_horario
        if idioma:
            self.idioma = idioma
        if tema:
            self.tema = tema

    def to_dict(self):
        return {
            "fuso_horario": self.fuso_horario,
            "idioma": self.idioma,
            "tema": self.tema,
        }


@app.route("/configuracoes", methods=["GET", "POST"])
def gerenciar_configuracoes():
    configuracoes = Configuracoes()

    if request.method == "POST":
        data = request.json
        configuracoes.atualizar_configuracoes(
            fuso_horario=data.get("fuso_horario"),
            idioma=data.get("idioma"),
            tema=data.get("tema"),
        )
        return jsonify({"mensagem": "Configurações atualizadas com sucesso!"}), 200

    return jsonify(configuracoes.to_dict()), 200


if __name__ == "__main__":
    app.run(debug=True)
```

## Como Rodar

Tenha o [pyhton 3](https://www.python.org/downloads/) e o gerenciador de pacote pip instalado em sua máquina.

Abra o local do arquivo:
```bash
 cd '.\Projeto\GOFs Criacionais\Singleton\'
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

## Histórico de Versão

| Versão | Data       | Descrição                  | Autor(es)                     | Data de Revisão | Revisor(es) |
|--------|------------|----------------------------|--------------------------------|-----------------|-------------|
| `1.0`  | 06/01/2025 | Versão inicial do projeto. | [Yago](https://github.com/yagompassos) |         |      |