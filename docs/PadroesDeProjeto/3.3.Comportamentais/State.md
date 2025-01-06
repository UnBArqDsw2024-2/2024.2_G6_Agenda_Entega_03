# **State**

## Introdução

O **State** é um padrão de design comportamental que permite que um objeto altere seu comportamento quando seu estado interno muda. O padrão permite que o objeto pareça alterar sua classe, proporcionando uma maneira de modificar seu comportamento sem modificar a própria estrutura do código. Ele é utilizado principalmente em situações onde o comportamento de um objeto depende de seu estado interno e onde esse estado pode mudar durante o ciclo de vida do objeto.

Esse padrão é útil quando temos um objeto que deve se comportar de maneira diferente dependendo do seu estado, como em máquinas de estados finitos ou fluxos de trabalho com etapas distintas e bem definidas.

### **Elementos Principais do State**

O padrão **State** é composto por várias classes que desempenham papéis específicos para gerenciar e definir os estados de um objeto.

### **1. Context (Contexto)**

O **Context** é a classe que contém uma referência ao estado atual e delega a responsabilidade de comportamentos específicos ao estado. Ele é responsável por manter a referência ao **State** atual e delegar a execução das operações para o estado correto.

### **2. State (Estado)**

O **State** define a interface que todos os estados concretos devem implementar. Essa interface declara os métodos que o **Context** pode chamar para alterar o comportamento do objeto conforme o estado.

### **3. ConcreteState (Estado Concreto)**

Os **ConcreteState** são as implementações específicas do **State**. Cada estado concreto implementa o comportamento particular para os métodos definidos pela interface **State**, alterando o comportamento do **Context** de acordo com o estado atual.

### **4. Client (Cliente)**

O **Cliente** é a classe que utiliza o **Context** e pode alterar o estado do objeto conforme necessário. O cliente interage com o contexto sem saber qual estado o objeto está, permitindo que o comportamento mude automaticamente conforme o estado.

---

## Vantagens e Justificativas para o Uso do State

O uso do padrão **State** oferece diversas vantagens, principalmente para sistemas que requerem mudanças de comportamento dinâmicas, dependendo de diferentes condições internas. As principais vantagens incluem:

1. **Desacoplamento de estados**: O padrão **State** permite que os estados de um objeto sejam tratados de forma independente. Isso evita que a lógica de mudança de estado fique espalhada por várias partes do código, tornando o código mais limpo e fácil de manter.

2. **Facilidade de extensão**: Novos estados podem ser adicionados facilmente ao sistema sem alterar a lógica existente, já que cada estado é uma classe separada. Isso facilita a manutenção e a introdução de novos comportamentos.

3. **Redução de complexidade condicional**: Ao invés de utilizar múltiplas instruções `if` ou `switch`, o padrão **State** delega as responsabilidades de cada estado a classes separadas, o que resulta em um código mais limpo e fácil de entender.

4. **Mudanças dinâmicas de comportamento**: O padrão permite que o comportamento de um objeto seja alterado dinamicamente com base no estado em que ele se encontra. Isso é útil em sistemas com comportamentos complexos baseados em estados, como jogos ou sistemas de fluxo de trabalho.

---

## Metodologia

No sistema de **Lembrete App**, a implementação do padrão **State** foi escolhida para gerenciar o ciclo de vida dos lembretes. Cada lembrete pode estar em diferentes estados, como **Ativo**, **Adiado**, **Expirado**, e a lógica de processamento e atualização do lembrete varia conforme o seu estado. O padrão **State** facilita a implementação de novos estados sem alterar a lógica central, garantindo que cada estado tenha seu próprio comportamento.

---

## Modelagem

### **Implementação**

A implementação do padrão **State** no sistema de lembretes envolve a criação de diferentes estados (como **Ativo**, **Adiado**, **Expirado**), onde cada estado possui um comportamento específico para as ações realizadas sobre o lembrete. O **Context** é responsável por gerenciar o estado atual e delegar o comportamento correto para cada ação, como modificar o lembrete ou alterar o seu status.

### Diagrama

O diagrama apresentado ilustra a aplicação do padrão de design **State** para gerenciar os estados de um lembrete. O **Context** é o objeto **Lembrete**, que possui um estado atual (como **Ativo** ou **Expirado**) e delega o comportamento para os **ConcreteState** correspondentes.

<p style="text-align: center"><b>Figura 1:</b> Diagrama usando o padrão de design State</p>
<div align="center">
  <img src="./images/state_diagram.png" width="1050px">
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href=""></a>, 2025</p></font>

---

## Estrutura do Projeto

A estrutura básica do projeto no back-end com a implementação do padrão **State** é a seguinte:

