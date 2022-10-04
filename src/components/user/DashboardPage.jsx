import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import classes from './DashboardPage.module.css'
import axios from 'axios'

import SleepCard from './SleepCard'

const DashBoard = () => {
	const [children, setChildren] = useState([])
	const [sleeps, setSleeps] = useState([])
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)
	const childId = useRef()

	const url = 'http://localhost:4000'

	useEffect(() => {
		axios
			.get(`${url}/children/${userId}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				console.log(data)
				setChildren(data)
			})
			.catch(err => {
				console.log(err)
			})
	}, [token, userId])

	const getSleeps = () => {
		axios
			.get(`${url}/sleeps/${1}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				console.log(data)
				setSleeps(data)
			})
	}

	// console.log(childId.current.id || null)

	return (
		<main className={classes.main}>
			<select name="child" onChange={() => getSleeps()}>
				<option value="Select a child" selected disabled>
					Select a child
				</option>
				{children.map(child => {
					return (
						<option
							key={child.id}
							id={child.id}
							value={child.name}
							ref={childId}
						>
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
