import React from 'react'
import classes from './Error.module.css'

const Error = ({ children }) => {
  return (
    <p className={classes.error}>{children}</p>
  )
}

export default Error