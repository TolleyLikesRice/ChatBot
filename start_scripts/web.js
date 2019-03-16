const fs = require('fs');
const winston = require('winston');
const main = winston.loggers.get('main');
if (fs.existsSync('./test.txt') == false) {
    const express = require('express');
    const app = express();
    const port = 3000;

    app.get('/onlineCheck', (req, res) => res.send('ChatBot Running and functioning!'));

    app.listen(port, () => main.verbose(`Web server listening on port ${port}!`));
}