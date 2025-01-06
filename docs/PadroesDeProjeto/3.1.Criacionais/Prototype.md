# Prototype

## Introdução

O **Prototype** é um padrão de projeto criacional que permite criar cópias exatas de objetos existentes, sem depender diretamente de suas classes. Ele utiliza um método de clonagem definido na interface do protótipo, permitindo copiar até mesmo campos privados, já que a clonagem é feita dentro do próprio objeto. Esse padrão é útil para evitar dependências de classes concretas, reduzir o custo de criação de objetos complexos e oferecer flexibilidade na configuração de objetos pré-construídos, servindo como uma alternativa às subclasses.

## Elementos Principais do Prototype e como implemntar

### Elementos Principais

1. Interface do Protótipo:  
   Define um método `clone()` para ser implementado por todas as classes que suportam clonagem.

2. Classe Protótipo Concreta:  
   Implementa a interface do protótipo e fornece a lógica para clonar seus próprios objetos.  
   Inclui:
   - Um construtor alternativo para criar uma cópia de outro objeto da mesma classe.
   - Implementação do método `clone()`.

3. Cliente (Client):  
   O código que solicita a clonagem dos protótipos sem saber a classe concreta dos objetos.

4. Registro de Protótipos (opcional):  
   Um catálogo centralizado para armazenar protótipos pré-construídos que podem ser clonados conforme necessário.  

### Como Implementar

1. Criar a Interface do Protótipo
Declare o método `clone()` na interface ou adicione-o diretamente às classes existentes.  

```
java
public interface Prototype {
    Prototype clone();
}
```

## Vantagens e Desvantagens 

## Prós (Vantagens)

- Desacoplamento de Classes Concretas:  
  Permite criar cópias de objetos sem depender de suas classes concretas, garantindo maior flexibilidade e menor dependência.

- Redução de Código Repetitivo:  
  Substitui código de inicialização redundante por clones de protótipos já configurados, otimizando a criação de objetos.

- Facilidade na Criação de Objetos Complexos:  
  Facilita a criação de objetos com muitos atributos ou configurações, sem necessidade de instanciar e configurar manualmente.

- Alternativa à Herança:  
  Oferece uma solução mais enxuta e flexível para criar variações de objetos complexos sem hierarquias extensas de subclasses.

- Reutilização de Protótipos Pré-construídos:  
  Objetos pré-configurados podem ser clonados rapidamente, economizando tempo e recursos.

## Contras (Desvantagens)

- Complexidade na Clonagem de Objetos Complexos:  
  Clonar objetos com referências circulares ou dependências complexas pode ser desafiador e exigir lógica adicional.

- Dependência de Implementação Correta:  
  A eficácia do padrão depende de uma implementação adequada do método `clone()`. Erros podem gerar cópias inconsistentes.

- Manutenção Difícil em Estruturas Complexas:  
  Garantir que todas as dependências e referências sejam clonadas corretamente em sistemas complexos pode aumentar a dificuldade de manutenção.

- Risco de Sobrecarga com Clonagem Profunda:  
  A clonagem profunda (deep copy), necessária em alguns casos, pode ser lenta e consumir mais memória.

O **Prototype** é útil em cenários onde é necessário criar objetos complexos de forma eficiente, mas deve ser usado com cautela em sistemas com alta complexidade e dependências.


## Metodologia

No sistema de Agenda, de acordo com o RE-004: Agendamento de eventos recorrentes, como reuniões semanais, sem a necessidade de recriá-los manualmente.

Sendo assim existe a necessidade do agendamento de eventos recorrentes envolve a criação de múltiplos eventos similares (mesmo título, participantes, descrição), mas com diferenças sutis, como datas e horários. O padrão Prototype permite criar um protótipo de um evento e, em seguida, clonar esse protótipo para gerar rapidamente os eventos recorrentes, com a flexibilidade de modificar apenas os atributos necessários (como a data).

## Modelagem

### Implementação:

Para a criação da modelagem foi utilizado a ferramenta **Lucid** para o diagrama de classes, o que facilitou o processo de abstração e visualização do sistema. 

