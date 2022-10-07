import React from 'react'
import { useSelector } from 'react-redux'
import classes from './LogContainer.module.css'
import SleepCard from './SleepCard'

const LogContainer = ({ selectedDate }) => {
  const sleeps = useSelector(state => state.child.sleeps)

  const date = new Date(selectedDate.replace(/-/g, '\/')).toLocaleDateString('us-EN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

  return (
    <section className={classes.container}>
      <p className={classes.date}>{date}</p>
      {sleeps.map(sleep => {
        return <SleepCard></SleepCard>
      }
      )}
    </section>
  )
}

export default LogContainer