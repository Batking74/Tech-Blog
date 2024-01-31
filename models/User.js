// Importing Modules/Packages
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const { hash, compare } = require('bcrypt');


// Creating a new Table
class User extends Model {
    async validatePassword(password) {
        return await compare(password, this.Password);
    }
}

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
        beforeCreate: async (newUser) => {
            const hashedPassword = await hash(newUser.Password, 10);
            newUser.Password = hashedPassword;
        }
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    modelName: 'User'
})


// Exporting Module
module.exports = User;