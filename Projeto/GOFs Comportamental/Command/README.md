# Guia para Rodar a Aplicação de Personalização de Configurações do Usuário

Este projeto implementa uma aplicação para personalizar configurações de usuário, como nome, email, senha e foto de perfil, utilizando um backend em Flask e o padrão de design **Command**.

## Estrutura do Projeto

```
Command/
├── backend/
│   ├── app.py                 # Backend Flask principal
│   ├── commands.py            # Implementação do padrão Command
│   └── requirements.txt       # Dependências Python
└── frontend/
    ├── index.html             # Página de edição de perfil
    ├── confirmacao.html       # Página de confirmação
    ├── css/
    │   └── style.css          # Estilos do frontend
    └── js/
        └── app.js             # Script principal para interações

```

## Requisitos

- **Python 3.8 ou superior**
- **Pip** instalado para gerenciar pacotes Python

## Passo a Passo para Rodar o Projeto

### 1. Clonar o Repositório

Faça o download do código fonte do projeto ou clone o repositório:
```bash
git clone <URL_DO_REPOSITORIO>
cd Command
```

### 2. Configurar o Backend

1. **Crie e ative um ambiente virtual** (opcional, mas recomendado):
   ```bash
   python -m venv venv
   source venv/bin/activate  # No Windows: venv\Scripts\activate
   ```

2. **Instale as dependências necessárias**:
   ```bash
   pip install -r backend/requirements.txt
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

### 4. Testar a Aplicação

1. Acesse o formulário de edição de perfil no navegador através da porta `http://127.0.0.1:8000/index.html`.
2. Preencha os campos e clique em "Salvar Alterações".
3. Verifique a página de confirmação `confirmacao.html`.

## Histórico de Versão

| Versão | Data | Descrição | Autor(es) |
| :-: | :-: | :-: | :-: | :-: | :-: |
| `1.0` | 06/01/2025 | Versão inicial do projeto. | [João Barreto](https://github.com/JoaoBarreto03) e [Johnny da Ponte](https://github.com/JohnnyLopess) |
