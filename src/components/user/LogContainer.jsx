import React from 'react'
import classes from './LogContainer.module.css'
import SleepCard from './SleepCard'

const LogContainer = () => {
  return (
    <section className={classes.container}>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
      <SleepCard></SleepCard>
    </section>
  )
}

export default LogContainer