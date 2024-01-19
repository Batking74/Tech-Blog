// Importing Module
const signup = require('express').Router();
const User = require('../../models/User');


// Serving up Signup Page
signup.get('/', (req, res) => {
    res.json('Successful Route!');
})


// Exporting Module
module.exports = signup;