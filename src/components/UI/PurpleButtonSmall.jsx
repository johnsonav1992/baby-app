import React from 'react'
import classes from './PurpleButtonSmall.module.css'

const PurpleButtonSmall = ({ children, type, onClick }) => {
	return (
		<button className={classes.btn} type={type} onClick={onClick}>
			{children}
		</button>
	)
}

export default PurpleButtonSmall
