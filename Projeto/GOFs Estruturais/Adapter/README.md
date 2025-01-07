
# Projeto de Login com Google - Java Spring Boot

Este é um projeto simples que permite o cadastro de usuários utilizando email e senha, além de implementar o login através de um email do domínio @gmail.com. O sistema realiza a validação das credenciais, garantindo que o email seja do domínio correto e esteja registrado no banco de dados para a autenticação bem-sucedida. 

## Tecnologias Utilizadas

- **Java** (versão 17 ou superior)
- **Spring Boot** (para criar o backend)
- **Maven** (para gerenciamento de dependências e build)

## Pré-Requisitos

Antes de rodar o projeto, você precisa ter as seguintes ferramentas instaladas:

- **Java JDK 11 ou superior**: [Instalar JDK 11](https://adoptopenjdk.net/)
- **Maven**: [Instalar Maven](https://maven.apache.org/install.html)
- **Spring Boot**: O Spring Boot pode ser configurado diretamente através do Maven.

## Como Rodar o Backend

### Passo 1: Clonar o Repositório

Clone o repositório para o seu ambiente local:

```bash
git clone https://github.com/UnBArqDsw2024-2/2024.2_G6_Agenda_Entega_03.git
```

### Passo 2: Navegar até a Pasta do Projeto

Entre na pasta do projeto:

```bash
cd Projeto/GOFs Estruturais/Adapter/back-end/Adapter
```

### Passo 3: Instalar as Dependências

O projeto usa o Maven para gerenciar as dependências. Para instalá-las, execute o comando:

```bash
mvn install
```

Isso irá baixar todas as dependências necessárias para o projeto.

### Passo 4: Rodar o Projeto

Para rodar o backend, utilize o comando:

```bash
mvn spring-boot:run
```

Isso vai iniciar o servidor Spring Boot na URL `http://localhost:8081`.

### Passo 5: Testar o Endpoint

Uma vez que o backend estiver rodando, você pode testar o endpoint de login com Google. O backend está esperando um POST no endpoint `cadastrar/` com o email do usuário.

Exemplo de payload para o login:

```json
{
  "email": "fulano@gmail.com"
}
```

Se o email for válido (terminando com `@gmail.com`), o backend responderá com uma mensagem de sucesso. Caso contrário, retornará um erro.

## Como Rodar o Frontend

Instruções para rodar o frontend podem ser adicionadas aqui, dependendo da implementação.

## Considerações Finais

- Certifique-se de que o servidor Spring Boot está rodando no `http://localhost:8081` para que o frontend possa se comunicar com ele.
- O backend valida se o email tem o domínio `@gmail.com` e responde com a mensagem de sucesso ou erro.
- Faz cadastro com email e senha, através do tipo EMAIL.
- Faz login com credenciais válidas.

## Licença

Este projeto está licenciado sob a MIT License - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

Se você tiver dúvidas ou problemas, sinta-se à vontade para abrir uma issue no GitHub.
