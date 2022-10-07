import React from 'react'
import plus from '../../assets/plus.svg'
import classes from './PlusButton.module.css'

const PlusButton = ({ color, onClick }) => {
  color = 'orange'

  return (
    <button className={`${classes.btn} ${classes[color]}`} onClick={onClick}>
      <img className={classes.plus} src={plus} alt="plus" />
    </button>
  )
}

export default PlusButton