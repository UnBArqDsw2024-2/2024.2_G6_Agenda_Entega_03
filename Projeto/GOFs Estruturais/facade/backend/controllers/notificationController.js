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
