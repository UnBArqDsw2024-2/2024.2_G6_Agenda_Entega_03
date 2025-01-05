# Abstract Factory

## Introdução

O **Abstract Factory** é um padrão de design criacional que abstrai o processo de criação de famílias de objetos relacionados, permitindo que o código cliente permaneça desacoplado das implementações concretas dos objetos que utiliza. Seu principal objetivo é promover a flexibilidade e reduzir a dependência do código cliente em relação às classes específicas de implementação. Além disso, o padrão busca minimizar a sobrecarga do processamento da entidade cliente, centralizando a criação de objetos em fábricas especializadas.

Esse padrão é especialmente útil quando é necessário criar objetos de uma variedade de tipos ou famílias, onde as famílias de produtos têm diferentes implementações. Ele segue uma estrutura organizada que permite a criação de produtos de forma consistente e isolada. O padrão é composto pelos seguintes elementos principais:

## Elementos Principais do Abstract Factory

O padrão **Abstract Factory** é composto por várias entidades, que trabalham juntas para garantir uma criação de objetos flexível e desacoplada. A seguir, detalhamos como esses elementos se aplicam ao nosso projeto:

### **1. Client (Cliente)**

O **Cliente** é a classe que interage com as fábricas e produtos abstratos. Ela utiliza as fábricas para criar e manipular objetos relacionados, mas não precisa se preocupar com os detalhes da criação desses objetos. O cliente chama os métodos das fábricas, como **CadastroFactory** e **LoginFactory**, para realizar as operações desejadas, como cadastrar um usuário ou realizar o login, sem precisar conhecer as classes concretas que executam essas operações.

### **2. AbstractFactory (Fábrica Abstrata)**

A **AbstractFactory** é uma classe ou interface que define os métodos para criar produtos relacionados, como **Cadastro** e **Login**, mas sem especificar as classes concretas desses produtos. Ela atua como um ponto central para coordenar a criação dos objetos necessários, deixando que as fábricas concretas implementem a lógica específica de criação.

### **3. ConcreteFactory (Fábricas Concretas)**

As **Fábricas Concretas** implementam os métodos definidos pela **AbstractFactory** para criar produtos específicos. Cada fábrica é responsável por criar um tipo particular de produto, como a **CadastroFactory**, que cria objetos de cadastro, ou a **LoginFactory**, que cria objetos de login. As fábricas concretas encapsulam a lógica de criação dos produtos, permitindo que o cliente apenas interaja com a interface comum fornecida pela fábrica abstrata.

### **4. AbstractProduct (Produto Abstrato)**

O **Produto Abstrato** é uma interface ou classe que define os métodos comuns que os produtos concretos devem implementar. Esses produtos representam os diferentes serviços que o sistema oferece, como **Cadastro** e **Login**. O **Produto Abstrato** garante que todos os produtos relacionados compartilhem uma interface comum, permitindo que o cliente interaja com qualquer tipo de produto de forma uniforme.

### **5. ConcreteProduct (Produtos Concretos)**

Os **Produtos Concretos** implementam as interfaces ou classes definidas pelo **Produto Abstrato**. Eles representam as implementações específicas de serviços, como o serviço de **Cadastro por Email** ou o serviço de **Login via Google**. Cada produto concreto oferece a funcionalidade necessária para realizar uma operação específica dentro do sistema, como o cadastro de um usuário ou a autenticação com um provedor de login.


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
Para a criação da modelagem foi utilizado o **Java Design Pattern** e a ferramenta **Lucid** para o diagrama de classes, o que facilitou o processo de abstração e visualização do sistema. O diagrama de classes foi desenvolvido para garantir que as diferentes funcionalidades de login, como autenticação via e-mail ou Google, fossem implementadas de forma desacoplada, utilizando o padrão **Abstract Factory**.

   


<p style="text-align: center"><b>Figura 1:</b> Modelo de domínio utilizado no projeto.</p>
<div align="center">
<div style="width: 940px; height: 480px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://lucid.app/documents/embedded/4ccd5935-d4a1-4c06-9a1a-68f158d9aed4" id="IaWGJ19rVl4A"></iframe></div>
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>


## Código
A pasta de código fonte está localizada em `Projeto/GOFs Criacionais/AbstractFactory`.

### Back-end

#### 1. **Estrutura básica da Factory**
```java
package com.abstractfactory.AbstractFactory.factory;

import com.abstractfactory.AbstractFactory.service.ICadastro;
import com.abstractfactory.AbstractFactory.service.ILogin;

public abstract class AbstractFactory {
  public abstract ICadastro getCadastro(String tipo);
  public abstract ILogin getLogin(String tipo);
}
```
Esta é a classe abstrata `AbstractFactory` que define a estrutura para criar os produtos `Cadastro` e `Login`. Ela possui métodos abstratos para obter as implementações desses produtos baseados no tipo solicitado.

