# Facade

## Introdução

O **Facade** é um padrão estrutural que simplifica a interação com subsistemas complexos, fornecendo uma interface única e coesa. Ele reduz o acoplamento entre a lógica de negócios e os detalhes internos, tornando o código mais limpo e fácil de manter. Assim como um operador de loja simplifica pedidos por telefone, o Facade oferece acesso simplificado a funcionalidades essenciais, ocultando a complexidade do sistema.

## Estrutura do Padrão Facade

O **Facade** organiza a interação com subsistemas complexos, fornecendo uma interface simplificada para o cliente. Ele consiste nos seguintes elementos principais:

### 1. Fachada
- A classe principal que abstrai a complexidade do subsistema.
- Fornece métodos simplificados que encapsulam várias operações internas do subsistema.
- Atua como ponto único de entrada para o cliente.

### 2. Subsistema Complexo
- Conjunto de classes e métodos que executam tarefas específicas.
- Contém lógica detalhada e interdependências.
- Não tem conhecimento da existência da fachada e opera diretamente.

### 3. Cliente
- Interage apenas com a fachada.
- Não precisa lidar diretamente com o subsistema complexo.

## Vantagens e Desvantagens do Padrão Facade

### Prós

- Você pode isolar seu código da complexidade de um subsistema, tornando a interface mais simples e compreensível.
- Facilita a interação com subsistemas complexos, fornecendo um ponto de entrada único.
- Melhora a legibilidade e a manutenção do código, pois os detalhes internos do subsistema ficam ocultos.

### Contras

- Uma fachada pode se tornar um objeto deus, acoplado a todas as classes de uma aplicação, o que pode prejudicar a modularidade e a flexibilidade.
- O uso excessivo de fachadas pode levar a uma dependência excessiva de um único ponto de interação, tornando o sistema difícil de testar e modificar.

## Metodologia

No sistema de Agenda, de acordo com os requisitos 

RE-002,15 : Notificação de avisos e tarefas, 

Por isso as notificação de avisos e tarefas, é necessário implementar uma forma eficiente e simplificada de interagir com os sistemas responsáveis por enviar notificações, sem expor a complexidade dos subsistemas envolvidos. O padrão Facade foi escolhido, pois permite criar uma interface única e simples para a notificação de avisos e tarefas, ocultando os detalhes internos dos diferentes serviços de notificação. Dessa forma, o sistema que gera as notificações pode delegar a complexidade para a fachada, que lida com a integração entre os subsistemas necessários (como envio de e-mails, mensagens de texto ou notificações push), proporcionando uma maneira coesa e centralizada de gerenciar e disparar avisos e tarefas. Isso facilita a manutenção do código e melhora a escalabilidade, já que as alterações nos subsistemas podem ser feitas sem impactar diretamente as interfaces de comunicação com os componentes externos.

## Modelagem

### Implementação:

Para a criação da modelagem foi utilizado a ferramenta **Lucid** para o diagrama de classes, o que facilitou o processo de abstração e visualização do sistema. 

<p style="text-align: center"><b>Figura 1:</b> Modelo de domínio utilizado no projeto.</p>
<div align="center"><div style="width: 940px; height: 480px; margin: 10px; position: relative;"><iframe frameborder="0" style="width:100%;height:433px;" src="https://viewer.diagrams.net/?tags=%7B%7D&lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=iterator.drawio#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1umi2vF1UgAOzAmAvQGYFfYfsr-s_AY8j%26export%3Ddownload"></iframe></div>
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b><a href="https://github.com/CADU110">Carlos Alves</a>, <a href="https://github.com/melohugo"> Hugo Queiroz</a> e <a href="https://github.com/vitorfleonardo"> Vitor Féijo</a>, 2025</p></font>

## Código

A pasta de código fonte está localizada em `Projeto/GOFs Estruturais/facade`.

### Back-end

### Estrutura do Projeto

A estrutura básica do projeto é a seguinte:

