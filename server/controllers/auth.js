require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const colors = require('colors')

const { User } = require('../models/user')
const { SECRET } = process.env

const createToken = (username, id) => {
	return jwt.sign({ username, id }, SECRET, { expiresIn: '1d' })
}

module.exports = {
	register: async (req, res) => {
		try {
			const { username, password } = req.body

			if (username === '' || password === '') {
				throw 'Please provide a username and password'
			}

			const foundUser = await User.findOne({
				where: { username },
			})

			if (foundUser) {
				throw 'User already exists'
			} else {
				const salt = bcrypt.genSaltSync(10)
				const hash = bcrypt.hashSync(password, salt)

				const newUser = await User.create({
					username,
					hashed_pass: hash,
				})

				const token = createToken(
					newUser.dataValues.username,
					newUser.dataValues.id
				)

				const expirationTime = Date.now() + 1000 * 60 * 60 * 24

				res.status(200).send({
					username: newUser.dataValues.username,
					userId: newUser.dataValues.id,
					token,
					expirationTime,
				})
			}
		} catch (err) {
			console.error('Error in register: ', err)
			res.status(400).send(err)
		}
	},

	login: async (req, res) => {
		try {
			const { username, password } = req.body
			const foundUser = await User.findOne({
				where: { username },
			})

			if (foundUser) {
				const isAuthenticated = bcrypt.compareSync(
					password,
					foundUser.hashedPass
				)

				if (isAuthenticated) {
					const token = createToken(
						foundUser.dataValues.username,
						foundUser.dataValues.id
					)

					const expirationTime = Date.now() + 1000 * 60 * 60 * 24

					res.status(200).send({
						username: foundUser.dataValues.username,
						userId: foundUser.dataValues.id,
						token,
						expirationTime,
					})
				} else throw 'Cannot log in! Please try again.'
			} else throw 'Cannot log in. User not found.'
		} catch (err) {
			console.error('ERROR in login', err)
			res.status(400).send(err)
		}
	},
}
