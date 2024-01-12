// Importing Module
const login = require('express').Router();


// Serving up Login Page
login.get('/', (req, res) => {
    console.log('Hello WORLD!' + req.url);
    res.json('Successful Route!');
})


// Exporting Module
module.exports = login;