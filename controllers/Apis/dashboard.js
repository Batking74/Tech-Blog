// Importing Module
const dashboard = require('express').Router();


// Serving up Dashboard Page
dashboard.get('/', (req, res) => {
    console.log('Hello WORLD!' + req.url);
    res.json('Successful Route!');
})


// Exporting Module
module.exports = dashboard;