import React from 'react'
import classes from './RedDeleteButton.module.css'

const RedDeleteButton = ({ onClick }) => {
  return (
    <button className={classes.btn} onClick={onClick}>❌</button>
  )
}

export default RedDeleteButton