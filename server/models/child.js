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
        name: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        }, 
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        }, 
    })
}