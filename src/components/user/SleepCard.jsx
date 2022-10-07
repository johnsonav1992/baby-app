import React from 'react'
import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import classes from './SleepCard.module.css'
import sleepIcon from '../../assets/sleep.svg'
import { timeConverter } from '../../helper-functions/helperFunctions'

const SleepCard = ({ startTime, endTime, day, duration }) => {
	duration = duration / 60 / 1000

	return (
		<Card>
			<div className={classes.container}>
				<img
					className={classes.icon}
					src={sleepIcon}
					alt="sleep icon"
				/>
				<div className={classes['info-wrapper']}>
					<div className={classes.times}>
						<div className={classes['time-container']}>
							<h3 className={classes.heading}>Start:</h3>
							<time className={classes.time}>{timeConverter(startTime)}</time>
						</div>
						<div className={classes['time-container']}>
							<h3 className={classes.heading}>End:</h3>
							<time className={classes.time}>{timeConverter(endTime)}</time>
						</div>
					</div>
					<div className={classes['day-duration']}>
						<p>{day}</p>
						<p>{duration} min.</p>
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
