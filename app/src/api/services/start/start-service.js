const mail = require('../../../helpers/email-helper');
const template = require('../../../base/email-template');

class StartService {

    async sendMail() {

        await mail.send();
    }

    async sendHelloWorldEmail(data) {

        mail.config = {
            template: template.helloWorld,
            subject: 'Uma mensagem de boas-vindas'
        };

        mail.contact = data.email;
        
        await mail.send(data);
    }
};

module.exports = new StartService();