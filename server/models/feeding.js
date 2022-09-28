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
        feed_type: DataTypes.STRING,
        food: DataTypes.STRING,
        amount: DataTypes.STRING
    })
}