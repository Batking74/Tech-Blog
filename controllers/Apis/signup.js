// Importing Module
const { serveWebpage, withAuth } = require('../helpers/helpers');
const signup = require('express').Router();
const User = require('../../models/User');

// Rendering the Signup Page for Non-Logged-In Users
signup.get('/', withAuth, (req, res) => serveWebpage(req, res, 'signup'));


// Creates User Accounts
signup.post('/Api', async (req, res) => {
    const { Username, Password } = req.body;
    const userExists = await User.findOne({ where: { Username: Username }});

    // Checking if user already exists
    if(userExists) {
        return res.status(400).send(JSON.stringify('Username is already taken.'));
    }
    const { dataValues } = await User.create({ Username: Username, Password: Password });

    // Saving Session
    req.session.userID = dataValues.id;
    req.session.username = Username;
    req.session.isLoggedIn = true;
    res.redirect(`/Dashboard/:${req.session.userID}`);
})


// Exporting Module
module.exports = signup;