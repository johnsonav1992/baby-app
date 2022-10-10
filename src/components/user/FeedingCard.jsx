import React from 'react'
import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import classes from './FeedingCard.module.css'
import bottleIcon from '../../assets/bottle.svg'
import { timeConverter } from '../../helper-functions/helperFunctions'

const FeedingCard = ({ food, amount, day, time }) => {
  time = '23:00:00'

	return (
		<Card>
			<div className={classes.container}>
				<img
					className={classes.icon}
					src={bottleIcon}
					alt="bottle icon"
				/>
				<div className={classes['info-wrapper']}>
					<div className={classes.type}>
						<h3 className={classes.heading}>{food}Formula</h3>
						<h3 className={classes.heading}>{amount}4oz</h3>
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

export default FeedingCard
