const express = require('express');

const postsRouter = require('./posts/posts-router');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.send('Hi There!')
})

server.use('/api/posts', postsRouter);

server.use(express.json());

module.exports = server;