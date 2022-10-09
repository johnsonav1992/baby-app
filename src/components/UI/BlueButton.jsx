import React from 'react'
import classes from './BlueButton.module.css'

const BlueButton = ({ children, type, disabled, addClass, onClick }) => {
	return (
		<button
			className={
				disabled
					? `${classes.disabled} ${classes.btn}`
					: `${classes.btn} ${classes[addClass]}`
			}
			type={type}
			disabled={disabled}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default BlueButton
