import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import classes from './DashboardPage.module.css'
import { childActions, getChildData } from '../../store/childSlice'
import DropDown from '../UI/Dropdown'
import BlueButton from '../UI/BlueButton'
import LogContainer from '../user/LogContainer'
import CreateChildModal from './CreateChildModal'
import DailySummary from './DailySummary'

let isInitial = true

const DashBoard = () => {
	const [children, setChildren] = useState([])
	const [showChildModal, setShowChildModal] = useState(false)
	const [date, setDate] = useState(
		new Date(Date.now()).toISOString().split('T')[0]
	)
	const dispatch = useDispatch()

	const childId = useSelector(state => state.child.childId)
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)

	const url = 'http://localhost:4000'

	useEffect(() => {
		console.log('getting child data')
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
	}, [token, userId, showChildModal])

	const childChangeHandler = e => {
		const selectedChild = e.target.value
		const child = children.filter(child => child.name === selectedChild)
		const id = child[0].id
		dispatch(childActions.setChildId(id))
		isInitial = false
	}

	const filterChangeHandler = () => {
		console.log('filter')
	}

	const dateChangeHandler = e => {
		setDate(e.target.value)
	}

	const toggleModal = () => {
		setShowChildModal(!showChildModal)
	}

	const filterOptions = [
		{ id: 1, name: 'Feedings' },
		{ id: 2, name: 'Sleep' },
		{ id: 3, name: 'Diapers' },
	]

	useEffect(() => {
		if (isInitial) {
			return
		} else {
			dispatch(getChildData(childId, token, date))
		}
	}, [childId, token, date, dispatch])

	return (
		<>
			{showChildModal && (
				<CreateChildModal toggle={toggleModal}></CreateChildModal>
			)}
			<main className={classes.main}>
				<section className={classes.top}>
					<div className={classes['child-select']}>
						<h1>Dashboard</h1>
						<DropDown
							name={'child'}
							value={'select child'}
							onChange={childChangeHandler}
							data={children}
						/>
					</div>
					<div className={classes['btn-container']}>
						<BlueButton
							type={'button'}
							addClass={'small'}
							disabled={false}
							onClick={() => setShowChildModal(!showChildModal)}
						>
							Add Child
						</BlueButton>
					</div>
				</section>
				<section className={classes.bottom}>
					<div className={classes['log-container']}>
						<div className={classes['log-title-container']}>
							<h2>Log</h2>
							<DropDown
								name={'filter'}
								value={'filter'}
								onChange={filterChangeHandler}
								data={filterOptions}
								addClass={'small'}
							/>
							<input
								className={classes['date-picker']}
								type="date"
								name="date"
								id="date"
								value={date}
								onChange={dateChangeHandler}
							/>
						</div>
						<LogContainer selectedDate={date} />
					</div>
					<DailySummary />
				</section>
			</main>
		</>
	)
}

export default DashBoard
