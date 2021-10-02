"use strict";
const environment = require("../config/environment");
const environment_email = require("../config/email_environment");
const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const reader = require("./private/template-reader");

const template_path = './templates';

const transporterConfig = {
  host: environment_email.host,
  port: environment_email.port,
  secure: false, // true for 465, false for other ports
  tls: {
    ciphers: "SSLv3",
  },
};

const mail = {

  config: {
    template: null,
    subject: null
  },

  contact: null,
  contactList: [],

  send(data) {

    const account = environment_email.account;

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
      ...transporterConfig,
      auth: {
        user: account.username,
        pass: account.password,
      },
    });

    // send mail with defined transport object
    reader(template_path + this.config.template, (error, html) => {

      const template = handlebars.compile(html);
      const replacements = {
        ...data,
        appName: environment.appName,
      };
      const htmlToSend = template(replacements);
      const mailOptions = {
        from: `${environment.appName} 🪐 <${environment_email.account.username}>`,
        to: this.contact ?? this.contactList?.join(','),
        subject: this.config.subject,
        html: htmlToSend
      };

      // Send mail
      transporter.sendMail(mailOptions, function (error, response) {
        if (error)
          console.error(error);
      });
    });
  },
};

module.exports = mail;