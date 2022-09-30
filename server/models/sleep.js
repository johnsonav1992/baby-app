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
        day: DataTypes.DATEONLY,
        start_time: DataTypes.TIME,
        end_time: DataTypes.TIME,
        duration: DataTypes.INTEGER
    })
}