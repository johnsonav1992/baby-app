import React from 'react'
import Card from '../UI/Card'
import BlueButton from '../UI/BlueButton'
import classes from './CreateChildModal.module.css'


const CreateChildModal = ({ add }) => {
	return (
		<>
			<div className={classes.backdrop}></div>
			<Card addClass={'modal'}>
				<h1>Form Here</h1>
        <input type="text" />
        <p>More text</p>
        <BlueButton onClick={add}>Add</BlueButton>
			</Card>
		</>
	)
}

export default CreateChildModal
