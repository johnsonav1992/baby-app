const { DataTypes } = require('sequelize')

const { sequelize } = require('../database/database')

module.exports = {
    User : sequelize.define('user', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    args: [4, 50],
                    msg: 'Username must be between 4 and 50 characters long.'
                }
            }
        },
        hashed_pass: {
            type: DataTypes.STRING,
            allowNull: false
        } 
    }) 
}