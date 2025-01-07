class PushService {
  sendPushNotification(deviceId, message) {
    console.log(
      `Notificação push enviada para o dispositivo ${deviceId}: "${message}"`
    );
  }
}

module.exports = PushService;
