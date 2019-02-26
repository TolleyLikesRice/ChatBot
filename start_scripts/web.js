const fs = require('fs');
if (fs.existsSync('./test.txt') == false) {
    const express = require('express');
    const app = express();
    const port = 3000;

    app.get('/onlineCheck', (req, res) => res.send('ChatBot Running and functioning!'));

    app.listen(port, () => console.log(`Server listening on port ${port}!`));
}