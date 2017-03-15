const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});
let port = process.env.PORT || '4200';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, '0.0.0.0', () => console.log(`API running on port: ${port}`));