import React from 'react'
import FormModal from '../general/FormModal'
import classes from './CreateEntry.module.css'

const CreateEntry = ({ entry, toggle }) => {

  const sleepEntry = <div><p>sleep</p><button onClick={toggle}>Cancel</button></div>
  const feedingEntry = 'feeding'
  const changingEntry = 'changing'

	return (
		<FormModal>
			{entry === 'sleep'
				? sleepEntry 
				: entry === 'feeding'
				? feedingEntry
				: changingEntry}
		</FormModal>
	)
}

export default CreateEntry
