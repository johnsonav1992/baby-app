import React from 'react'
import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import classes from './FeedingCard.module.css'
import bottleIcon from '../../assets/bottle.svg'
import { timeConverter } from '../../helper-functions/helperFunctions'

const FeedingCard = ({
	id,
	entryType,
	editEntry,
	editValues,
	deleteEntry,
	type,
	food,
	amount,
	day,
	time,
}) => {
	return (
		<Card addClass="entry">
			<div className={classes.container}>
				<div className={classes['img-wrapper']}>
					<img
						className={classes.icon}
						src={bottleIcon}
						alt="bottle icon"
					/>
				</div>
				<div className={classes['info-wrapper']}>
					<div className={classes.type}>
						<h3 className={classes.heading}>
							{type} - {food}
						</h3>
						<h3 className={classes.heading}>{amount}</h3>
					</div>
					<div className={classes['day-time']}>
						<p>{day}</p>
						<p>{timeConverter(time)}</p>
					</div>
				</div>
				<div className={classes['btn-container']}>
					<EditButton
						onClick={() => editEntry(id, entryType, editValues)}
					/>
					<RedDeleteButton
						onClick={() => deleteEntry(id, entryType)}
					/>
				</div>
			</div>
		</Card>
	)
}

export default FeedingCard
