const service = require('../services/start/start-service');

module.exports = (app) => {

    // Rota inicial do app
    app.post('/email', async (req, res) => {

        const data = {
            nome: req.body?.nome,
            email: req.body?.email
        };
        
        await service.sendHelloWorldEmail(data);
        res.end();
    });
};