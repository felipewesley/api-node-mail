const mail = require('../../../helpers/email-helper');

class StartService {

    log(...data) {
        console.log(data);
    }

    async sendMail() {

        await mail.send();
    }
};

module.exports = new StartService();