# Iterador

## Introdução

O padrão de projeto **Iterator** é usado para percorrer os elementos de uma coleção sem expor sua estrutura interna. Ele separa a lógica de iteração da própria coleção, permitindo que diferentes algoritmos de travessia sejam implementados de forma independente. Assim, o cliente pode acessar os elementos de forma uniforme, seja em listas, árvores ou grafos, sem se preocupar com a complexidade de cada estrutura, garantindo flexibilidade e desacoplamento entre o código cliente e as coleções.

# Vantagens e Desvantagens do Padrão Iterator

## Vantagens

1. Desacoplamento da Estrutura da Coleção:
   - O padrão permite que o cliente acesse elementos da coleção sem precisar conhecer detalhes sobre sua estrutura interna (listas, árvores, etc.).

2. Uniformidade na Iteração:
   - Oferece uma interface consistente para iterar diferentes tipos de coleções, tornando o código mais genérico e reutilizável.

3. Simplificação do Código Cliente:
   - O cliente não precisa gerenciar a lógica de navegação pelos elementos, como índices ou ponteiros.

4. Suporte a Iterações Múltiplas:
   - É possível criar vários iteradores para percorrer a mesma coleção simultaneamente, sem interferência.

5. Encapsulamento:
   - A lógica de iteração fica encapsulada no iterador, reduzindo a complexidade da coleção e protegendo seus dados internos.

## Desvantagens

1. Sobrecarga Adicional:
   - A criação de objetos iteradores pode aumentar o consumo de memória e processamento, especialmente para coleções grandes.

2. Aumento da Complexidade no Design:
   - Introduz mais classes e interfaces no sistema, tornando o design mais complexo.

3. Restrição para Algumas Operações:
   - Algumas operações avançadas, como inserção ou remoção durante a iteração, podem não ser suportadas ou requerer lógica extra.

4. Manutenção Extra:
   - Alterações na estrutura da coleção podem exigir mudanças na implementação do iterador.

---

O uso do padrão **Iterator** é ideal quando há necessidade de iterar por diferentes coleções de forma uniforme e sem expor detalhes internos, mas é importante avaliar o custo-benefício dependendo da complexidade do sistema.

## Metodologia

No sistema de Agenda, de acordo com o RE-004: Agendamento de eventos recorrentes, como reuniões semanais, sem a necessidade de recriá-los manualmente.

Sendo assim existe a necessidade do agendamento de eventos recorrentes envolve a criação de múltiplos eventos similares (mesmo título, participantes, descrição), mas com diferenças sutis, como datas e horários. O padrão Prototype permite criar um protótipo de um evento e, em seguida, clonar esse protótipo para gerar rapidamente os eventos recorrentes, com a flexibilidade de modificar apenas os atributos necessários (como a data).

## Modelagem

### Implementação:

Para a criação da modelagem foi utilizado a ferramenta **Lucid** para o diagrama de classes, o que facilitou o processo de abstração e visualização do sistema. 

<p style="text-align: center"><b>Figura 1:</b> Modelo de domínio utilizado no projeto.</p>
<div align="center"><div style="width: 940px; height: 480px; margin: 10px; position: relative;"><iframe frameborder="0" style="width:100%;height:353px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=prototype.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1oohHlQTe0by6IUe3_Q-6BgyOTLuCm1jd%26export%3Ddownload"></iframe></div>
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b><a href="https://github.com/CADU110">Carlos Alves</a>, <a href="https://github.com/melohugo"> Hugo Queiroz</a> e <a href="https://github.com/vitorfleonardo"> Vitor Féijo</a>, 2025</p></font>

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

      tasks.push(clonedTask);
      clonedTasks.push(clonedTask);
    }
  }

  res.status(200).json(clonedTasks);
};

```

A `createTask` é responsável por gerenciar as operações da criação das multiplas tarefas.

Esses são os principais componentes do padrão Prototype que foram implementados no código, com suas respectivas responsabilidades e relações. 

### Imagens

<p style="text-align: center"><b>Figura 1:</b> Testando no Postman - usando filtro dia</p>
<div align="center">
  <img src="./images/3.3.Comportamentais/iteradorD.jpeg" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b>Carlos Alves, Hugo Queiroz e Vitor Féijo</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 2:</b> Testando no Postman - usando filtro mês </p>
<div align="center">
  <img src="./images/3.3.Comportamentais/iteradorM.jpeg" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b>Carlos Alves, Hugo Queiroz e Vitor Féijo</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 3:</b> Testando no Postman - usando filtro ano</p>
<div align="center">
  <img src="./images/3.3.Comportamentais/iteradorA.jpeg" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b>Carlos Alves, Hugo Queiroz e Vitor Féijo</a>, 2025</p></font>

## Referências
> <a>1.<a/> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>2.<a/> REFACTORING GURU. *Prototype: Design Patterns.* Disponível em: [https://refactoring.guru/pt-br/design-patterns/prototype](https://refactoring.guru/pt-br/design-patterns/prototype). Acesso em: 06 jan. 2025.. <br>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 05/01/2025 | Estrutura do artefato | [Carlos Alves](https://github.com/CADU110), [Vitor Feijó](https://github.com/vitorfleonardo) e  [Hugo Queiroz](https://github.com/melohugo) |  |

