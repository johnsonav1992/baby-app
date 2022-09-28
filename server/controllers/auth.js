require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const colors = require('colors')

const { User } = require('../models/user')
const { SECRET } = process.env

const createToken = (username, id) => {
    return jwt.sign({ username, id}, SECRET, { expiresIn: '1d'})
}

module.exports = {
    register: async (req, res) => {
        const { username, password } = req.body
        const foundUser = await User.findOne({
            where: {username}
        })

        if (foundUser) {
            res.status(400).send('User already exists')
        } else {
            const salt = bcrypt.genSaltSync(10)
            const hash = bcrypt.hashSync(password, salt)

            const newUser = await User.create({
                username,
                hashedPass: hash
            })

            const token = createToken(newUser.dataValues.username, newUser.dataValues.id)
            const expirationTime = Date.now() + 1000 * 60 * 60 * 24

            res.status(200).send({
                username: newUser.dataValues.username,
                userId: newUser.dataValues.id,
                token,
                expirationTime
            })  
        }
    },

    login: (req, res) => {
        console.log('hi')
    }

}