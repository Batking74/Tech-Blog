// Importing Modules/Packages
const controllers = require('./controllers/index');
const database = require('./config/connection');
const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();


// Server Port
const PORT = process.env.PORT || 5000;


// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(controllers);


// Runs my application locally or deploys on hosting service (Heroku)
database.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log(`Sucessfully listening on port ${PORT}`);
    })
})


// Exporting Module
module.exports = { app, PORT }