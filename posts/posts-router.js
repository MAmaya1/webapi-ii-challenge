const express = require('express');

const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'The posts information could not be retrieved' })
        })
})

module.exports = router;