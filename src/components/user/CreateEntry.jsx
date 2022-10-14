import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'

import FormModal from '../general/FormModal'
import SleepEntry from './SleepEntry'
import FeedingEntry from './FeedingEntry'
import ChangingEntry from './ChangingEntry'
import { getChildData } from '../../store/childSlice'

const CreateEntry = ({ entry, toggle, status }) => {
	const token = useSelector(state => state.auth.token)
	const childId = useSelector(state => state.child.childId)

	const dispatch = useDispatch()

	const handleSubmit = (values, statMethod) => {
		axios.post(
				values.category === 'sleep'
					? `/sleeps/${childId}`
					: values.category === 'feeding'
					? `/feedings/${childId}`
					: `/changings/${childId}`,
				values,
				{
					method: statMethod === 'Add' ? 'post' : 'put',
					headers: {
						authorization: token,
					},
				}
			)
			.then(dispatch(getChildData(childId, token)))
	}

	return (
		<FormModal>
			{entry === 'sleep' ? (
				<SleepEntry toggle={toggle} status={status} handleSubmit={handleSubmit} />
			) : entry === 'feeding' ? (
				<FeedingEntry toggle={toggle} status={status} handleSubmit={handleSubmit} />
			) : (
				<ChangingEntry toggle={toggle} status={status} handleSubmit={handleSubmit} />
			)}
		</FormModal>
	)
}

export default CreateEntry
