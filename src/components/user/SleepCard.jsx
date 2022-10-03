import React from 'react'
import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import classes from './SleepCard.module.css'
import sleep from '../../assets/sleep.svg'

const SleepCard = () => {
	return (
		<Card>
			<div className={classes.container}>
				<img className={classes.icon} src={sleep} alt="sleep icon" />
				<div className={classes['info-wrapper']}>
					<div className={classes.times}>
						<div className={classes['time-container']}>
							<h3 className={classes.heading}>Start:</h3>
							<time className={classes.time}>9:00am</time>
						</div>
						<div className={classes['time-container']}>
							<h3 className={classes.heading}>End:</h3>
							<time className={classes.time}>10:00am</time>
						</div>
					</div>
					<div className={classes['day-duration']}>
						<p>Monday, October 3</p>
						<p>60min.</p>
					</div>
				</div>
				<div className={classes['btn-container']}>
					<EditButton />
					<RedDeleteButton />
				</div>
			</div>
		</Card>
	)
}

export default SleepCard
