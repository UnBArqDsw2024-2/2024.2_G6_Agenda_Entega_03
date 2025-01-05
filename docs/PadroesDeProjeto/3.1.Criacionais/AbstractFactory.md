# Abstract Factory

## Introdução

O **Abstract Factory** é um padrão de design criacional que abstrai o processo de criação de famílias de objetos relacionados, permitindo que o código cliente permaneça desacoplado das implementações concretas dos objetos que utiliza. Seu principal objetivo é promover a flexibilidade e reduzir a dependência do código cliente em relação às classes específicas de implementação. Além disso, o padrão busca minimizar a sobrecarga do processamento da entidade cliente, centralizando a criação de objetos em fábricas especializadas.

Esse padrão é especialmente útil quando é necessário criar objetos de uma variedade de tipos ou famílias, onde as famílias de produtos têm diferentes implementações. Ele segue uma estrutura organizada que permite a criação de produtos de forma consistente e isolada. O padrão é composto pelos seguintes elementos principais:

## Elementos Principais do Abstract Factory:

- **Client (Cliente)**: O cliente interage com as interfaces fornecidas pelas fábricas e produtos abstratos, sem se preocupar com as classes concretas que implementam esses produtos.
  
- **AbstractProductA, AbstractProductB (Produto Abstrato)**: Define uma interface comum para cada tipo de produto a ser criado. Os produtos podem ser de diferentes tipos, mas todos seguem uma interface abstrata.

- **ProductA1, ProductA2, ProductB1, ProductB2 (Produtos Concretos)**: Implementa as interfaces definidas pelos produtos abstratos, proporcionando as implementações concretas de cada tipo de produto.

- **AbstractFactory (Fábrica Abstrata)**: Declara os métodos para criar cada tipo de produto abstrato. Essa fábrica serve como um ponto central que coordena a criação dos objetos.

- **ConcreteFactory1, ConcreteFactory2 (Fábricas Concretas)**: Implementa os métodos da fábrica abstrata, sendo responsáveis por instanciar os produtos concretos de acordo com a família de produtos específica.

## Vantagens e Justificativas para o Uso do Abstract Factory:

O uso do padrão **Abstract Factory** é altamente vantajoso, especialmente em cenários onde a entidade **Cliente** possui limitações de desempenho devido à sobrecarga de tarefas. Ao introduzir uma hierarquia de fábricas responsáveis pela criação dos objetos, a carga do cliente é aliviada, promovendo um desempenho melhor e maior modularidade no sistema. Além disso, o padrão oferece as seguintes vantagens:

1. **Isolamento de Classes Concretas**: O cliente interage com os objetos através de interfaces abstratas, sem precisar conhecer ou depender das classes concretas. Isso promove o desacoplamento entre o cliente e a implementação concreta dos objetos.

2. **Facilidade de Troca de Famílias de Produtos**: Alterar uma família de produtos é simples, pois envolve apenas a substituição da fábrica concreta usada no sistema. Não é necessário modificar o código do cliente ou dos produtos, garantindo maior flexibilidade na manutenção e evolução do sistema.

3. **Consistência entre Produtos**: Como as fábricas são responsáveis por criar objetos interdependentes dentro de uma família, elas garantem que os produtos sejam compatíveis entre si. Isso assegura que, por exemplo, componentes de uma interface gráfica ou módulos de um sistema trabalhem de maneira harmônica.

4. **Modularidade na Inclusão de Novas Famílias de Produtos**: Para adicionar uma nova família de produtos, é necessário apenas criar uma nova fábrica concreta e seus respectivos produtos. Isso mantém a flexibilidade e escalabilidade do sistema, pois a inclusão de novos produtos requer apenas pequenas modificações, principalmente na criação das fábricas.


## Metodologia

