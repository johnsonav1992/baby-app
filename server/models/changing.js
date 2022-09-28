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
        type: DataTypes.STRING
    })
}