// Importing Modules/Packages
const Post = require('../../models/Posts');
const User = require('../../models/User');
const post = require('express').Router();


// Gets all Posts
post.get('/', (req, res) => {
    res.json('Successful GET/READ Route!');
})


// Creates a Users Posts
post.post('/Api/Create', (req, res) => {
    const { Title, Content } = req.body;
    res.json('Successful POST/CREATE Route!');
})


// Updates a Users Posts
post.put('/:id', (req, res) => {
    const { Username, Password } = req.body;
    res.json('Successful UPDATE/PUT Route!');
})


// Deletes a Users Posts
post.delete('/:id', (req, res) => {
    res.json('Successful Delete Route!');
})


// Exporting Module
module.exports = post;