import React from 'react'
import classes from './PurpleButtonSmall.module.css'

const PurpleButtonSmall = ({ children, type, onClick, addClass }) => {
	return (
		<button className={`${classes.btn} ${classes[addClass]}`} type={type} onClick={onClick}>
			{children}
		</button>
	)
}

export default PurpleButtonSmall
