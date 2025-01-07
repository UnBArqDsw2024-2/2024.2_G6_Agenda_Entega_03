# Iterator

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

No sistema de Agenda, de acordo com os requisitos 

RE-009,RE-022 : Visualização diária, semanal ou mensal, 

RE-003,RE-108, RE-121: Filtragem de eventos, 

RE-081: Percorrer eventos de um cliente, surgiu a necessidade de implementar uma funcionalidade eficiente para navegação e manipulação de eventos.

Esses requisitos demandam uma maneira flexível de iterar pelos eventos, seja em visualizações agrupadas por dia, semana ou mês, ou para aplicar filtros específicos (como por cliente ou por categoria). O padrão **Iterator** foi escolhido porque permite percorrer eventos de maneira desacoplada, encapsulando a lógica de navegação em uma estrutura separada. Assim, o cliente pode acessar os eventos sem precisar conhecer os detalhes da organização interna (lista, árvore, etc.), facilitando a implementação de visualizações personalizadas e filtros dinâmicos. Além disso, o padrão suporta múltiplas iterações simultâneas, o que é útil para visualizar diferentes contextos (ex.: lista de eventos filtrada e visualização por calendário) ao mesmo tempo.

## Modelagem

### Implementação:

Para a criação da modelagem foi utilizado a ferramenta **Lucid** para o diagrama de classes, o que facilitou o processo de abstração e visualização do sistema. 

<p style="text-align: center"><b>Figura 1:</b> Modelo de domínio utilizado no projeto.</p>
<div align="center"><div style="width: 940px; height: 480px; margin: 10px; position: relative;"><iframe frameborder="0" style="width:100%;height:433px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=iterator.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1umi2vF1UgAOzAmAvQGYFfYfsr-s_AY8j%26export%3Ddownload"></iframe></div>
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b><a href="https://github.com/CADU110">Carlos Alves</a>, <a href="https://github.com/melohugo"> Hugo Queiroz</a> e <a href="https://github.com/vitorfleonardo"> Vitor Féijo</a>, 2025</p></font>

## Código

A pasta de código fonte está localizada em `Projeto/GOFs Comportamental/iterator`.

### Back-end

### Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
backend/
├──src/
|    ├── collections/
|    |     └── EventCollections.js
|    ├── controllers/
|    |     └── EventController.js
|    ├── iterators/
|    |     └── EventIterator.js
|    |     └── Iterator.js
|    ├── models
|    |     └── Event.js
|    ├── routes/
|    |     └── eventRoutes.js
|    └── app.js

```

#### 1. Classe base

```javascript

class Event {
  constructor(id, title, date, category) {
    this.id = id;
    this.title = title;
    this.date = new Date(date); 
    this.category = category; 
  }
}

module.exports = Event;

```

Essa é a classe base de Evento.

#### 2. Estrutura básica do Iterator

``` javascript

const Iterator = require('./Iterator');

class EventIterator extends Iterator {
    constructor(events) {
        super();
        this.events = events;
        this.position = 0;
    }

    next() {
        if (this.hasNext()) {
            return this.events[this.position++];
        }
        return null;
    }

    hasNext() {
        return this.position < this.events.length;
    }

    reset() {
        this.position = 0;
    }
}

module.exports = EventIterator;

```

A classe `Iterator` no exemplo acima atua como uma classe base abstrata para o padrão de projeto Iterator. Ela define uma interface que todos os iteradores concretos devem seguir. Os métodos `next` e `hasNext` são fundamentais no padrão de projeto Iterator, pois controlam a navegação sequencial por uma coleção de elementos.

#### 3. Iterador de evento

```javascript

const Iterator = require('./Iterator');

class EventIterator extends Iterator {
    constructor(events) {
        super();
        this.events = events;
        this.position = 0;
    }

    next() {
        if (this.hasNext()) {
            return this.events[this.position++];
        }
        return null;
    }

    hasNext() {
        return this.position < this.events.length;
    }

    reset() {
        this.position = 0;
    }
}

module.exports = EventIterator;


```

A classe chamada `EventIterator`, que estende uma classe base `Iterator`. Essa classe é utilizada para percorrer uma lista de eventos (events) de forma sequencial.

#### 4. Filtro de eventos

```javascript

function filterEventsByDateRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const iterator = eventCollection.createIterator();
    const filteredEvents = [];

    while (iterator.hasNext()) {
        const event = iterator.next();
        const eventDate = new Date(event.date);
        if (eventDate >= start && eventDate <= end) {
            filteredEvents.push(event);
        }
    }

    return filteredEvents;
}

```

A função `filterEventsByDateRange` filtra eventos dentro de um intervalo de datas utilizando o padrão de projeto Iterator. Ela recebe duas datas (`startDate` e `endDate`) e usa um iterador para percorrer a coleção de eventos (`eventCollection`). 

### Como rodar

```
  npm install
  npm start

```
---

### Imagens

<p style="text-align: center"><b>Figura 1:</b> Testando no Postman - usando filtro dia</p>
<div align="center">
  <img src="./images/3.3.Comportamentais/iteradorD.jpeg" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b>Carlos Alves, Hugo Queiroz e Vitor Féijo</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 2:</b> Testando no Postman - usando filtro semana </p>
<div align="center">
  <img src="./images/3.3.Comportamentais/iteradorM.jpeg" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b>Carlos Alves, Hugo Queiroz e Vitor Féijo</a>, 2025</p></font>

<p style="text-align: center"><b>Figura 3:</b> Testando no Postman - usando filtro mês</p>
<div align="center">
  <img src="./images/3.3.Comportamentais/iteradorY.jpeg" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b>Carlos Alves, Hugo Queiroz e Vitor Féijo</a>, 2025</p></font>

## Referências
> <a>1.<a/> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>2.<a/> REFACTORING GURU. *Iterator: Design Patterns.* Disponível em: [https://refactoring.guru/pt-br/design-patterns/iterator](https://refactoring.guru/design-patterns/iterator). Acesso em: 06 jan. 2025.. <br>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 06/01/2025 | Estrutura do artefato | [Carlos Alves](https://github.com/CADU110), [Vitor Feijó](https://github.com/vitorfleonardo) e  [Hugo Queiroz](https://github.com/melohugo) |  |
| `1.1`  | 06/01/2025 | Finalizando artefato | [Carlos Alves](https://github.com/CADU110), [Vitor Feijó](https://github.com/vitorfleonardo) e  [Hugo Queiroz](https://github.com/melohugo) |  |