```
backend/
├── controllers/
|     └── notificationController.js
├── facades/
|     └── notificationFacade.js
|     └── Iterator.js
├── routes/
|     └── notifications.js
├── services/
|     └── backupService.js
|     └── emailService.js
|     └── pushService.js
└── index.js

```

#### 1. Classe base

```javascript

const EmailService = require('../services/emailService');
const PushService = require('../services/pushService');
const BackupService = require('../services/backupService');

class NotificationFacade {
  constructor() {
    this.emailService = new EmailService();
    this.pushService = new PushService();
    this.backupService = new BackupService();
  }

  sendEventNotification({ email, deviceId, message }) {
    console.log('Enviando notificação do evento...');

    this.emailService.sendEmail(email, 'Lembrete de Evento', message);

    if (deviceId) {
      this.pushService.sendPushNotification(deviceId, message);
    }

    this.backupService.sendBackupNotification(email);

    console.log('Notificações enviadas com sucesso.');
  }
}

module.exports = NotificationFacade;

```

Essa é a classe base da notificação.

#### 2. Controller

``` javascript

const NotificationFacade = require('../facades/notificationFacade');

const notificationFacade = new NotificationFacade();

exports.sendNotification = (req, res) => {
  const { email, deviceId, message } = req.body;

  if (!email || !message) {
    return res
      .status(400)
      .json({ error: 'E-mail e mensagem são obrigatórios.' });
  }

  try {
    notificationFacade.sendEventNotification({ email, deviceId, message });
    res.status(200).json({ message: 'Notificações enviadas com sucesso!' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao enviar notificações.' });
  }
};

```

O código implementa uma rota para enviar notificações utilizando o padrão Facade, que simplifica a interação com subsistemas complexos. A classe NotificationFacade encapsula a lógica para envio de notificações.

#### 3. Services

Backup Service

```javascript

class BackupService {
  sendBackupNotification(to) {
    console.log(`Notificação de backup enviada para ${to}.`);
  }
}

module.exports = BackupService;

```

emailService

```javascript

class EmailService {
  sendEmail(to, subject, message) {
    console.log(
      `E-mail enviado para ${to} com assunto "${subject}" e mensagem: "${message}"`
    );
  }
}

module.exports = EmailService;

```

push Service

```javascript

class PushService {
  sendPushNotification(deviceId, message) {
    console.log(
      `Notificação push enviada para o dispositivo ${deviceId}: "${message}"`
    );
  }
}

module.exports = PushService;


```

### Como rodar

```
  npm install
  npm start

```
---

### Imagens

<p style="text-align: center"><b>Figura 1:</b> Testando no Postman</p>
<div align="center">
  <img src="./images/3.2.Estruturais/facade.jpeg" width="1050px" >
</div>
<font size="3"><p style="text-align: center"><b>Fonte:</b>Carlos Alves, Hugo Queiroz e Vitor Féijo</a>, 2025</p></font>

## Referências
> <a>1.<a/> GAMMA, Erich; HELM, Richard; JOHNSON, Ralph; VLISSIDES, John. Design Patterns: Elements of Reusable Object-Oriented Software. 1. ed. Boston: Addison-Wesley, 1994. <br>
> <a>2.<a/> REFACTORING GURU. *Facade: Design Patterns.* Disponível em: [https://refactoring.guru/pt-br/design-patterns/facade](https://refactoring.guru/pt-br/design-patterns/facade). Acesso em: 06 jan. 2025.. <br>

## Histórico de Versões

| Versão | Data | Descrição | Autor | Revisor |
| :----: | ---- | --------- | ----- | ------- |
| `1.0`  | 06/01/2025 | Estrutura do artefato | [Carlos Alves](https://github.com/CADU110), [Vitor Feijó](https://github.com/vitorfleonardo) e  [Hugo Queiroz](https://github.com/melohugo) |  |
| `1.1`  | 06/01/2025 | Finalizando artefato | [Carlos Alves](https://github.com/CADU110), [Vitor Feijó](https://github.com/vitorfleonardo) e  [Hugo Queiroz](https://github.com/melohugo) |  |

