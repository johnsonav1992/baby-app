import React from 'react'
import { useSelector } from 'react-redux'

import Card from '../UI/Card'
import PlusButton from '../UI/PlusButton'
import bottle from '../../assets/bottle.svg'
import sleepMoon from '../../assets/sleep.svg'
import diaper from '../../assets/diaper.svg'
import { toHoursAndMinutes } from '../../helper-functions/helperFunctions'
import classes from './DailySummary.module.css'

const DailySummary = ({ selectedDate, setStatus, toggle }) => {
	const sleeps = useSelector(state => state.child.sleeps)
	const feedings = useSelector(state => state.child.feedings)
	const changings = useSelector(state => state.child.changings)
	const childName = useSelector(state => state.child.childName)

	const sleepNumber = sleeps.filter(sleep => sleep.day === selectedDate)
	const sleepTotal =
		sleepNumber
			.map(sleep => sleep.duration)
			.reduce((prev, curr) => prev + curr, 0) /
		60 /
		1000
	const { hours, minutes } = toHoursAndMinutes(sleepTotal)
	const feedNumber = feedings.filter(feed => feed.day === selectedDate)
	const feedTotal = feedNumber
		.map(feed => +feed.amount.match(/(\d+)/)[0])
		.reduce((prev, curr) => prev + curr, 0)
	const changingNumber = changings.filter(
		changing => changing.day === selectedDate
	).length

	return (
		<Card addClass="daily-summary">
			<div className={classes.container}>
				<h1>Daily Summary {childName && `- ${childName}`}</h1>
				<div className={classes.row}>
					<div className={classes['img-wrapper']}>
						<img src={bottle} alt="bottle icon" />
					</div>
					<div className={classes.text}>
						<p>Feedings</p>
						<p>
							{feedNumber.length !== 0
								? `${feedNumber.length}X - Total: ${feedTotal} oz`
								: '-'}
						</p>
					</div>
					<PlusButton
						color="blue"
						onClick={() => {
							childName !== ''
								? toggle('feeding')
								: alert('you must select a child first')
							setStatus('Add')
						}}
					/>
				</div>
				<div className={classes.row}>
					<div className={classes['img-wrapper']}>
						<img src={sleepMoon} alt="sleep icon" />
					</div>
					<div className={classes.text}>
						<p>Sleep</p>
						<p>
							{sleepNumber.length !== 0
								? `${sleepNumber.length}X - Total: ${hours} hrs. ${minutes} mins.`
								: '-'}
						</p>
					</div>
					<PlusButton
						color="purple"
						onClick={() => {
							childName !== ''
								? toggle('sleep')
								: alert('you must select a child first')
							setStatus('Add')
						}}
					/>
				</div>
				<div className={classes.row}>
					<div className={classes['img-wrapper']}>
						<img src={diaper} alt="diaper icon" />
					</div>
					<div className={classes.text}>
						<p>Diapers</p>
						<p>
							{changingNumber !== 0 ? `${changingNumber}X` : '-'}
						</p>
					</div>
					<PlusButton
						color="orange"
						onClick={() => {
							childName !== ''
								? toggle('changing')
								: alert('you must select a child first')
							setStatus('Add')
						}}
					/>
				</div>
			</div>
		</Card>
	)
}

export default DailySummary
