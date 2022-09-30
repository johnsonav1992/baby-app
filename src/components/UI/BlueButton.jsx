import React from 'react'
import classes from './BlueButton.module.css'

const BlueButton = ({children, type, disabled}) => {
  return (
    <button className={disabled ? `${classes.disabled} ${classes.btn}` : classes.btn} type={type} disabled={disabled}>{children}</button>
  )
}

export default BlueButton