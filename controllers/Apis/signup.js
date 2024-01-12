// Importing Module
const signup = require('express').Router();


// Serving up Signup Page
signup.get('/', (req, res) => {
    console.log('Hello WORLD!' + req.url);
    res.json('Successful Route!');
})


// Exporting Module
module.exports = signup;