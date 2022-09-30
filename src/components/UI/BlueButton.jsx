import React from 'react'
import classes from './BlueButton.module.css'

const BlueButton = ({children, type}) => {
  return (
    <button className={classes.btn} type={type}>{children}</button>
  )
}

export default BlueButton