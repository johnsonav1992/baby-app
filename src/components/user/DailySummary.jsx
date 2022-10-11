import React from 'react'
import { useSelector } from 'react-redux'

import Card from '../UI/Card'
import PlusButton from '../UI/PlusButton'
import bottle from '../../assets/bottle.svg'
import sleepMoon from '../../assets/sleep.svg'
import diaper from '../../assets/diaper.svg'
import classes from './DailySummary.module.css'

const DailySummary = ({ selectedDate }) => {
	const sleeps = useSelector(state => state.child.sleeps)
	const feedings = useSelector(state => state.child.feedings)
	const changings = useSelector(state => state.child.changings)
	const childName = useSelector(state => state.child.childName)

	const sleepNumber = sleeps.filter(sleep => sleep.day === selectedDate).length
	const feedNumber = feedings.filter(feed => feed.day === selectedDate).length
	const changingNumber = changings.filter(changing => changing.day === selectedDate).length

	return (
		<Card addClass='daily-summary'>
			<div className={classes.container}>
        <h1>Daily Summary {childName && `- ${childName}`}</h1>
				<div className={classes.row}>
					<div className={classes['img-wrapper']}>
						<img src={bottle} alt="bottle icon" />
					</div>
					<div className={classes.text}>
						<p>Feedings</p>
						<p>{feedings ? feedNumber : '-'}</p>
					</div>
					<PlusButton color="blue" />
				</div>
				<div className={classes.row}>
        <div className={classes['img-wrapper']}>
						<img src={sleepMoon} alt="sleep icon" />
					</div>
					<div className={classes.text}>
						<p>Sleep</p>
						<p>{sleeps ? sleepNumber : '-'}</p>
					</div>
					<PlusButton color="purple" />
				</div>
				<div className={classes.row}>
        <div className={classes['img-wrapper']}>
						<img src={diaper} alt="diaper icon" />
					</div>
					<div className={classes.text}>
						<p>Diapers</p>
						<p>{changings ? changingNumber : '-'}</p>
					</div>
					<PlusButton color="orange" />
				</div>
			</div>
		</Card>
	)
}

export default DailySummary
