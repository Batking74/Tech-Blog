// Importing Module
const { serveWebpage, withAuth } = require('../helpers/helpers');
const dashboard = require('express').Router();

// Rendering the Dashboard Page for Non-Logged-In Users
dashboard.get('/', withAuth, (req, res) => serveWebpage(req, res, 'dashboard'));

// Rendering the Dashboard Page for Logged-In Users
dashboard.get('/:id', (req, res) => serveWebpage(req, res, 'dashboard'));

// Exporting Module
module.exports = dashboard;