#### 2. **Fábrica de Cadastro**
```java
package com.abstractfactory.AbstractFactory.factory;

import com.abstractfactory.AbstractFactory.service.EmailCadastroService;
import com.abstractfactory.AbstractFactory.service.ICadastro;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class CadastroFactory extends AbstractFactory {

  @Autowired
  private EmailCadastroService emailCadastroService;

  @Override
  public ICadastro getCadastro(String tipo) {
    if ("EMAIL".equalsIgnoreCase(tipo)) {
      return emailCadastroService;
    }
    throw new IllegalArgumentException("Tipo de cadastro não suportado: " + tipo);
  }

  @Override
  public ILogin getLogin(String tipo) {
    return null;
  }
}
```
A classe `CadastroFactory` implementa a fábrica abstrata para criar um serviço de cadastro de acordo com o tipo (neste caso, o tipo `EMAIL` é suportado). Ela cria o objeto `EmailCadastroService` que realiza o cadastro do usuário por email.

#### 3. **Fábrica de Login**
```java
package com.abstractfactory.AbstractFactory.factory;

import com.abstractfactory.AbstractFactory.service.EmailLoginService;
import com.abstractfactory.AbstractFactory.service.GoogleLoginService;
import com.abstractfactory.AbstractFactory.service.ILogin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class LoginFactory extends AbstractFactory {

  @Autowired
  private EmailLoginService emailLoginService;

  @Autowired
  private GoogleLoginService googleLoginService;

  @Override
  public ICadastro getCadastro(String tipo) {
    return null;
  }

  @Override
  public ILogin getLogin(String tipo) {
    if ("EMAIL".equalsIgnoreCase(tipo)) {
      return emailLoginService;
    } else if ("GOOGLE".equalsIgnoreCase(tipo)) {
      return googleLoginService;
    }
    throw new IllegalArgumentException("Tipo de login não suportado: " + tipo);
  }
}
```
A classe `LoginFactory` implementa a fábrica abstrata para criar um serviço de login, onde pode ser especificado se o login é realizado por `EMAIL` ou por `GOOGLE`. Ela cria objetos `EmailLoginService` e `GoogleLoginService` de acordo com o tipo de login fornecido.

#### 4. **Serviço de Cadastro por Email**
```java
package com.abstractfactory.AbstractFactory.service;

import com.abstractfactory.AbstractFactory.model.Usuario;
import com.abstractfactory.AbstractFactory.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailCadastroService implements ICadastro {

  @Autowired
  private UsuarioRepository repository;

  @Override
  public void cadastrar(String nome, String email, String senha) {
    if (repository.findByEmail(email) != null) {
      throw new RuntimeException("Usuário já cadastrado");
    }
    Usuario usuario = new Usuario();
    usuario.setNome(nome);
    usuario.setEmail(email);
    usuario.setSenha(senha);
    usuario.setTipo("EMAIL");
    repository.save(usuario);
  }
}

```
O serviço `EmailCadastroService` implementa a interface `ICadastro` para realizar o cadastro de usuários utilizando email. Ele interage com o repositório de usuários para salvar as informações.

#### 5. **Serviço de Login por Email**
```java
package com.abstractfactory.AbstractFactory.service;

import com.abstractfactory.AbstractFactory.model.Usuario;
import com.abstractfactory.AbstractFactory.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmailLoginService implements ILogin {

  @Autowired
  private UsuarioRepository repository;

  @Override
  public boolean logar(String email, String senha) {
    Usuario usuario = repository.findByEmail(email);
    return usuario != null && usuario.getSenha().equals(senha);
  }

  @Override
  public boolean logarComGoogle(String email) {
    return false;
  }
}
```
O serviço `EmailLoginService` implementa a interface `ILogin` para autenticação de usuários por email e senha.

#### 6. **Serviço de Login por Google**
```java
package com.abstractfactory.AbstractFactory.service;

import com.abstractfactory.AbstractFactory.model.Usuario;
import com.abstractfactory.AbstractFactory.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GoogleLoginService implements ILogin {

  @Autowired
  private UsuarioRepository repository;

  @Override
  public boolean logar(String email, String senha) {
    return false;
  }

  @Override
  public boolean logarComGoogle(String email) {
    if (email != null && email.endsWith("@gmail.com")) {
      Usuario usuario = repository.findByEmail(email);

      if (usuario != null) {
        return true;
      } else {
        usuario = new Usuario();
        usuario.setEmail(email);
        usuario.setTipo("GOOGLE");
        repository.save(usuario);
        return true;
      }
    } else {
      return false;
    }
  }
}
```
O serviço `GoogleLoginService` implementa a interface `ILogin` para autenticar usuários usando contas do Google. Ele verifica se o email é válido e, se o usuário não existe, cria um novo usuário.

