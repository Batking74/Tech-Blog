// Importing Modules
const dashboard = require('./Apis/dashboard');
const route = require('express').Router();
const signup = require('./Apis/signup');
const login = require('./Apis/login');
const path = require('path');


// Middleware
route.use('/Login', login);
route.use('/Signup', signup);
route.use('/Dashboard', dashboard);


// Home Route
route.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
})


// Exporting Module
module.exports = route;