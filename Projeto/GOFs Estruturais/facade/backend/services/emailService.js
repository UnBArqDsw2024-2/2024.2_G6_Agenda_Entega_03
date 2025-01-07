class EmailService {
  sendEmail(to, subject, message) {
    console.log(
      `E-mail enviado para ${to} com assunto "${subject}" e mensagem: "${message}"`
    );
  }
}

module.exports = EmailService;
