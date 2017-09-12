process.env.NODE_ENV = process.env.NODE_ENV || 'development';
var port = 8000,
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    db = mongoose(),
    app = express();
app.listen(port);

module.exports = app;

console.info(`Servidor executando em http://localhost:${port}/`);