<p style="text-align: center"><b>Figura 1:</b> Modelo de domínio utilizado no projeto.</p>
<div align="center">
<div style="width: 940px; height: 480px; margin: 10px; position: relative;"><iframe allowfullscreen frameborder="0" style="width:640px; height:480px" src="https://lucid.app/documents/embedded/4ccd5935-d4a1-4c06-9a1a-68f158d9aed4" id="IaWGJ19rVl4A"></iframe></div>
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>

## Código

A pasta de código fonte está localizada em `Projeto/GOFs Criacionais/Prototype`.

### Back-end

### Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
backend/
├── controller/
│   └── TaskController.js
├── models/
│   └── Task.js
├── routes/
│    └── TaskRoute.js
└── index.js

```
### Como rodar

```
  npm install
  npm start

```
---

#### 1. **Estrutura para a classe Protótipo**
```javascript
class Task {
  constructor({ id, title, description, startTime }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.startTime = startTime;
  }

  clone(id) {
    return new Task({
      id: id,
      title: this.title,
      description: this.description,
      startTime: this.startTime,
    });
  }
}

export default Task;

```

Esta é a classe que tem o método clone para criar as multiplas tarefas.

#### 2. **Controller para tarefas**

```javascript

import { v4 } from 'uuid';
import Task from '../models/Task.js';

const tasks = [];

export const createTask = (req, res) => {
  const { title, startTime, recurrenceRule } = req.body;

  const newTask = new Task({
    id: v4(),
    title,
    startTime: new Date(startTime),
  });

  tasks.push(newTask);
  let clonedTasks = [];
  clonedTasks.push(newTask);

  let occurrencesNumber = Number(recurrenceRule?.occurrences);
  console.log(occurrencesNumber);

  if (occurrencesNumber > 0) {
    for (let i = 1; i < occurrencesNumber; i++) {
      let clonedTask = newTask.clone(v4());

      clonedTask.startTime = new Date(clonedTask.startTime);

      //new Date(clonedTask.startTime)
      //if (recurrenceRule.frequency !== 'none') {

      if (recurrenceRule.frequency === 'daily') {
        clonedTask.startTime.setDate(clonedTask.startTime.getDate() + i);
      } else if (recurrenceRule.frequency === 'weekly') {
        clonedTask.startTime.setDate(clonedTask.startTime.getDate() + i * 7);
      } else if (recurrenceRule.frequency === 'monthly') {
        clonedTask.startTime.setMonth(clonedTask.startTime.getMonth() + i);
      } else if (recurrenceRule.frequency === 'yearly') {
        clonedTask.startTime.setFullYear(
          clonedTask.startTime.getFullYear() + i
        );
      }

      //}

      tasks.push(clonedTask);
      clonedTasks.push(clonedTask);
    }
  }

  console.log(tasks);

  res.status(200).json(clonedTasks);
};

```

A `createTask` é responsável por gerenciar as operações da criação das multiplas tarefas.

### Front-end

### Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
src/
├── components/              # Componentes React
│   ├── EventForm.jsx        # Componente para formulário de eventos
│   └── EventList.jsx        # Componente para listar eventos
├── services/                # Serviços e utilitários
│   └── api.js               # Arquivo para chamadas à API
├── App.jsx                  # Componente raiz do React
├── index.css                # Estilos globais do projeto
└── main.jsx                 # Ponto de entrada principal do React

```
### Como rodar

```
  npm install
  npm run dev

```

Esses são os principais componentes do padrão Prototype que foram implementados no código, com suas respectivas responsabilidades e relações. 

### Imagens

<p style="text-align: center"><b>Figura 2:</b> Testando Via Postman - Cadastro com email e senha</p>
<div align="center">
  <img src="./images/3.1.Criacionais/image.png" width="1050px" >
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
| `1.0`  | 05/01/2025 | Estrutura do artefato | [Carlos Alves](https://github.com/CADU110), [Vitor Feijó](https://github.com/vitorfleonardo) e  [Hugo Queiroz](https://github.com/melohugo) |  |

