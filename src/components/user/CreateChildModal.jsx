import React from 'react'
import ReactDOM from 'react-dom'
import Card from '../UI/Card'
import BlueButton from '../UI/BlueButton'
import classes from './CreateChildModal.module.css'

const CreateChildModal = ({ add }) => {
	return ReactDOM.createPortal(
		<>
			<div className={classes.backdrop}>
			<Card addClass={'modal'}>
				<h1>Form Here</h1>
				<input type="text" />
				<p>More text</p>
				<BlueButton onClick={add}>Add</BlueButton>
			</Card>
			</div>
		</>,
		document.getElementById('modal')
	)
}

export default CreateChildModal
