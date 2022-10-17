require('dotenv').config()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const { User } = require('../models/user')
const { SECRET } = process.env

const createToken = (username, id) => {
	return jwt.sign({ username, id }, SECRET, { expiresIn: '1h' })
}

module.exports = {
	register: async (req, res) => {
		try {
			const { username, password } = req.body

			if (username === '' || password === '') {
				throw 'Please provide a username and password'
			}

			const passRegex = new RegExp(
				'^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
			)

			if (!passRegex.test(password)) {
				throw 'Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one digit, and one special character.'
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

				const expirationTime = Date.now() + 1000 * 60 * 60

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
					foundUser.hashed_pass
				)

				if (isAuthenticated) {
					const token = createToken(
						foundUser.dataValues.username,
						foundUser.dataValues.id
					)

					const expirationTime = Date.now() + 1000 * 60 * 60

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

	editUserInfo: async (req, res) => {
		const { firstName, lastName, username } = req.body
		const { userId } = req.params

		try {
			const updatedUser = await User.update(
				{
					first_name: firstName,
					last_name: lastName,
					username: username,
				},
				{
					where: {
						id: +userId,
					},
					returning: true,
				}
			)

			res.status(200).send(updatedUser)
		} catch (err) {
			console.log(err)
		}
	},

	checkOldPassword: async (req, res) => {
		try {
			const { oldPassword } = req.body
			const { userId } = req.params
			const foundUser = await User.findOne({
				where: { id: +userId },
			})

			if (foundUser) {
				const oldPasswordMatches = bcrypt.compareSync(
					oldPassword,
					foundUser.hashed_pass
				)

				if (oldPasswordMatches) {
					res.status(200).send(oldPasswordMatches)
				} else {
					throw 'Old password incorrect'
				}
			}
		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	},

	changePassword: async (req, res) => {
		try {
			const { newPassword, newPasswordConfirm } = req.body

			if (newPassword !== newPasswordConfirm) {
				throw 'Passwords do not match'
			}

			const { userId } = req.params
			const salt = bcrypt.genSaltSync(10)
			const hash = bcrypt.hashSync(newPassword, salt)

			const foundUser = await User.findOne({
				where: { id: +userId },
			})

			if (foundUser) {
				const updatedPassword = await User.update(
					{
						hashed_pass: hash
					},
					{
						where: {
							id: +userId,
						},
						returning: true,
					}
				)
				res.status(200).send(updatedPassword)
			}

		} catch (err) {
			console.log(err)
			res.status(400).send(err)
		}
	}
}
