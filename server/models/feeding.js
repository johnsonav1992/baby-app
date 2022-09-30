const { DataTypes } = require('sequelize')

const { sequelize } = require('../database/database')

module.exports = {
    Feeding : sequelize.define('feedings', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        feed_type: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        food: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        amount: {
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