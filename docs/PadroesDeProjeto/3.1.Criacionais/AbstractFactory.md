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



## Modelagem


* Implementação:
   


<p style="text-align: center"><b>Figura 1:</b> Modelo de domínio utilizado no projeto.</p>
<div align="center">

</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>


## Código



```Java

// Classe  - estrutura básica

```

``` java
// Classe  - cria objetos Avaliacao

```

``` java

```

``` java

```



``` java

```


### Imagens


<p style="text-align: center"><b>Figura 2:</b> Testando Via Postman</p>
<div align="center">
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b> <a href="https://github.com/BiancaPatrocinio7">Bianca Patrocínio</a>, 2025</p></font>




## Referências
> 
>
> 

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  |04/01/2025| Estrutura do artefato | [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) | |
