import React from 'react'
import { useSelector } from 'react-redux'
import classes from './LogContainer.module.css'
import SleepCard from './SleepCard'
import { dateStringify } from '../../helper-functions/helperFunctions'

const LogContainer = ({ selectedDate }) => {
	const sleeps = useSelector(state => state.child.sleeps)

	const allSleeps = sleeps.map(sleep => {
		return (
			<SleepCard
				startTime={sleep.start_time}
				endTime={sleep.end_time}
				day={sleep.day}
				duration={sleep.duration}
			></SleepCard>
		)
	})

	return (
		<section className={classes.container}>
			<p className={classes.date}>{dateStringify(selectedDate)}</p>
      {allSleeps}
		</section>
	)
}

export default LogContainer
