// Importing Modules/Packages
const controllers = require('./controllers/index');
const handlebars = require('express-handlebars');
const database = require('./config/connection');
const session = require('express-session');
const express = require('express');
const path = require('path');
const cors = require('cors');
const app = express();
require('dotenv').config();


// Server Port
const PORT = process.env.PORT || 2000;


// Middleware
app.use(session({
    secret: process.env.SECRET_KEY,
    // Avoid unnecessary writes to the session store data structure if no changes are made to the session object/data structure.
    resave: false,
    // Do not save sessions in the store data structure if they are new and remain unchanged during the request.
    saveUninitialized: false
}))

app.use(cors({ origin: 'https://techblog.nazirsportfolio.com', credentials: true }));
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(controllers);


// Runs my application locally or deploys on hosting service (Linode)
const waitForDB = async () => {
    const maxRetries = 10;
    let retries = 0;
    while (retries < maxRetries) {
        try {
            // Waiting for database to be running
            await database.authenticate();
            console.log("✅ Database connected successfully. ✅");

            // Starting up MySQL Server
            database.sync({ force: false }).then(() => {
                // Starting up Backend Node Server
                app.listen(PORT, () => {
                    console.log(`Listening on port ${PORT}`);
                });
            });
            return;
        }
        catch (err) {
            console.log('⏳ Waiting for DB to be ready...');
            retries++;
            await new Promise(res => setTimeout(res, 3000));
        }
    }
    console.error('❌ Could not connect to database. Exiting.');
};

waitForDB();


// Exporting Module
module.exports = { app, PORT }