// Importing Modules/Packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// Creating a new Table
class User extends Model {}

User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    Username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    hooks: {
        beforeCreate: async (newPost) => {

        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'User'
})


// Exporting Module
module.exports = User;