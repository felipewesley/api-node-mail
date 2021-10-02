const mail = require('../../../helpers/email-helper');

class StartService {

    async sendMail() {

        await mail.send();
    }

    async sendHelloWorldEmail(data) {

        mail.config = {
            template: '/hello/hello-world.html',
            subject: 'Uma mensagem de boas-vindas'
        };

        mail.contact = data.email;
        
        await mail.send(data);
    }
};

module.exports = new StartService();