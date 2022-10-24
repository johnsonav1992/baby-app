const { Child } = require('../models/child')

module.exports = {
	getAllChildren: async (req, res) => {
		const { userId } = req.params
		try {
			const children = await Child.findAll({
				where: {
					userId: +userId,
				},
			})
			res.status(200).send(children)
		} catch (err) {
			console.log(err)
		}
	},

	addChild: async (req, res) => {
		const { name, gender, age } = req.body
		const { userId } = req.params
		try {
			const newChild = await Child.create({
				name,
				gender,
				age,
				userId,
			})
			res.status(200).send(newChild)
		} catch (err) {
			console.log(err)
		}
	},

	editChild: async (req, res) => {
		const { childId } = req.params
		const { name, gender, age } = req.body
		try {
			const updatedChild = await Child.update(
				{
					name,
					gender,
					age,
				},
				{
					where: {
						id: +childId
					},
					returning: true,
				}
			)

			res.status(200).send(updatedChild[1][0].dataValues)
		} catch (err) {
			console.log(err)
		}
	},

	deleteChild: async (req, res) => {
		const { childId } = req.params
		try {
			const deletedChild = await Child.destroy({
				where: {
					id: +childId
				},
			})
			res.sendStatus(200)
		} catch (err) {
			console.log(err)
		}
	},
}
