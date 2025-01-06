# Guia para Rodar a Aplicação de Agendador de Eventos

Este projeto consiste em uma aplicação para criar e gerenciar eventos utilizando um backend em Flask e um frontend em HTML/JavaScript. A aplicação implementa o padrão de projeto Builder para a criação de eventos.

## Estrutura do Projeto

```
agendador_eventos/
├── frontend/
│   ├── index.html         # Página principal do frontend
│   ├── sucesso.html       # Página de sucesso ao criar um evento
│   ├── css/
│   │   └── style.css      # Estilos do frontend
│   └── js/
│       └── app.js         # Script principal para interações
├── main.py                # Backend Flask
└── requirements.txt       # Dependências Python
```

## Requisitos

- **Python 3.8 ou superior**
- **Pip** instalado para gerenciar pacotes Python

## O que é o Padrão de Projeto Builder?

O padrão de projeto Builder é um dos padrões criacionais definidos pela Gang of Four (GoF). Ele é usado para criar objetos complexos, separando o processo de construção em etapas bem definidas. Isso permite que o mesmo processo de construção seja reutilizado para criar diferentes representações do mesmo objeto.

No contexto deste projeto, o Builder é utilizado para criar objetos do tipo `Evento`. Cada `Evento` possui vários atributos, como título, data, local, descrição, lembrete e categoria. O Builder facilita a configuração desses atributos de maneira clara e flexível, sem precisar de múltiplos construtores (constructors) na classe `Evento`.

**Vantagens do uso do Builder neste projeto:**
- **Flexibilidade:** Permite criar eventos personalizados sem expor detalhes complexos de implementação.
- **Leitura mais clara:** A construção dos objetos é feita de forma sequencial e legível.
- **Reutilização:** O mesmo Builder pode ser usado para criar diferentes tipos de eventos.

### Exemplo de utilização no código:
```python
builder = EventoBuilder()
evento = (builder
          .set_titulo("Reunião de Planejamento")
          .set_data("2024-12-25 10:00:00")
          .set_local("Sala 5")
          .set_descricao("Discussão sobre metas para 2025")
          .set_lembrete(True)
          .set_categoria("Trabalho")
          .build())
```
Neste exemplo, o Builder é usado para configurar e criar um evento com todos os seus atributos definidos de forma encadeada.

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
   python main.py
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

### 4. Testar a Aplicação

1. Acesse o frontend no navegador através da porta `http://127.0.0.1:8000/index.html`.
2. Preencha os campos e clique em "Criar Evento".
3. Você será redirecionado para a página `sucesso.html`, onde verá os detalhes do evento criado.


## Histórico de Versão

| Versão | Data | Descrição | Autor(es) |
| :-: | :-: | :-: | :-: | :-: | :-: |
| `1.0` | 23/12/2024  | Versão inicial do projeto. | [João Barreto](https://github.com/JoaoBarreto03) e [Johnny da Ponte](https://github.com/JohnnyLopess) |