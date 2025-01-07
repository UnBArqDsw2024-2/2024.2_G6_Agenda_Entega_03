
# **Adapter**

## Introdução

O **Adapter** é um padrão de design estrutural que permite a comunicação entre classes com interfaces incompatíveis. Ele atua como um "tradutor", permitindo que um sistema interaja com outro sem que ambos precisem ser modificados. Em outras palavras, o **Adapter** adapta a interface de um sistema para que ela seja compatível com a interface esperada por outro sistema ou componente.

Esse padrão é útil quando queremos integrar sistemas com interfaces diferentes, sem alterar o código original de nenhum dos dois. Ele cria uma camada intermediária entre as classes para garantir que a comunicação entre elas seja possível.

### **Elementos Principais do Adapter**

O padrão **Adapter** é composto por algumas classes e interfaces, que desempenham os seguintes papéis:
### **1. Client (Cliente)**

O **Cliente** é a classe que utiliza os objetos adaptados. Ele chama métodos da interface **Target** (Alvo) sem se preocupar com as diferenças entre as interfaces. O cliente interage com a interface adaptada sem a necessidade de entender sua implementação interna. No exemplo apresentado, a classe **AuthController** desempenha o papel de Cliente.

### **2. Target (Alvo)**

O **Target** é a interface que define os métodos esperados pelo cliente. Ela especifica a interface padrão com a qual o cliente pode interagir. No exemplo, essa interface é representada por **AuthService**, que declara os métodos `login` e `register`.

### **3. Adapter (Adaptador)**

O **Adapter** implementa a interface **Target** e traduz as chamadas feitas pelo cliente para o sistema original. Ele é responsável por adaptar a interface do sistema de origem para que seja compatível com a interface esperada pelo cliente. Exemplos de **Adapter** no código são as classes **EmailAuthAdapter** e **GoogleAuthAdapter**.

### **4. Adaptee (Adaptado)**

O **Adaptee** é o sistema ou classe que precisa ser adaptado. Ele contém a implementação original, mas sua interface não é compatível com a interface que o cliente espera. No exemplo, o **Adaptee** é representado pelo repositório **UsuarioRepository**, que fornece as operações específicas para gerenciamento de usuários.

### **5. ConcreteAdapter (Adaptador Concreto)**

No contexto apresentado, o papel de "Adaptador Concreto" é desempenhado diretamente pelas classes **EmailAuthAdapter** e **GoogleAuthAdapter**, que são implementações específicas do **Adapter**. Cada uma delas traduz as chamadas do cliente (via interface **Target**) para interagir corretamente com o **Adaptee**. Portanto, a noção de "ConcreteAdapter" não é uma entidade separada, mas corresponde às implementações concretas do adaptador.

---

## Vantagens e Justificativas para o Uso do Adapter

O uso do padrão **Adapter** oferece diversas vantagens, especialmente em cenários onde é necessário integrar sistemas legados ou de terceiros sem modificar o código original. As principais vantagens incluem:

1. **Desacoplamento entre sistemas**: O **Adapter** permite que o cliente interaja com a interface desejada, sem precisar conhecer os detalhes de implementação do sistema adaptado. Isso promove um maior desacoplamento entre o código cliente e o sistema adaptado.

2. **Integração com sistemas legados**: Ao usar o **Adapter**, é possível integrar sistemas mais antigos ou de terceiros sem a necessidade de alterar o código base, facilitando a migração ou a adição de novas funcionalidades.

3. **Flexibilidade e escalabilidade**: Como o **Adapter** age como uma camada intermediária, ele pode ser facilmente alterado ou estendido para adicionar novos comportamentos ou integrar novos sistemas, sem impactar o código cliente.

4. **Reutilização de código**: O padrão **Adapter** permite que o código original do sistema adaptado seja reutilizado, sem a necessidade de reescrever funcionalidades já existentes.

---

## Metodologia

