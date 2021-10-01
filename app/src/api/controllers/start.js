const service = require('../services/start/start-service');

module.exports = (app) => {

    // Rota inicial do app
    app.get('/', async (req, res) => {

        service.log('First Hello world!');

        await service.sendMail();

        res.end();
    });
};