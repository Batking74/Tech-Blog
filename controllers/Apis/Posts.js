// Importing Modules/Packages
const Post = require('../../models/Posts');
const User = require('../../models/User');
const post = require('express').Router();


// Posts Route
post.get('/', (req, res) => {
    console.log('YAYAYAYYAY')
})


// Exporting Module
module.exports = post;