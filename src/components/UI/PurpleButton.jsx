import React from 'react'
import classes from './PurpleButton.module.css'

const PurpleButton = ({children, type, onClick}) => {
  return (
    <button className={classes.btn} type={type} onClick={onClick} >{children}</button>
  )
}

export default PurpleButton