import React from 'react'
import classes from './Card.module.css'

const Card = ({children, addClass}) => {
  return (
    <div className={`${classes.card} ${classes[addClass]}`}>{children}</div>
  )
}

export default Card