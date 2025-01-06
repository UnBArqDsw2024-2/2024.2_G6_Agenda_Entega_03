# Flyweight

## Introdução

O padrão de projeto <b>Flyweight</b> é um dos padrões estruturais definidos pela Gang of Four (GoF) e tem como principal objetivo reduzir o consumo de memória e otimizar o desempenho em sistemas que 
precisam manipular um grande número de objetos semelhantes. Ele faz isso promovendo o compartilhamento de partes comuns dos objetos, armazenando-as em um local centralizado e reutilizando-as sempre
que possível.

O Flyweight é amplamente utilizado em cenários onde há a necessidade de criar múltiplas instâncias semelhantes de uma classe, como:

- Renderização de gráficos ou textos.
- Representação de peças em jogos de tabuleiro.
- Gerenciamento de conexões em sistemas distribuídos.

## Elementos Principais do Flyweight

### **1. Flyweight (Interface ou Classe Abstrata)**

Define a interface comum para todos os objetos Flyweight. Essa interface normalmente contém métodos que permitem manipular o estado extrínseco, que será fornecido pelo cliente no momento da
execução.

- Representa o comportamento compartilhado pelos objetos.
- Garante que os estados intrínsecos sejam imutáveis.

### **2. Concrete Flyweight (Implementação Concreta)**

É a implementação concreta da interface Flyweight. Armazena o estado intrínseco (compartilhado e imutável) e implementa as operações definidas na interface ou classe abstrata.

- Otimiza o uso de memória compartilhando o estado intrínseco.
- Representa os objetos reutilizáveis no sistema.

### **3. Unshared Flyweight**

Em alguns casos, objetos Flyweight não são totalmente compartilhados. O padrão permite objetos individuais que não seguem o compartilhamento, geralmente para armazenar informações específicas
que não podem ser generalizadas.

- Útil quando parte do sistema exige instâncias exclusivas.

### **4. Flyweight Factory (Fábrica de Flyweight)**

Responsável por gerenciar e garantir o compartilhamento das instâncias Flyweight. Ela:

- Cria novos objetos Flyweight apenas quando necessário.
- Retorna instâncias existentes se o objeto já tiver sido criado anteriormente.
- Centraliza o gerenciamento do pool de objetos compartilhados.

### **5. Client (Cliente)**

Representa o código que usa o Flyweight. O cliente é responsável por:

- Fornecer o estado extrínseco necessário ao usar um Flyweight.
- Delegar a criação ou obtenção de objetos à fábrica.

## Vantagens e Justificativas para o uso do Flyweight:

O padrão Flyweight é especialmente útil em situações onde a criação e manipulação de um grande número de objetos impacta diretamente o desempenho e o consumo de memória do sistema.

1. **Redução no consumo de memória**: ao compartilhar o estado intrínseco (imutável), o Flyweight minimiza a duplicação de dados, reduzindo significativamente o uso de memória.
2. **Melhor desempenho**: com menos objetos alocados na memória, operações como buscas, ordenações e manipulações se tornam mais rápidas.
3. **Flexibilidade**: a separação entre os estados intrínseco e extrínseco oferece flexibilidade para personalizar objetos sem necessidade de criar novas instâncias.
4. **Organização centralizada**: o uso de uma fábrica (Flyweight Factory) facilita o gerenciamento dos objetos Flyweight e garante a consistência no compartilhamento.
5. **Facilidade de manutenção**: Como o estado intrínseco é centralizado, as alterações necessárias nesse estado impactam todas as instâncias compartilhadas, tornando a manutenção mais simples.

## Metodologia

## Modelagem

## Código

## Referências
> <a>1.</a> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>2.</a> FREEMAN, Eric; FREEMAN, Elisabeth Robson. Head First Design Patterns: A Brain-Friendly Guide. 2. ed. Sebastopol: O'Reilly Media, 2020. <br>
> <a>3.</a> FOWLER, Martin. Patterns of Enterprise Application Architecture. Boston: Addison-Wesley, 2003. <br>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.1`  | 05/01/2025 | Estrutura do artefato | [Gabriel Souza](https://github.com/GabrielMS00) | |


