const { DataTypes } = require('sequelize')

const { sequelize } = require('../database/database')

module.exports = {
    Child : sequelize.define('children', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            allowNull: false,
            primaryKey: true
        },
        name: DataTypes.STRING,
        gender: DataTypes.STRING,
        age: DataTypes.INTEGER
    })
}