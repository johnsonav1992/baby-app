const { Child } = require('../models/child')
const { Sleep } = require('../models/sleep')

const calculateTimeDifference = (startTime, endTime) => {
	const [startHour, startMinutes] = startTime.split(':')
	const [endHour, endMinutes] = endTime.split(':')

	const startHourMilliSeconds = parseInt(startHour) * 60 * 60 * 1000
	const startMinutesMilliseconds = parseInt(startMinutes) * 60 * 1000
	const startFinalMilliseconds = startHourMilliSeconds + startMinutesMilliseconds

	const endHourMilliSeconds = parseInt(endHour) * 60 * 60 * 1000
	const endMinutesMilliseconds = parseInt(endMinutes) * 60 * 1000
	const endFinalMilliseconds = endHourMilliSeconds + endMinutesMilliseconds

	const calculatedDuration = Math.abs(endFinalMilliseconds - startFinalMilliseconds)

	return calculatedDuration
}

module.exports = {
	getAllSleeps: async (req, res) => {
		const { childId } = req.params
		try {
			const sleeps = await Sleep.findAll({
				where: {
					childId: +childId,
				},
                include: [{
                    model: Child,
                    required: true,
                    attributes: ['name']
                }]
			})
			res.status(200).send(sleeps)
		} catch (err) {
			console.log(err)
		}
	},

	addSleep: async (req, res) => {
		const { category, day, startTime, endTime } = req.body

		const calculatedDuration = calculateTimeDifference(startTime, endTime)

		const { childId } = req.params
		try {
			const newSleep = await Sleep.create({
				category,
				day,
				time: startTime,
				start_time: startTime,
				end_time: endTime,
				duration: calculatedDuration,
				childId: +childId, 
            })
			res.status(200).send(newSleep)
		} catch (err) {
			console.log(err)
		}
	},

	editSleep: async (req, res) => {
		const { sleepId } = req.params
		const { day, startTime, endTime } = req.body

        const calculatedDuration = calculateTimeDifference(startTime, endTime)

		try {
			const updatedSleep = await Sleep.update(
				{
					day,
					time: startTime,
					start_time: startTime,
					end_time: endTime,
					duration: calculatedDuration,
				},
				{
					where: {
						id: +sleepId,
					},
					returning: true,
				}
			)

			res.status(200).send(updatedSleep[1][0].dataValues)
		} catch (err) {
			console.log(err)
		}
	},

	deleteSleep: async (req, res) => {
		const { sleepId } = req.params
		try {
			await Sleep.destroy({
				where: {
					id: +sleepId,
				},
			})
			res.sendStatus(200)
		} catch (err) {
			console.log(err)
		}
	},
}
