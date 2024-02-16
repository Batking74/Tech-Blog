// Importing Modules/Packages
const { serveWebpage, withAuth } = require('../helpers/helpers');
const { User, Post } = require('../../models');
const login = require('express').Router();

// Rendering the Login Page for Non-Logged-In Users
login.get('/', withAuth, (req, res) => serveWebpage(req, res, 'login'));


// Logs Users in to their Accounts
login.post('/Api', async (req, res) => {
    const { Username, Password } = req.body;

    // Checking if user is already logged in
    if (req.session.isLoggedIn) {
        return res.status(202).send(JSON.stringify('You are already logged in'));
    }

    const userExists = await User.findOne({ where: { Username } });
    // Checking if user already exists
    if (!userExists) {
        return res.status(404).send(JSON.stringify('User Not Found'));
    }

    // Checking if password is correct
    else if (!await userExists.validatePassword(Password)) {
        return res.status(404).send(JSON.stringify('Incorrect Password!'));
    }

    // Saving Session
    req.session.userID = userExists.dataValues.id;
    req.session.username = Username;
    req.session.isLoggedIn = true;
    res.redirect(`/Dashboard/:${req.session.userID}`);
})


// Logs Users out of their Accounts
login.post('/Api/logout', (req, res) => {
    req.session.destroy((error) => {
        if (error) {
            console.error('Error destroying session:', err);
            return res.status(500).send(JSON.stringify('Internal Server Error'));
        }
        res.status(204).redirect('/Home');
    })
})


// Deletes User Accounts
login.delete('/Api/Delete/:id', async (req, res) => {
    const userID = parseInt(req.params.id.replace(':', ''));
    try {
        const deletedPosts = await Post.findAll({ where: { UserID: userID } });

        // Delete all posts
        await Promise.all(deletedPosts.map(async (post) => {
            await post.destroy();
        }))
        // Delete User Account
        const deletedUser = await User.destroy({ where: { id: userID } });
        if (deletedUser && deletedPosts) {
            // Kill Session
            req.session.destroy((error) => {
                if(error) {
                    return res.send(JSON.stringify('Internal Server Error'));
                }
                res.status(200).redirect('/Home');
            })
        }
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send(JSON.stringify('Internal Server Error'));
    }
})


// Checking If user is logged in route
login.get('/Api/IsloggedIn', async (req, res) => {
    if(req.session.isLoggedIn) res.json(true);
    else res.json(false);
})


// Exporting Module
module.exports = login;