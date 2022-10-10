import React from 'react'
import ReactDOM from 'react-dom'

import Card from '../UI/Card'
import classes from './FormModal.module.css'

const FormModal = ({ children }) => {
	return ReactDOM.createPortal(
		<>
			<div className={classes.backdrop}>
				<Card addClass={'modal'}>{children}</Card>
			</div>
		</>,
		document.getElementById('modal')
	)
}

export default FormModal
