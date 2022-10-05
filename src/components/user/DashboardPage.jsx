import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classes from './DashboardPage.module.css'
import axios from 'axios'

import { childActions } from '../../store/childSlice'
import SleepCard from './SleepCard'

let isInitial = true

const DashBoard = () => {
	const [children, setChildren] = useState([])
	const sleeps = useSelector(state => state.child.sleeps)
	const childId = useSelector(state => state.child.childId)
	const dispatch = useDispatch()
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)

	const url = 'http://localhost:4000'

	useEffect(() => {
		axios
			.get(`${url}/children/${userId}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				setChildren(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [token, userId])

	const childChangeHandler = e => {
		const selectedChild = e.target.value
		const child = children.filter(child => child.name === selectedChild)
		const id = child[0].id
		dispatch(childActions.setChildId(id))
		isInitial = false
	}

	const getSleeps = () => {
		axios
			.get(`${url}/sleeps/${childId}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				dispatch(childActions.setSleeps(data))
			})
	}

	useEffect(() => {
		if (isInitial) {
			return
		} else {
			axios
			.get(`${url}/sleeps/${childId}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				dispatch(childActions.setSleeps(data))
			})
		}
	}, [childId, dispatch, token])

	return (
		<main className={classes.main}>
			<select name="child" onChange={childChangeHandler}>
				<option value="Select a child" selected disabled>
					Select a child
				</option>
				{children.map(child => {
					return (
						<option key={child.id} id={child.id} value={child.name}>
							{child.name}
						</option>
					)
				})}
			</select>
			{sleeps.map(sleep => {
				return (
					<SleepCard
						key={sleep.id}
						startTime={sleep.start_time}
						endTime={sleep.end_time}
						day={sleep.day}
						duration={sleep.duration}
					/>
				)
			})}
		</main>
	)
}

export default DashBoard