No sistema de Agenda, de acordo com o [diagrama de classes](https://unbarqdsw2024-2.github.io/2024.2_G6_Agenda_Entrega_02/#/./foco1/d_classes) existem duas maneiras distintas para um usuário realizar seu login: a primeira utiliza um e-mail e uma senha previamente cadastrados; a segunda, uma sincronização direta com uma conta do Google. Dado que o sistema foi projetado com foco em escalabilidade, especialmente no que diz respeito às funcionalidades de login, a adoção do padrão de design criacional <b>Abstract Factory</b> foi considerada viável para abstrair o processo de login. Essa abordagem permite que o código cliente permaneça desacoplado das implementações concretas do objeto Usuario.

A escolha do padrão Abstract Factory oferece os seguintes aspectos positivos para o desenvolvimento da aplicação:

- Facilidade de expansão: Com a possibilidade de implementar novos métodos de login, como autenticação por redes sociais (por exemplo, Facebook ou X), o uso do Abstract Factory oferece uma solução robusta. Ele permite que futuras extensões sejam realizadas de forma simples e organizada, sem impactar o código existente.
- Apoio ao desenvolvimento de testes: O Abstract Factory facilita a criação de objetos simulados (mocks) para testes automatizados. Dessa forma, fábricas específicas podem ser desenvolvidas para retornar implementações simuladas, contribuindo significativamente para a realização de testes abrangentes e eficazes na área de login.

Considerando os requisitos da página de login, concluímos de forma unânime, após uma reunião do grupo, que o padrão de design <b>Abstract Factory</b> atende às necessidades identificadas. Esse padrão oferece as vantagens necessárias para uma implementação eficiente dessa funcionalidade, facilitando o processo de desenvolvimento e contribuindo para a qualidade do produto.

## Modelagem


* Implementação:
   


<p style="text-align: center"><b>Figura 1:</b> Modelo de domínio utilizado no projeto.</p>
<div align="center">

</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>


## Código

```python
from abc import ABC, abstractmethod

# ===================== Abstract Products =====================
class Usuario(ABC):
    """
    Define a interface para objetos Usuario.
    """
    @abstractmethod
    def autenticar(self) -> bool:
        """
        Método para autenticar o usuário.
        """
        pass

    @abstractmethod
    def get_info(self) -> dict:
        """
        Método para obter informações do usuário.
        """
        pass

class Credenciais(ABC):
    """
    Define a interface para objetos Credenciais.
    """
    @abstractmethod
    def get_credenciais(self) -> dict:
      """
        Método para obter as credenciais de autenticação.
      """
      pass

# ===================== Concrete Products =====================
class UsuarioEmailSenha(Usuario):
    """
    Implementação concreta de Usuario para autenticação com e-mail e senha.
    """
    def __init__(self, credenciais):
        self.credenciais = credenciais

    def autenticar(self) -> bool:
        #Simulando autenticação por email e senha.
        email = self.credenciais.get_credenciais().get("email")
        senha = self.credenciais.get_credenciais().get("senha")
        if email == "teste@email.com" and senha == "senha123":
          return True
        return False

    def get_info(self) -> dict:
        return {"tipo": "email_senha", "email": self.credenciais.get_credenciais().get("email")}

class UsuarioGoogle(Usuario):
    """
    Implementação concreta de Usuario para autenticação com Google.
    """
    def __init__(self, credenciais):
      self.credenciais = credenciais

    def autenticar(self) -> bool:
        #Simulando autenticação com Google.
       token = self.credenciais.get_credenciais().get("token")
       if token == "token123":
         return True
       return False

    def get_info(self) -> dict:
        return {"tipo": "google", "email": self.credenciais.get_credenciais().get("email")}

class CredenciaisEmailSenha(Credenciais):
  """
  Implementação concreta de Credenciais para autenticação com email e senha.
  """
  def __init__(self, email, senha):
    self._email = email
    self._senha = senha
  
  def get_credenciais(self) -> dict:
    return {"email": self._email, "senha": self._senha}

class CredenciaisGoogle(Credenciais):
  """
  Implementação concreta de Credenciais para autenticação com Google.
  """
  def __init__(self, token, email):
    self._token = token
    self._email = email
  
  def get_credenciais(self) -> dict:
     return {"token": self._token, "email": self._email}

# ===================== Abstract Factory =====================
class AutenticacaoFactory(ABC):
    """
    Define a interface para as fábricas de autenticação.
    """
    @abstractmethod
    def criar_usuario(self, credenciais: Credenciais) -> Usuario:
        """
        Método abstrato para criar um objeto Usuario.
        """
        pass

    @abstractmethod
    def criar_credenciais(self, credenciais_data:dict) -> Credenciais:
        """
        Método abstrato para criar um objeto Credenciais.
        """
        pass


# ===================== Concrete Factories =====================
class AutenticacaoEmailSenhaFactory(AutenticacaoFactory):
    """
    Fábrica concreta para autenticação com e-mail e senha.
    """
    def criar_usuario(self, credenciais: Credenciais) -> Usuario:
      """
      Cria um objeto UsuarioEmailSenha
      """
      return UsuarioEmailSenha(credenciais)

    def criar_credenciais(self, credenciais_data: dict) -> Credenciais:
        """
        Cria um objeto CredenciaisEmailSenha.
        """
        return CredenciaisEmailSenha(credenciais_data.get("email"),credenciais_data.get("senha"))

class AutenticacaoGoogleFactory(AutenticacaoFactory):
    """
    Fábrica concreta para autenticação com Google.
    """
    def criar_usuario(self, credenciais: Credenciais) -> Usuario:
        """
        Cria um objeto UsuarioGoogle.
        """
        return UsuarioGoogle(credenciais)

    def criar_credenciais(self, credenciais_data: dict) -> Credenciais:
      """
      Cria um objeto CredenciaisGoogle.
      """
      return CredenciaisGoogle(credenciais_data.get("token"), credenciais_data.get("email"))

# ===================== Client Code (Exemplo) =====================
def autenticar_usuario(factory: AutenticacaoFactory, credenciais_data: dict) -> dict:
    """
    Função de exemplo que utiliza as fábricas para autenticar um usuário.
    """
    credenciais = factory.criar_credenciais(credenciais_data)
    usuario = factory.criar_usuario(credenciais)
    if usuario.autenticar():
      return {"autenticado": True, "info": usuario.get_info()}
    else:
        return {"autenticado": False, "info": {}}


# ===================== Flask Application (Exemplo) =====================
from flask import Flask, request, jsonify
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route("/autenticar", methods=["POST"])
def autenticar():
    """
    Rota que autentica o usuário com base no método de autenticação.
    """
    data = request.json
    tipo_autenticacao = data.get("tipo")
    credenciais = data.get("credenciais")
    if tipo_autenticacao == "email_senha":
      factory = AutenticacaoEmailSenhaFactory()
      resultado = autenticar_usuario(factory, credenciais)
      return jsonify(resultado), 200
    elif tipo_autenticacao == "google":
      factory = AutenticacaoGoogleFactory()
      resultado = autenticar_usuario(factory, credenciais)
      return jsonify(resultado), 200
    else:
      return jsonify({"erro": "Tipo de autenticação inválida"}), 400
```

## Referências
> <a>1.<a/> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>2.<a/> FREEMAN, Eric; FREEMAN, Elisabeth Robson. Head First Design Patterns: A Brain-Friendly Guide. 2. ed. Sebastopol: O'Reilly Media, 2020. <br>
> 

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  |04/01/2025| Estrutura do artefato | [Julia Vitória](https://github.com/Juhvitoria4) | |
| `1.1`  |05/01/2025| Código | [Gabriel Moura](https://github.com/thegm445) | |