#### 7. **Controller para Cadastro e Login**
```java

package com.abstractfactory.AbstractFactory.controller;

import com.abstractfactory.AbstractFactory.factory.CadastroFactory;
import com.abstractfactory.AbstractFactory.factory.LoginFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {

  private final CadastroFactory cadastroFactory;
  private final LoginFactory loginFactory;

  @Autowired
  public UsuarioController(CadastroFactory cadastroFactory, LoginFactory loginFactory) {
    this.cadastroFactory = cadastroFactory;
    this.loginFactory = loginFactory;
  }

  @PostMapping("/cadastrar")
  public ResponseEntity<?> cadastrar(
      @RequestParam String nome,
      @RequestParam String email,
      @RequestParam String senha,
      @RequestParam String tipo) {
    try {
      cadastroFactory.getCadastro(tipo).cadastrar(nome, email, senha);
      return ResponseEntity.ok("Usuário cadastrado com sucesso!");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }

  @PostMapping("/login")
  public ResponseEntity<?> login(
      @RequestParam String email,
      @RequestParam(required = false) String senha,
      @RequestParam String tipo) {
    try {
      boolean resultado;

      if ("GOOGLE".equalsIgnoreCase(tipo)) {
        // Loga com Google
        resultado = loginFactory.getLogin(tipo).logarComGoogle(email);
      } else {
        // Loga com as credenciais tradicionais
        resultado = loginFactory.getLogin(tipo).logar(email, senha);
      }

      return resultado
          ? ResponseEntity.ok("Login realizado com sucesso!")
          : ResponseEntity.status(401).body("Credenciais inválidas.");
    } catch (Exception e) {
      return ResponseEntity.badRequest().body(e.getMessage());
    }
  }
}
```
O `UsuarioController` é responsável por gerenciar as operações de cadastro e login de usuários. Ele utiliza as fábricas `CadastroFactory` e `LoginFactory` para obter os serviços apropriados para o tipo de operação (email ou google).

---

Esses são os principais componentes do padrão Abstract Factory que foram implementados no código, com suas respectivas responsabilidades e relações. Não foi implementado a autenticação via Google, somente uma lógica para diferenciar o login via email e senha do via email da google.



### Imagens


<p style="text-align: center"><b>Figura 2:</b> Testando Via Postman - Cadastro com email e senha</p>
<div align="center">
  <img src="./images/3.1.Criacionais/image.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>


<p style="text-align: center"><b>Figura 3:</b> Testando Via Postman - Cadastro com email e senha já cadastrado</p>
<div align="center">
  <img src="./images/3.1.Criacionais/image2.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>


<p style="text-align: center"><b>Figura 4:</b> Testando Via Postman - Login com email e senha válidos</p>
<div align="center">
  <img src="./images/3.1.Criacionais/image3.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>


<p style="text-align: center"><b>Figura 5:</b> Testando Via Postman - Login com email e senha inválidos</p>
<div align="center">
  <img src="./images/3.1.Criacionais/image4.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 6:</b> Testando Via Postman - Login com Google com email inválido</p>
<div align="center">
  <img src="./images/3.1.Criacionais/image5.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 7:</b> Testando Via Postman - Login com Google com email válido</p>
<div align="center">
  <img src="./images/3.1.Criacionais/image6.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>


## Referências
> <a>1.<a/> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>2.<a/> FREEMAN, Eric; FREEMAN, Elisabeth Robson. Head First Design Patterns: A Brain-Friendly Guide. 2. ed. Sebastopol: O'Reilly Media, 2020. <br>
> <a>3.<a/> ROYTUTS. Abstract Design Factory Pattern in Java. Disponível em: [https://roytuts.com/abstract-design-factory-pattern-in-java/](https://roytuts.com/abstract-design-factory-pattern-in-java/). Acesso em: 05 jan. 2025.<br>
> <a>4.<a/> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. *Design Patterns: Elements of Reusable Object-Oriented Software* (Gang of Four). 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>5.<a/> Refactoring Guru. *Abstract Factory Pattern*. Disponível em: [https://refactoring.guru/design-patterns/abstract-factory](https://refactoring.guru/design-patterns/abstract-factory). Acesso em: 05 jan. 2025. <br>
> <a>6.<a/> Wikipedia. *Abstract Factory Pattern*. Disponível em: [https://en.wikipedia.org/wiki/Abstract_factory_pattern](https://en.wikipedia.org/wiki/Abstract_factory_pattern). Acesso em: 05 jan. 2025. <br>
> <a>7.<a/> SourceMaking. *Abstract Factory*. Disponível em: [https://sourcemaking.com/design_patterns/abstract_factory](https://sourcemaking.com/design_patterns/abstract_factory). Acesso em: 05 jan. 2025.

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 04/01/2025 | Estrutura do artefato | [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) | [Gabriel Souza](https://github.com/GabrielMS00) |
| `1.1`  | 05/01/2025 | Complementação da metodologia e ajuste das referências | [Gabriel Souza](https://github.com/GabrielMS00) | [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) | 
| `1.2`  | 05/01/2025 | Adição de código e modelagem do AbstractFactory |  [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) || 
