import React from 'react'
import classes from './BlueButton.module.css'

const BlueButton = ({ children, type, disabled, addClass }) => {
	return (
		<button
			className={
				disabled
					? `${classes.disabled} ${classes.btn}`
					: `${classes.btn} ${classes[addClass]}`
			}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	)
}

export default BlueButton
