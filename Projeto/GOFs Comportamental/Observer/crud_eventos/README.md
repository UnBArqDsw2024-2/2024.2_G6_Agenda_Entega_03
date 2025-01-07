
# Tutorial: Como Rodar a Aplicação de Criação de Eventos

## Passo a Passo

### 1. Configurar o Ambiente Backend

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
   python app.py
   ```

   O backend estará disponível em: `http://127.0.0.1:5000`

---

## Testar a Aplicação

1. Use ferramentas como Postman ou cURL para enviar requisições à rota `/criar_evento` no servidor backend.
2. Exemplo de payload JSON para criar um evento:
   ```json
   {
       "titulo": "Reunião de Equipe",
       "data": "2025-01-15 10:30:00",
       "local": "Sala de Reuniões",
       "descricao": "Reunião para discutir metas do próximo trimestre.",
       "lembrete": true,
       "categoria": "Trabalho"
   }
   ```
3. Envie o payload como uma requisição POST para:
   ```
   http://127.0.0.1:5000/criar_evento
   ```

4. O servidor retornará uma resposta semelhante a esta:
   ```json
   {
       "titulo": "Reunião de Equipe",
       "data": "2025-01-15 10:30:00",
       "local": "Sala de Reuniões",
       "descricao": "Reunião para discutir metas do próximo trimestre.",
       "lembrete": true,
       "categoria": "Trabalho",
       "status": "Agendado",
       "dataCriacao": "2025-01-06 14:20:00"
   }
   ```

---

## Histórico de Versão

| Versão | Data       | Descrição                  | Autor(es)                     | Data de Revisão | Revisor(es) |
|--------|------------|----------------------------|--------------------------------|-----------------|-------------|
| `1.0`  | 06/01/2025 | Adicionando instruções para rodar o projeto | [João Barreto](https://github.com/JoaoBarreto03) | -               | -           |
