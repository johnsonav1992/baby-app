import React from 'react'
import { useSelector } from 'react-redux'
import classes from './LogContainer.module.css'
import SleepCard from './SleepCard'
import { longDateCreator, shortDateCreator } from '../../helper-functions/helperFunctions'

const LogContainer = ({ selectedDate }) => {
	const sleeps = useSelector(state => state.child.sleeps)
	const feedings = useSelector(state => state.child.feedings)
	const changings = useSelector(state => state.child.changings)

	const combinedData = [...sleeps, ...feedings, ...changings]

	const filtered = combinedData.filter(entry => entry.day === selectedDate)
	console.log('filtered', filtered)
	const loadData = filtered.sort((a, b) => a.time - b.time)
	console.log('sorted', loadData)

	const logData = loadData.map(entry => {
		return (entry.category === 'sleep' ?
			<SleepCard
				key={entry.id}
				startTime={entry.start_time}
				endTime={entry.end_time}
				day={shortDateCreator(entry.day)}
				duration={entry.duration}
			></SleepCard>
		: <p>This is some other entry...</p>)
	})

	return (
		<section className={classes.container}>
			<p className={classes.date}>{longDateCreator(selectedDate)}</p>
			{logData.length > 0 ? (
				logData
			) : (
				<p className={classes['no-entries']}>
					There are no entries today!
				</p>
			)}
		</section>
	)
}

export default LogContainer
