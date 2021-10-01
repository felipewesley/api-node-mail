const http = require('http');
const write = () => "<html><body>Hello world!</html></body>";

const server = http.createServer((req, res) => {

    res.end(write());
});

server.listen(3000);