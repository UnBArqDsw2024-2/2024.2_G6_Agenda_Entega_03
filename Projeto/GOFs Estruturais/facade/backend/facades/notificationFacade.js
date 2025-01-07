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
