import React from 'react'

import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import bottleIcon from '../../assets/bottle.svg'
import { timeConverter, shortDateCreator } from '../../helper-functions/helperFunctions'
import classes from './FeedingCard.module.css'

const FeedingCard = ({
	id,
	entryType,
	deleteEntry,
	type,
	food,
	amount,
	day,
	time,
	status,
	toggle,
	setEntryId,
	sendBack
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
							{type} - {food}: 
						</h3>
						<h3 className={classes.heading}>{amount}</h3>
					</div>
					<div className={classes['day-time']}>
						<p>{shortDateCreator(day)}</p>
						<p>{timeConverter(time)}</p>
					</div>
				</div>
				<div className={classes['btn-container']}>
					<EditButton
						onClick={() => {
							status('edit')
							sendBack({category: 'feeding', type, food, amount, day, time})
							setEntryId(id)
							toggle()
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

export default FeedingCard
