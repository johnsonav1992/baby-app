import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import classes from './DashboardPage.module.css'
import { childActions, getChildren, getChildData } from '../../store/childSlice'
import DropDown from '../UI/Dropdown'
import BlueButton from '../UI/BlueButton'
import LogContainer from '../user/LogContainer'
import CreateChildModal from './CreateChildModal'
import DailySummary from './DailySummary'

let isInitial = true

const DashBoard = () => {
	const [showChildModal, setShowChildModal] = useState(false)
	const [currentFilter, setCurrentFilter] = useState(null)
	const [date, setDate] = useState(
		new Date(Date.now()).toISOString().split('T')[0]
	)
	const dispatch = useDispatch()

	const children = useSelector(state => state.child.children)
	const childId = useSelector(state => state.child.childId)
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)

	const childChangeHandler = e => {
		const selectedChild = e.target.value
		const child = children.filter(child => child.name === selectedChild)
		const id = child[0].id
		dispatch(childActions.setChildId(id))
		isInitial = false
	}

	const filterOptions = [
		{ id: 1, name: '', value: 'All' },
		{ id: 2, name: 'feeding', value: 'Feedings' },
		{ id: 3, name: 'sleep', value: 'Sleep' },
		{ id: 4, name: 'changing', value: 'Diapers' },
	]

	useEffect(() => {
		console.log('getting child data')
		dispatch(getChildren(userId, token))
	}, [token, userId, dispatch])

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
				<CreateChildModal
					toggle={() => setShowChildModal(!showChildModal)}
				></CreateChildModal>
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
								onChange={(e) => setCurrentFilter(e.target.value)}
								data={filterOptions}
								addClass={'small'}
							/>
							<input
								className={classes['date-picker']}
								type="date"
								name="date"
								id="date"
								value={date}
								onChange={e => setDate(e.target.value)}
							/>
						</div>
						<LogContainer selectedDate={date} filter={currentFilter}/>
					</div>
					<div className={classes["summary-container"]}>
					<DailySummary selectedDate={date} />
					</div>
				</section>
			</main>
		</>
	)
}

export default DashBoard
