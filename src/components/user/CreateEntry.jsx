import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import FormModal from '../general/FormModal'
import SleepEntry from './SleepEntry'
import FeedingEntry from './FeedingEntry'
import ChangingEntry from './ChangingEntry'
import { getChildData } from '../../store/childSlice'

const CreateEntry = ({ entry, toggle, status, entryId }) => {
	const token = useSelector(state => state.auth.token)
	const childId = useSelector(state => state.child.childId)

	const dispatch = useDispatch()

	const handleSubmit = (values, statMethod, id) => {
		const postURL =
			values.category === 'sleep'
				? `/sleeps/${childId}`
				: values.category === 'feeding'
				? `/feedings/${childId}`
				: `/changings/${childId}` 
		const putURL =
			values.category === 'sleep'
				? `/sleeps/${id}`
				: values.category === 'feeding'
				? `/feedings/${id}`
				: `/changings/${id}`
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
				/>
			) : entry === 'feeding' ? (
				<FeedingEntry
					toggle={toggle}
					status={status}
					handleSubmit={handleSubmit}
					id={entryId}
				/>
			) : (
				<ChangingEntry
					toggle={toggle}
					status={status}
					handleSubmit={handleSubmit}
					id={entryId}
				/>
			)}
		</FormModal>
	)
}

export default CreateEntry
