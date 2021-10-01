"use strict";
const nodemailer = require("nodemailer");

const mail = {

    // async..await is not allowed in global scope, must use a wrapper
    send() {
      // Generate test SMTP service account from ethereal.email
      // Only needed if you don't have a real mail account for testing
    //   let testAccount = nodemailer.createTestAccount().then();
    
      let testAccount = {
        user: 'my_account@mail.com',
        pass: 'my_password'
      };

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
        tls: {
          ciphers:'SSLv3'
        }
      });
    
      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"Identifier 👻" <identifier@mail.com>', // sender address
        to: "to.emailaddress@mail.com", // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Hello world?</b>", // html body
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