No sistema de Agenda, de acordo com o [diagrama de classes](https://unbarqdsw2024-2.github.io/2024.2_G6_Agenda_Entrega_02/#/./foco1/d_classes), o cliente precisa interagir com um serviço de login que possui uma interface diferente da que o sistema espera. Para resolver essa incompatibilidade, foi adotado o padrão **Adapter**. Esse padrão permite que o sistema de login, que possui diferentes formas de autenticação, seja integrado sem alterar a arquitetura principal.

A escolha do padrão **Adapter** oferece os seguintes benefícios:

- **Desacoplamento de sistemas**: O cliente pode continuar utilizando a interface esperada sem se preocupar com as diferenças nas implementações dos diferentes tipos de login.
- **Facilidade de expansão**: O uso do **Adapter** facilita a adição de novos tipos de login, como autenticação via Facebook ou outros métodos, sem impactar o código principal.
- **Suporte a sistemas legados**: O padrão permite integrar facilmente sistemas de autenticação que possuam interfaces incompatíveis com o sistema atual.

---

## Modelagem

### **Implementação**

A implementação do **Adapter** foi realizada utilizando a arquitetura **Java** e o **Spring**. A adaptação permite que o sistema de login, que pode ter diferentes formas de autenticação (como email ou Google), seja tratado de forma uniforme.

### Diagrama 

O diagrama apresentado ilustra a aplicação do padrão de projeto Adapter para gerenciar diferentes estratégias de autenticação no sistema. A interface AuthService atua como um contrato comum, definindo os métodos essenciais para autenticação: login e register.

As classes EmailAuthAdapter e GoogleAuthAdapter implementam a interface, adaptando o comportamento para as necessidades específicas de cada tipo de autenticação:

O EmailAuthAdapter verifica credenciais com base em e-mail e senha, interagindo com a base de dados para validar e registrar usuários.
O GoogleAuthAdapter foca em autenticação via contas do Google, criando registros automaticamente se o e-mail ainda não estiver cadastrado.
A entidade Usuario representa os dados persistidos, como nome, e-mail, senha e tipo de autenticação. Os adaptadores utilizam essa classe para validação e armazenamento no repositório, unificando o gerenciamento de usuários.

Esse design promove flexibilidade e escalabilidade, permitindo que novos adaptadores de autenticação sejam adicionados com facilidade, mantendo a coerência e a reutilização de código por meio da interface comum.

<p style="text-align: center"><b>Figura 1:</b> Diagrama usando o Adapter</p>
<div align="center">
  <img src="./images/3.2.Estruturais/diagramaAdaptor.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

---

## Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
src/
├── main/
│   ├── java/
│   │   ├── com/
│   │   │   ├── adapter/
│   │   │   │   ├── adapter/
│   │   │   │   │   ├── EmailAuthAdapter.java
│   │   │   │   │   └── GoogleAuthAdapter.java
│   │   │   │   ├── controller/
│   │   │   │   │   └── AuthController.java
│   │   │   │   ├── model/
│   │   │   │   │   └── Usuario.java
│   │   │   │   ├── repository/
│   │   │   │   │   └── UsuarioRepository.java
│   │   │   │   ├── service/
│   │   │   │   │   └── AuthService.java
│   │   │   │   └── AdapterApplication.java

```

### **Código**

#### 1. **Estrutura Básica do Adapter**

```java
package com.adapter.Adapter.service;

import com.adapter.Adapter.model.Usuario;

public interface AuthService {
    boolean login(String email, String senha);
    boolean register(Usuario usuario);
}
```

Aqui, temos a interface `AuthService`, que define os métodos que o cliente espera para a autenticação.

#### 2. **Adaptee (Serviço Original)**

```java
package com.adapter.Adapter.adapter;

import com.adapter.Adapter.model.Usuario;
import com.adapter.Adapter.repository.UsuarioRepository;
import com.adapter.Adapter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class GoogleAuthAdapter implements AuthService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public GoogleAuthAdapter(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public boolean login(String email, String senha) {
        if (email != null && email.endsWith("@gmail.com")) {
            Usuario usuario = usuarioRepository.findByEmail(email);

            if (usuario != null) {
                return true;
            } else {
                usuario = new Usuario();
                usuario.setEmail(email);
                usuario.setTipo("GOOGLE");
                usuarioRepository.save(usuario);
                return true;
            }
        } else {
            return false;
        }
    }

    @Override
    public boolean register(Usuario usuario) {
        return false;
    }
}
```

A classe `GoogleAuthAdapter` é a classe original, com uma interface incompatível com a que o cliente espera.

#### 3. **Adapter (Adaptador)**

```java
package com.adapter.Adapter.adapter;

import com.adapter.Adapter.model.Usuario;
import com.adapter.Adapter.repository.UsuarioRepository;
import com.adapter.Adapter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class EmailAuthAdapter implements AuthService {

    private final UsuarioRepository usuarioRepository;

    @Autowired
    public EmailAuthAdapter(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

    @Override
    public boolean login(String email, String senha) {
        Usuario usuario = usuarioRepository.findByEmail(email);
        return usuario != null && senha.equals(usuario.getSenha());
    }

    @Override
    public boolean register(Usuario usuarioRequest) {
        if (usuarioRepository.findByEmail(usuarioRequest.getEmail()) != null) {
            return false;
        }
        Usuario usuario = new Usuario();
        usuario.setNome(usuarioRequest.getNome());
        usuario.setEmail(usuarioRequest.getEmail());
        usuario.setSenha(usuarioRequest.getSenha());
        usuario.setTipo("EMAIL");
        usuarioRepository.save(usuario);
        return true;
    }
}
```

O **Adapter** adapta a interface para que o cliente possa interagir com o sistema original sem problemas.

#### 4. **Cliente (Uso do Adapter)**

```java
package com.adapter.Adapter.controller;

import com.adapter.Adapter.adapter.EmailAuthAdapter;
import com.adapter.Adapter.adapter.GoogleAuthAdapter;
import com.adapter.Adapter.model.Usuario;
import com.adapter.Adapter.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final EmailAuthAdapter emailAuthAdapter;
    private final GoogleAuthAdapter googleAuthAdapter;

    @Autowired
    public AuthController(EmailAuthAdapter emailAuthAdapter, GoogleAuthAdapter googleAuthAdapter) {
        this.emailAuthAdapter = emailAuthAdapter;
        this.googleAuthAdapter = googleAuthAdapter;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestParam String nome, @RequestParam String email, @RequestParam String senha, @RequestParam String tipo) {
        Usuario usuario = new Usuario();
        usuario.setNome(nome);
        usuario.setEmail(email);
        usuario.setSenha(senha);
        usuario.setTipo(tipo);

        AuthService authService;
        if ("EMAIL".equals(tipo)) {
            authService = emailAuthAdapter;
        } else {
            return ResponseEntity.badRequest().body("Tipo de autenticação inválido.");
        }

        boolean

 registrado = authService.register(usuario);
        return ResponseEntity.ok(registrado);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestParam String email, @RequestParam String senha, @RequestParam String tipo) {
        AuthService authService;
        if ("EMAIL".equals(tipo)) {
            authService = emailAuthAdapter;
        } else if ("GOOGLE".equals(tipo)) {
            authService = googleAuthAdapter;
        } else {
            return ResponseEntity.badRequest().body("Tipo de autenticação inválido.");
        }

        boolean logado = authService.login(email, senha);
        return ResponseEntity.ok(logado);
    }
}
```

Neste exemplo, o cliente interage com a interface comum do `AuthService`, sem se preocupar com as diferenças entre os tipos de autenticação.

### Imagens

<p style="text-align: center"><b>Figura 1:</b> Testando Via Postman - Cadastro com email e senha</p>
<div align="center">
  <img src="./images/3.2.Estruturais/imageAdaptor.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 2:</b> Testando Via Postman - Cadastro com email e senha já cadastrado</p>
<div align="center">
  <img src="./images/3.2.Estruturais/imageAdaptor2.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 3:</b> Testando Via Postman - Cadastro com email e senha via Google</p>
<div align="center">
  <img src="./images/3.2.Estruturais/imageAdaptor3.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 4:</b> Testando Via Postman - Login com email e senha válidos</p>
<div align="center">
  <img src="./images/3.2.Estruturais/imageAdaptor4.png" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

--- 

## Referências
<a>1.</a> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
<a>2.</a> FREEMAN, Eric; FREEMAN, Elisabeth Robson. Head First Design Patterns: A Brain-Friendly Guide. 2. ed. Sebastopol: O'Reilly Media, 2020. <br>
<a>3.</a> Refactoring Guru. *Adapter Pattern*. Disponível em: [https://refactoring.guru/design-patterns/adapter](https://refactoring.guru/design-patterns/adapter). Acesso em: 05 jan. 2025. <br>
<a>4.</a> Wikipedia. *Adapter Pattern*. Disponível em: [https://en.wikipedia.org/wiki/Adapter_pattern](https://en.wikipedia.org/wiki/Adapter_pattern). Acesso em: 05 jan. 2025. <br>
<a>5.</a> SourceMaking. *Adapter*. Disponível em: [https://sourcemaking.com/design_patterns/adapter](https://sourcemaking.com/design_patterns/adapter). Acesso em: 05 jan. 2025. <br>
<a>6.</a> ROYTUTS. Adapter Design Pattern in Java. Disponível em: [https://roytuts.com/adapter-design-pattern-in-java/](https://roytuts.com/adapter-design-pattern-in-java/). Acesso em: 05 jan. 2025. <br

>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 05/01/2025 | Back-end e documentação do artefato | [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) |  |

