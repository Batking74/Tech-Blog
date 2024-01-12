// Importing Package
const Sequelize = require('sequelize');
require('dotenv').config();

let database = getDatabase();


// Retrieves database connection
function getDatabase() {
    if(process.env.JAWSDB_URL) {
        return new Sequelize(process.env.JAWSDB_URL);
    }
    return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD, {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        })
}


// Exporting Database
module.exports = database;