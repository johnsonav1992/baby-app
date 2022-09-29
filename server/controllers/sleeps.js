const colors = require('colors')
const { Sleep } = require('../models/sleep')

const calculateTimeDifference = (startTime, endTime) => {
	const [startHour, startMinutes] = startTime.split(':')
	const [endHour, endMinutes] = endTime.split(':')

	startHourMilliSeconds = parseInt(startHour) * 60 * 60 * 1000
	startMinutesMilliseconds = parseInt(startMinutes) * 60 * 1000
	startFinalMilliseconds = startHourMilliSeconds + startMinutesMilliseconds

	endHourMilliSeconds = parseInt(endHour) * 60 * 60 * 1000
	endMinutesMilliseconds = parseInt(endMinutes) * 60 * 1000
	endFinalMilliseconds = endHourMilliSeconds + endMinutesMilliseconds

	calculatedDuration = Math.abs(endFinalMilliseconds - startFinalMilliseconds)

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
			})
			res.status(200).send(sleeps)
		} catch (err) {
			console.log(err)
		}
	},

	addSleep: async (req, res) => {
		const { startTime, endTime } = req.body

		const calculatedDuration = calculateTimeDifference(startTime, endTime)

		const { childId } = req.params
		try {
			const newSleep = await Sleep.create({
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
		const { startTime, endTime } = req.body

        const calculatedDuration = calculateTimeDifference(startTime, endTime)
        
		try {
			const updatedSleep = await Sleep.update(
				{
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
