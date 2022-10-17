import React from 'react'
import classes from './RedButton.module.css'

const RedButton = ({ children, type, addClass, onClick }) => {
	return (
		<button
			className={`${classes.btn} ${classes[addClass]}`
			}
			type={type}
			onClick={onClick}
		>
			{children}
		</button>
	)
}

export default RedButton