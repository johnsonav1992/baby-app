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
        start_time: {
            type: 'TIMESTAMP'
        },
        end_time: {
            type: 'TIMESTAMP'
        },
        duration: DataTypes.TIME
    })
}