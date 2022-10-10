import React from 'react'
import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import classes from './FeedingCard.module.css'
import diaperIcon from '../../assets/diaper.svg'
import { timeConverter } from '../../helper-functions/helperFunctions'

const ChangingCard = ({ type, day, time }) => {
  time = '23:00:00'

	return (
		<Card>
			<div className={classes.container}>
				<img
					className={classes.icon}
					src={diaperIcon}
					alt="diaper icon"
				/>
				<div className={classes['info-wrapper']}>
					<div className={classes.type}>
						<h3 className={classes.heading}>{type}Wet</h3>
					</div>
					<div className={classes['day-time']}>
						<p>{day}Day here at </p>
						<p>{timeConverter(time)}</p>
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

export default ChangingCard