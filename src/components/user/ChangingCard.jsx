import React from 'react'

import Card from '../UI/Card'
import EditButton from '../UI/EditButton'
import RedDeleteButton from '../UI/RedDeleteButton'
import diaperIcon from '../../assets/diaper.svg'
import { timeConverter, shortDateCreator } from '../../helper-functions/helperFunctions'
import classes from './FeedingCard.module.css'

const ChangingCard = ({
	id,
	entryType,
	type,
	day,
	time,
	deleteEntry,
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
						src={diaperIcon}
						alt="diaper icon"
					/>
				</div>
				<div className={classes['info-wrapper']}>
					<div className={classes.type}>
						<h3 className={classes.heading}>{type}</h3>
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
							sendBack({category: 'changing', type, day, time})
							setEntryId(id)
							toggle('changing')
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

export default ChangingCard
