import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import DropDown from '../UI/Dropdown'
import BlueButton from '../UI/BlueButton'
import LogContainer from '../user/LogContainer'
import CreateChildModal from './CreateChildModal'
import DailySummary from './DailySummary'
import CreateEntry from './CreateEntry'
import { childActions, getChildren, getChildData } from '../../store/childSlice'
import classes from './DashboardPage.module.css'

let isInitial = true

const DashBoard = () => {
	const [showChildModal, setShowChildModal] = useState(false)
	const [showEntryModal, setShowEntryModal] = useState(false)
	const [entryId, setEntryId] = useState('')
	const [entryType, setEntryType] = useState('')
	const [status, setStatus] = useState('Add')
	const [currentFilter, setCurrentFilter] = useState(null)

	const tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
	const [date, setDate] = useState(
		(new Date(Date.now() - tzoffset)).toISOString().split('T')[0]
	)

	const children = useSelector(state => state.child.children)
	const childId = useSelector(state => state.child.childId)
	const childName = useSelector(state => state.child.childName)
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()

	const childChangeHandler = e => {
		const selectedChild = e.target.value
		const child = children.filter(child => child.name === selectedChild)
		const id = child[0].id
		dispatch(childActions.setChildId(id))
		dispatch(childActions.setChildName(child[0].name))
		isInitial = false
	}

	const entryHandler = entryType => {
		setEntryType(entryType)
		setShowEntryModal(!showEntryModal)
	}

	const filterOptions = [
		{ id: 1, name: '', value: 'All' },
		{ id: 2, name: 'feeding', value: 'Feedings' },
		{ id: 3, name: 'sleep', value: 'Sleep' },
		{ id: 4, name: 'changing', value: 'Diapers' },
	]

	useEffect(() => {
		dispatch(getChildren(userId, token))
	}, [token, userId, dispatch])

	useEffect(() => {
		if (isInitial) {
			return
		} else {
			dispatch(getChildData(childId, token, date))
		}
	}, [childId, token, date, dispatch, showEntryModal])

	return (
		<>
			{showChildModal && (
				<CreateChildModal
					toggle={() => setShowChildModal(!showChildModal)}
				></CreateChildModal>
			)}
			{showEntryModal && (
				<CreateEntry
					entry={entryType}
					toggle={() => setShowEntryModal(!showEntryModal)}
					status={status}
					entryId={entryId}
				/>
			)}
			<main className={classes.main}>
				<section className={classes.top}>
					<div className={classes['child-select']}>
						<h1>Dashboard</h1>
						<div className={classes['child-container']}>
							<h2>Child</h2>
							<DropDown
								name={'child'}
								value={childName ? childName : 'select child'}
								onChange={childChangeHandler}
								data={children}
							/>
						</div>
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
								onChange={e => setCurrentFilter(e.target.value)}
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
						<LogContainer
							selectedDate={date}
							filter={currentFilter}
							status={setStatus}
							toggle={entryHandler}
							setEntryId={setEntryId}
						/>
					</div>
					<div className={classes['summary-container']}>
						<DailySummary
							selectedDate={date}
							toggle={entryHandler}
							setStatus={setStatus}
						/>
					</div>
				</section>
			</main>
		</>
	)
}

export default DashBoard
