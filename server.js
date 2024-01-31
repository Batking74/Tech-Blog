// Importing Modules/Packages
const controllers = require('./controllers/index');
const handlebars = require('express-handlebars');
const database = require('./config/connection');
const session = require('express-session');
const express = require('express');
const path = require('path');
const app = express();
require('dotenv').config();


// Server Port
const PORT = process.env.PORT || 3001;


// Middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    // Avoid unnecessary writes to the session store data structure if no changes are made to the session object/data structure.
    resave: false,
    // Do not save sessions in the store data structure if they are new and remain unchanged during the request.
    saveUninitialized: false
}))

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
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