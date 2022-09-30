const colors = require('colors')
const { Feeding } = require('../models/feeding')

module.exports = {
	getAllFeedings: async (req, res) => {
		const { childId } = req.params
		try {
			const feedings = await Feeding.findAll({
				where: {
					childId: +childId,
				},
				include: [{
                    model: Child,
                    required: true,
                    attributes: ['name']
                }]
			})
			res.status(200).send(feedings)
		} catch (err) {
			console.log(err)
		}
	},

	addFeeding: async (req, res) => {
		const { type, food, amount, day, time } = req.body
		const { childId } = req.params
		try {
			const newFeeding = await Feeding.create({
				feed_type: type,
				food,
				amount,
				day, 
				time,
				childId: +childId,
			})
			res.status(200).send(newFeeding)
		} catch (err) {
			console.log(err)
		}
	},

	editFeeding: async (req, res) => {
		const { feedingId } = req.params
		const { type, food, amount, day, time } = req.body
		try {
			const updatedFeeding = await Feeding.update(
				{
					feed_type: type,
					food,
					amount,
					day,
					time
				},
				{
					where: {
						id: +feedingId
					},
					returning: true,
				}
			)

			res.status(200).send(updatedFeeding[1][0].dataValues)
		} catch (err) {
			console.log(err)
		}
	},

	deleteFeeding: async (req, res) => {
		const { feedingId } = req.params
		try {
			await Feeding.destroy({
				where: {
					id: +feedingId
				},
			})
			res.sendStatus(200)
		} catch (err) {
			console.log(err)
		}
	},
}