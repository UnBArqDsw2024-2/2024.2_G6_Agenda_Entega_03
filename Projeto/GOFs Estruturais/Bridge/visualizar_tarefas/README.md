
# Tutorial: Como Rodar a Aplicação de Visualizar Tarefas

## Passo a Passo

### 1. Configurar o Backend

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

### 2. Configurar o Frontend

1. Navegue até a pasta `frontend`:
   ```bash
   cd frontend
   ```

2. Inicie um servidor HTTP local:
   ```bash
   python -m http.server 8000
   ```

3. Acesse o frontend no navegador:
   ```bash
   http://127.0.0.1:8000/index.html
   ```

## Testar a Aplicação

1. Abra o navegador e acesse `http://127.0.0.1:8000/index.html`.
2. Use o formulário para criar compromissos com título e data.
3. Visualize compromissos nos modos diário, semanal ou mensal.
4. Filtre compromissos por título usando o campo de filtro.

## Histórico de Versão

| Versão | Data       | Descrição                    | Autor(es)                                                 | Data de revisão | Revisor(es) |
|--------|------------|------------------------------|-----------------------------------------------------------|-----------------|-------------|
| `1.0`  | 23/12/2024 | Versão inicial do projeto.   | [João Barreto](https://github.com/JoaoBarreto03) e [Johnny da Ponte](https://github.com/JohnnyLopess) | -               | -           |
