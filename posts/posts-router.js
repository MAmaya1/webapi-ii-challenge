const express = require('express');

const db = require('../data/db');

const router = express.Router();

// GET posts

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'The posts information could not be retrieved.' })
        })
})

// GET post by id

router.get('/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(postId)
        .then(post => {
            res.json(post)
        })
        .catch(err => {
            res.status(404).json({ error: err, message: 'The post with the specified ID does not exist.' })
        })
})

// POST (add new post)

router.post('/', (req, res) => {
    const newPost = req.body;

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
    }

    db.insert(newPost)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: err, message: 'There was an error while saving the post to the database.' })
        })

})

// PUT (edit post)

router.put('/:id', (req, res) => {
    const postId = req.params.id;
    const updatedPost = req.body;

    if (!updatedPost.title || !updatedPost.contents) {
        res.status(400).json({ errorMessage: 'Please provide title and contents for the post.' })
    }

    db.findById(postId)
        .then(post => {
            if (post) {
                db.update(postId, updatedPost)
                .then(post => {
                    res.status(201).json(post)
                })
                .catch(err => {
                    res.status(500).json({ error: err, message: 'The post information could not be modified.' })
                })
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
})

// DELETE post

router.delete('/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(postId)
        .then(post => {
            if (post) {
                db.remove(postId)
                    .then(deleted => {
                        res.status(200).json(deleted)
                    })
                    .catch(err => {
                        res.status(500).json({ error: err, message: 'The post could not be removed.' })
                    })
            } else {
                res.status(404).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
})

module.exports = router;