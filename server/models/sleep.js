const { DataTypes } = require('sequelize')

const { sequelize } = require('../database/database')

module.exports = {
    Sleep : sequelize.define('sleeps', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        day: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }, 
        start_time: {
            type: DataTypes.TIME,
            allowNull: false
        }, 
        end_time: {
            type: DataTypes.TIME,
            allowNull: false
        }, 
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    })
}