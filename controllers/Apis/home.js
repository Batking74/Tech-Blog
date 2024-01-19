// Importing Modules/Packages
const home = require('express').Router();
const path = require('path');


// Home Route
home.get('/', (req, res) => {
    console.log('worrrkkkkedddd!')
    res.sendFile(path.join(__dirname, '../public/index.html'));
})


// Exporting Module
module.exports = home;