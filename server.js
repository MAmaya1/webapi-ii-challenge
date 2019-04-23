const express = require('express');

const server = express();

server.get('/', (req, res) => {
    res.send('Hi There!')
})

server.use(express.json());

module.exports = server;