### 3.1. Padrões de Projeto GoFs Criacionais  

Os padrões de projeto criacionais são fundamentais para resolver desafios relacionados à criação de objetos em sistemas de software. Eles ajudam a separar a lógica de construção da estrutura principal do código, promovendo reutilização, flexibilidade e manutenção simplificada. No desenvolvimento da nossa agenda, aplicamos os padrões **Abstract Factory**, **Builder**, **Singleton** e **Prototype** para abordar diferentes aspectos do sistema.  

#### Abstract Factory  
O padrão Abstract Factory foi utilizado para criar famílias de objetos relacionados, como eventos, lembretes e contatos. Ele permitiu que a agenda gerenciasse diferentes tipos de dados de forma coesa, garantindo compatibilidade e consistência entre os objetos criados.  

#### Builder  
O Builder foi implementado para facilitar a criação de entradas complexas na agenda, como eventos com detalhes adicionais (descrições, participantes e notificações). A separação das etapas de construção possibilitou configurar cada elemento do evento de forma modular e flexível.  

#### Singleton  
A aplicação do Singleton garantiu que a agenda tivesse apenas uma instância centralizada de seu gerenciador principal, responsável por armazenar e acessar os dados, como a lista de compromissos e tarefas. Isso assegurou o controle único e eficiente do estado global da aplicação.  

#### Prototype  
O padrão Prototype foi empregado para criar cópias rápidas de eventos ou tarefas previamente configurados. Por exemplo, a duplicação de compromissos recorrentes ou eventos similares foi simplificada por meio do recurso de clonagem.  

#### Aplicação no Projeto  
No contexto da agenda, cada padrão criacional contribuiu para aprimorar diferentes funcionalidades:  
- **Abstract Factory** assegurou a compatibilidade entre os tipos de dados.  
- **Builder** facilitou a configuração de entradas detalhadas.  
- **Singleton** centralizou a gestão da agenda.  
- **Prototype** otimizou a duplicação de eventos e tarefas.  

O resultado foi uma solução modular e escalável, com foco na clareza e facilidade de manutenção. A implementação prática está documentada na Wiki do projeto, com modelagem, código funcional e histórico de commits no repositório demonstrando a colaboração da equipe.

--- 

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 06/01/2025 | Resumo do que foi feito dos GoF's | [Bianca Patrocínio](https://github.com/BiancaPatrocinio7) |  |
