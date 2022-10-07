import React from 'react'
import { useSelector } from 'react-redux'
import classes from './LogContainer.module.css'
import SleepCard from './SleepCard'
import { longDateCreator, shortDateCreator } from '../../helper-functions/helperFunctions'

const LogContainer = ({ selectedDate }) => {
	const sleeps = useSelector(state => state.child.sleeps)

	const logData = sleeps.map(sleep => {
		return (
			<SleepCard
				startTime={sleep.start_time}
				endTime={sleep.end_time}
				day={shortDateCreator(sleep.day)}
				duration={sleep.duration}
			></SleepCard>
		)
	})

	return (
		<section className={classes.container}>
			<p className={classes.date}>{longDateCreator(selectedDate)}</p>
			{logData ? (
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
