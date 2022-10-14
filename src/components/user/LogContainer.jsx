import React from 'react'
import axios from 'axios'
import { useSelector, useDispatch } from 'react-redux'
import classes from './LogContainer.module.css'
import SleepCard from './SleepCard'
import FeedingCard from './FeedingCard'
import ChangingCard from './ChangingCard'
import {
	longDateCreator,
	shortDateCreator,
	timestringToNumeric,
} from '../../helper-functions/helperFunctions'
import { getChildData } from '../../store/childSlice'

const LogContainer = ({ selectedDate, filter, status, toggle, setEntryId }) => {
	const dispatch = useDispatch()
	const childId = useSelector(state => state.child.childId)
	const token = useSelector(state => state.auth.token)

	const sleeps = useSelector(state => state.child.sleeps)
	const feedings = useSelector(state => state.child.feedings)
	const changings = useSelector(state => state.child.changings)

	const combinedData = [...sleeps, ...feedings, ...changings]
	const filtered = combinedData.filter(entry =>
		filter
			? entry.category === filter.toLowerCase() &&
			  entry.day === selectedDate
			: entry.day === selectedDate
	)
	const loadData = filtered.sort(
		(a, b) => timestringToNumeric(a.time) - timestringToNumeric(b.time)
	)

	const deleteEntry = (entryId, entryType) => {
		axios
			.delete(`/${entryType}s/${entryId}`, {
				headers: {
					authorization: token,
				},
			})
			.then(() => {
				dispatch(getChildData(childId, token, selectedDate))
			})
			.catch(err => {
				console.log(err)
			})
	}

	const logData = loadData.map(entry => {
		return entry.category === 'sleep' ? (
			<SleepCard
				key={entry.category + entry.id}
				id={entry.id}
				entryType={entry.category}
				startTime={entry.start_time}
				endTime={entry.end_time}
				day={shortDateCreator(entry.day)}
				duration={entry.duration}
				deleteEntry={deleteEntry}
				status={status}
				toggle={toggle}
				setEntryId={setEntryId}
			></SleepCard>
		) : entry.category === 'feeding' ? (
			<FeedingCard
				key={entry.category + entry.id}
				id={entry.id}
				entryType={entry.category}
				type={entry.feed_type}
				food={entry.food}
				amount={entry.amount}
				day={shortDateCreator(entry.day)}
				time={entry.time}
				deleteEntry={deleteEntry}
				status={status}
				toggle={() => toggle('feeding')}
			/>
		) : (
			<ChangingCard
				key={entry.category + entry.id}
				id={entry.id}
				entryType={entry.category}
				type={entry.type}
				day={shortDateCreator(entry.day)}
				time={entry.time}
				deleteEntry={deleteEntry}
				status={status}
				toggle={() => toggle('changing')}
			/>
		)
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
