const app = require('./app');
const routes = require('./loader/routes-module');

// Ativação das rotas
routes.start(app);

app.listen(3000, () => console.info('Application is listening in 3000 port'));