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
	
	const changingNumber = changings.filter(
		changing => changing.day === selectedDate
	).length
	const currentChangings = changings.filter(
		changing => changing.day === selectedDate
	)
	const wetNum = currentChangings.filter(
		changing => changing.type === 'Wet'
	).length
	const dirtyNum = currentChangings.filter(
		changing => changing.type === 'Dirty'
	).length
	const comboChangingNum = currentChangings.filter(
		changing => changing.type === 'Dirty/Wet'
	).length
					
	const feedDisplay = () => {
		const feedingsWithNumbers = feedNumber.filter(feed => feed.amount.match(/(\d+)/)) 
		const feedAmounts = feedingsWithNumbers.map(feed => +feed.amount[0])
		let displayFeedTotal
		
		if (feedAmounts.length > 0) {
			displayFeedTotal = feedAmounts.reduce(
				(prev, curr) => prev + curr
			)
		}

		const feedingsWithoutNumbers = feedNumber.filter(feed => !feed.amount.match(/(\d+)/))
		const nonNumericFeedingDisplay = feedingsWithoutNumbers.map(
			feed => `+ ${feed.amount} of ${feed.food}`
		)

		return `${feedNumber.length}X - Total: ${displayFeedTotal} oz ${nonNumericFeedingDisplay}`
	}

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
								? feedDisplay()
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
							{changingNumber !== 0
								? `${changingNumber}X - Wet: ${wetNum} | Dirty: ${dirtyNum} | Both: ${comboChangingNum}`
								: '-'}
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
