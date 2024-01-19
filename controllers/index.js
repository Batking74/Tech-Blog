// Importing Modules/Packages
const dashboard = require('./Apis/dashboard');
const route = require('express').Router();
const signup = require('./Apis/signup');
const login = require('./Apis/login');
const post = require('./Apis/Posts');
const home = require('./Apis/home');


// Middleware
route.use('/Home', home);
route.use('/Login', login);
route.use('/Signup', signup);
route.use('/Posts', post);
route.use('/Dashboard', dashboard);



// Exporting Module
module.exports = route;