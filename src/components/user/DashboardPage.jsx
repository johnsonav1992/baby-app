import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import classes from './DashboardPage.module.css'
import axios from 'axios'

import { childActions, getChildData } from '../../store/childSlice'
import SleepCard from './SleepCard'
import DropDown from '../UI/Dropdown'
import BlueButton from '../UI/BlueButton'

let isInitial = true

const DashBoard = () => {
	const [children, setChildren] = useState([])
	const dispatch = useDispatch()

	const sleeps = useSelector(state => state.child.sleeps)
	const feedings = useSelector(state => state.child.feedings)
	const changings = useSelector(state => state.child.changings)
	const childId = useSelector(state => state.child.childId)

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

	useEffect(() => {
		if (isInitial) {
			return
		} else {
			dispatch(getChildData(childId, token))
		}
	}, [childId, token, dispatch])

	return (
		<main className={classes.main}>
			<section className={classes.top}>
				<div className={classes['child-select']}>
					<h1>Dashboard</h1>
					<DropDown
						name={'child'}
						value={'Select a child'}
						onChange={childChangeHandler}
						data={children}
					/>
				</div>
				<div className={classes['btn-container']}>
					<BlueButton type={'button'} addClass={'small'} disabled={false}>Add Child</BlueButton>
				</div>
			</section>
			<section className={classes.bottom}></section>
		</main>
	)
}

export default DashBoard