```
src/
 └── main/
     └── java/
         └── com/
             └── exemplo/
                 └── lembreteapp/
                     ├── controller/
                     │   └── LembreteController.java
                     ├── entity/
                     │   └── Lembrete.java
                     ├── model/
                     │   ├── AtivoState.java
                     │   ├── AdiadoState.java
                     │   ├── ExpiradoState.java
                     │   └── LembreteStateInterface.java
                     └── repository/
                         └── LembreteRepository.java
                     └── service/
                         └── LembreteService.java
                     └── LembreteAppApplication.java
```

### **Código**

### Back

#### 1. **Interface Estado**

```java
package com.state.State.state;

import com.state.State.entity.Lembrete;

public interface LembreteStateInterface {
    void executarAcoes(Lembrete lembrete);
}
```

A interface **Estado** define o comportamento básico que todos os estados devem implementar.

#### 2. **Estados Concretos**

```java
package com.state.State.state;

import com.state.State.entity.Lembrete;
import java.util.Date;

public class AtivoState implements LembreteStateInterface {

    @Override
    public void executarAcoes(Lembrete lembrete) {
        System.out.println("Lembrete Ativo: O lembrete está ativo e pode ser reprocessado ou adiado.");

        // Lógica para lembrete ativo
        if (new Date().after(lembrete.getDataHora())) {
            System.out.println("Hora do lembrete chegou! Lembrete pode ser expirado.");
            lembrete.setEstado(new ExpiradoState());
        }
    }
}
```

O **AtivoState** é um dos estados concretos, que implementa o comportamento específico para o estado "Ativo".

#### 3. **Contexto (Lembrete)**

```java
package com.state.State.state;

import com.state.State.entity.Lembrete;

public class ExpiradoState implements LembreteStateInterface {

    @Override
    public void executarAcoes(Lembrete lembrete) {
        System.out.println("Lembrete Expirado: O lembrete expirou e não pode ser mais alterado.");

        // Lógica para lembrete expirado
        System.out.println("O lembrete expirou na data " + lembrete.getDataHora());
    }
}
```

A classe **Lembrete** representa o **Contexto** e mantém uma referência ao **Estado** atual. Ela delega o processamento para o estado atual.

#### 4. **Cliente (Uso do State)**

```java
package com.state.State.controller;

import com.state.State.entity.Lembrete;
import com.state.State.state.LembreteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/lembrete")
public class LembreteController {

    @Autowired
    private LembreteService lembreteService;

    // Criar lembrete
    @PostMapping
    public ResponseEntity<String> criarLembrete(@RequestParam String mensagem, @RequestParam String dataHora) {
        try {
            Lembrete lembrete = lembreteService.criarLembrete(mensagem, dataHora);
            return new ResponseEntity<>("Lembrete criado com sucesso! Id do lembrete: " + lembrete.getId(), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao criar lembrete: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<String> obterLembrete(@PathVariable Long id) {
        try {
            Lembrete lembrete = lembreteService.obterLembrete(id);
            if (lembrete != null) {
                return new ResponseEntity<>("Lembrete encontrado: " + lembrete, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Lembrete com ID " + id + " não encontrado.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao obter lembrete: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> atualizarLembrete(@PathVariable Long id, @RequestParam String mensagem, @RequestParam String dataHora) {
        try {
            Lembrete lembrete = lembreteService.atualizarLembrete(id, mensagem, dataHora);
            if (lembrete != null) {
                return new ResponseEntity<>("Lembrete atualizado com sucesso: " + lembrete, HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Lembrete com ID " + id + " não encontrado.", HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>("Erro ao atualizar lembrete: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
```

---

Neste exemplo, o cliente utiliza o **Contexto** **Lembrete**, que delega o processamento do lembrete conforme o estado atual. O cliente pode alterar o estado do lembrete, e o comportamento muda dinamicamente.

---

### Imagens

<p style="text-align: center"><b>Figura 2:</b> Testando o processamento de lembretes com diferentes estados</p>
<div align="center">
  <img src="./images/state_example.png" width="1050px">
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

## Referências
<a>1.</a> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br> <a>2.</a> FREEMAN, Eric; FREEMAN, Elisabeth Robson. Head First Design Patterns: A Brain-Friendly Guide. 2. ed. Sebastopol: O'Reilly Media, 2020. <br> <a>3.</a> Refactoring Guru. State Pattern. Disponível em: https://refactoring.guru/design-patterns/state. Acesso em: 06 jan. 2025. <br> <a>4.</a> Wikipedia. State Pattern. Disponível em: https://en.wikipedia.org/wiki/State_pattern. Acesso em: 06 jan. 2025. <br> <a>5.</a> SourceMaking. State. Disponível em: https://sourcemaking.com/design_patterns/state. Acesso em: 06 jan. 2025. <br> <a>6.</a> ROYTUTS. State Design Pattern in Java. Disponível em: https://roytuts.com/state-design-pattern-in-java/. Acesso em: 06 jan. 2025. <br>



## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 05/01/2025 | Back-end e inicio da documentação do artefato | [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) |  |

