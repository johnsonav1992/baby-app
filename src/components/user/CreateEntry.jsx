import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import FormModal from '../general/FormModal'
import SleepEntry from './SleepEntry'
import FeedingEntry from './FeedingEntry'
import ChangingEntry from './ChangingEntry'
import { getChildData } from '../../store/childSlice'

const CreateEntry = ({ entry, toggle, status, entryId, editValues, handleRefresh }) => {
	const token = useSelector(state => state.auth.token)
	const childId = useSelector(state => state.child.childId)

	const dispatch = useDispatch()

	const handleSubmit = (values, statMethod, id) => {
		const postURL =
			values.category === 'sleep'
				? `/api/sleeps/${childId}`
				: values.category === 'feeding'
				? `/api/feedings/${childId}`
				: `/api/changings/${childId}` 
		const putURL =
			values.category === 'sleep'
				? `/api/sleeps/${id}`
				: values.category === 'feeding'
				? `/api/feedings/${id}`
				: `/api/changings/${id}`
		axios({
			method: statMethod === 'Add' ? 'post' : 'put',
			url: statMethod === 'Add' ? postURL : putURL,
			headers: {
				authorization: token,
			},
			data: values,
		}).then(dispatch(getChildData(childId, token)))
	}

	return (
		<FormModal>
			{entry === 'sleep' ? (
				<SleepEntry
					toggle={toggle}
					status={status}
					handleSubmit={handleSubmit}
					id={entryId}
					editValues={editValues}
					handleRefresh={handleRefresh}
				/>
			) : entry === 'feeding' ? (
				<FeedingEntry
					toggle={toggle}
					status={status}
					handleSubmit={handleSubmit}
					id={entryId}
					editValues={editValues}
					handleRefresh={handleRefresh}
				/>
			) : (
				<ChangingEntry
					toggle={toggle}
					status={status}
					handleSubmit={handleSubmit}
					id={entryId}
					editValues={editValues}
					handleRefresh={handleRefresh}
				/>
			)}
		</FormModal>
	)
}

export default CreateEntry
