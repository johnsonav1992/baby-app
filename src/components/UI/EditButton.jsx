import React from 'react'
import classes from './EditButton.module.css'

const EditButton = ({ onClick }) => {
	return (
		<button className={classes.btn} onClick={onClick}>
			edit
		</button>
	)
}

export default EditButton
