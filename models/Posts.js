// Importing Modules/Packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');


// Creating A new Table in mySQL Database
class Post extends Model {}
// Table Name
Post.init({
    // Column Name
    id: {
        // Column Attributes
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    UserID: {
        type: DataTypes.INTEGER,
        references: {
            model: 'User',
            key: 'id'
        }
    },
    Date: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Content: {
        type: DataTypes.STRING,
        allowNull: false
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'Post'
})


// Exporting Module
module.exports = Post;