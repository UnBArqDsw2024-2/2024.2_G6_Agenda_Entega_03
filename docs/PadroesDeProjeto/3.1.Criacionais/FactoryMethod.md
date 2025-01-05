# Factory Method

## Introdução
O Factory Method é um padrão de design criacional que define uma interface para a criação de objetos, delegando às subclasses a responsabilidade de determinar quais tipos específicos de objetos devem ser instanciados. Esse padrão é particularmente valioso em cenários onde é necessário desacoplar o código cliente das classes concretas, promovendo maior flexibilidade, reutilização e escalabilidade no sistema.

## Elementos principais do Factory Method

- **Product (Produto)**: Define a interface ou classe base para os objetos que serão criados pelo Factory Method.
- **ConcreteProduct (Produto Concreto)**: Implementa a interface do produto, sendo a classe real que será instanciada.
- **Creator (Criador)**: Declara o método de fábrica, que retorna objetos do tipo **Product**. Pode incluir uma implementação padrão do método.
- **ConcreteCreator (Criador Concreto)**: Substitui ou implementa o método de fábrica para criar instâncias específicas de **ConcreteProduct**. 

## Vantagens e Justificativas para o Uso do Factory Method: 

O padrão **Factory Method** é altamente benéfico para projetos que exigem flexibilidade e modularidade. Ele centraliza a lógica de criação em métodos especializados, o que simplifica a manutenção e melhora o desempenho em sistemas grandes. As principais vantagens incluem:  

1. **Desacoplamento de Implementações Concretas**  
   O cliente não precisa conhecer ou depender diretamente das classes concretas, interagindo apenas com as interfaces abstratas.  

2. **Extensibilidade Simplificada**  
   Novos produtos podem ser adicionados ao sistema facilmente, sem modificar o código existente, apenas criando novas subclasses de **Product** e **Creator**.  

3. **Controle Centralizado de Instanciação**  
   A lógica de criação de objetos é encapsulada no método de fábrica, garantindo consistência e centralização.  

4. **Redução de Duplicação de Código**  
   Reutiliza a lógica de criação em diferentes partes do sistema, reduzindo a redundância.  

## Metodologia

## Modelagem




## Código



```python


```

``` python


```

``` python

```

``` python

```



``` python

```


### Imagens




## Referências
> Gamma, E., et al. Design Patterns: Elements of Reusable Object-Oriented Software. Addison-Wesley, 1994.
>
> 

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  |04/01/2025| Estrutura do artefato | [Julia Vitória](https://github.com/Juhvitoria4) | |
