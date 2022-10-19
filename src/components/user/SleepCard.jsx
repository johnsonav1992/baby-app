import React from 'react'

import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import sleepIcon from '../../assets/sleep.svg'
import { timeConverter, shortDateCreator } from '../../helper-functions/helperFunctions'
import classes from './SleepCard.module.css'

const SleepCard = ({
	id,
	entryType,
	startTime,
	endTime,
	day,
	duration,
	deleteEntry,
	status,
	toggle,
	setEntryId,
	sendBack
}) => {
	duration = duration / 60 / 1000

	return (
		<Card addClass="entry">
			<div className={classes.container}>
				<div className={classes['img-wrapper']}>
					<img
						className={classes.icon}
						src={sleepIcon}
						alt="sleep icon"
					/>
				</div>
				<div className={classes['info-wrapper']}>
					<div className={classes.times}>
						<div className={classes['time-container']}>
							<h3 className={classes.heading}>Start:</h3>
							<time className={classes.time}>
								{timeConverter(startTime)}
							</time>
						</div>
						<div className={classes['time-container']}>
							<h3 className={classes.heading}>End:</h3>
							<time className={classes.time}>
								{timeConverter(endTime)}
							</time>
						</div>
					</div>
					<div className={classes['day-duration']}>
						<p>{shortDateCreator(day)}</p>
						<p>{duration} min.</p>
					</div>
				</div>
				<div className={classes['btn-container']}>
					<EditButton
						onClick={() => {
							status('edit')
							toggle('sleep')
							sendBack({category: 'sleep', startTime, endTime, day, duration})
							setEntryId(id)
						}}
					/>
					<RedDeleteButton
						onClick={() => deleteEntry(id, entryType)}
					/>
				</div>
			</div>
		</Card>
	)
}

export default SleepCard
