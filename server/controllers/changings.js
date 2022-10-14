const { Changing } = require('../models/changing')
const { Child } = require('../models/child')

module.exports = {
	getAllChangings: async (req, res) => {
		const { childId } = req.params
		try {
			const changings = await Changing.findAll({
				where: {
					childId: +childId,
				},
				include: [{
                    model: Child,
                    required: true,
                    attributes: ['name']
                }]
			})
			res.status(200).send(changings)
		} catch (err) {
			console.log(err)
		}
	},

	addChanging: async (req, res) => {
		const { category, type, day, time } = req.body
		const { childId } = req.params
		try {
			const newChanging = await Changing.create({
				category,
				type,
				day,
				time,
				childId: +childId,
			})
			res.status(200).send(newChanging)
		} catch (err) {
			console.log(err)
		}
	},

	editChanging: async (req, res) => {
		const { changingId } = req.params
		const { type, day, time } = req.body
		try {
			const updatedChanging = await Changing.update(
				{ type, day, time },
				{
					where: {
						id: +changingId,
					},
					returning: true,
				}
			)

			res.status(200).send(updatedChanging[1][0].dataValues)
		} catch (err) {
			console.log(err)
		}
	},

	deleteChanging: async (req, res) => {
		const { changingId } = req.params
		try {
			await Changing.destroy({
				where: {
					id: +changingId,
				},
			})
			res.sendStatus(200)
		} catch (err) {
			console.log(err)
		}
	},
}
