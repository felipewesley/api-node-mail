const service = require('../services/start/start-service');

module.exports = (app) => {

    // Rota inicial do app
    app.post('/email', async (req, res) => {

        service.log('First Hello world!');

        await service.sendMail();

        res.end();
    });
};