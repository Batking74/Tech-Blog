// Importing Modules/Packages
const { serveWebpage, withAuth } = require('../helpers/helpers');
const home = require('express').Router();

// Rendering the Home Page for Non-Logged-In Users
home.get('/', withAuth, (req, res) => serveWebpage(req, res, 'home'));

// Rendering the Dashboard Page for Logged-In Users
home.get('/:id', (req, res) => serveWebpage(req, res, 'home'));


// Exporting Module
module.exports = home;