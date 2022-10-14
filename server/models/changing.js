const { DataTypes } = require('sequelize')
const { sequelize } = require('../database/database')

module.exports = {
    Changing : sequelize.define('changings', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        day: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }, 
        time: {
            type: DataTypes.TIME,
            allowNull: false
        } 
    })
} 