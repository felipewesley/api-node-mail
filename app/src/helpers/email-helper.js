"use strict";
const nodemailer = require("nodemailer");
const environment = require("../config/email_environment");

const mail = {

    // async..await is not allowed in global scope, must use a wrapper
    send() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
    //   let testAccount = nodemailer.createTestAccount().then();
    
      const account = {
        user: environment.username,
        pass: environment.password
      };

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: account.user, // generated ethereal user
          pass: account.pass, // generated ethereal password
        },
        tls: {
          ciphers:'SSLv3'
        }
      });
    
      const contactList = [
        "contact@mail.com"
      ];

      // send mail with defined transport object
      let info = transporter.sendMail({
        from: `"Email Testing 👻" <${environment.username}>`, // sender address
        to: contactList.join(','), // list of receivers
        subject: "Hello Test via Email ✔", // Subject line
        text: "Hello world! How are you?", // plain text body
        html: "<h2>Hello world!</h2><br><p>I hope you're well! Bye.</p>", // html body
      })
      .then((data) => console.info('mensagemEnviada - sendMail', data))
      .catch(err => console.error('sendMail', err));
    
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
    
      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}

module.exports = mail;