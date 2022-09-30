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
        username: DataTypes.STRING,
        hashed_pass: DataTypes.STRING 
    }) 
}