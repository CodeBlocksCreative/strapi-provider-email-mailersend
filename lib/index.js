'use strict';

const Recipient = require("mailersend").Recipient;
const EmailParams = require("mailersend").EmailParams;
const MailerSend = require("mailersend");

module.exports = {
  init(providerOptions = {}, settings = {}) {
    const mailersend = new MailerSend({
      api_key: providerOptions.apiKey,
    });

    return {
      send(options) {
        return new Promise((resolve, reject) => {
          const { from, to, cc, bcc, replyTo, subject, text, html, ...rest } = options;

          const recipients = [
            new Recipient(to)
          ];

          const emailParams = new EmailParams()
                .setFrom(from || settings.defaultFrom)
                .setFromName(settings.defaultFromName)
                .setRecipients(recipients)
                .setReplyTo(replyTo || settings.defaultReplyTo)
                .setSubject(subject)
                .setHtml(html);

          mailersend.send(emailParams).then((response) => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
        });
      },
    };
  },
};
