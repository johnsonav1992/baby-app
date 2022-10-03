import React from 'react'
import classes from './WelcomePage.module.css'
import PurpleButton from '../UI/PurpleButton'

const WelcomePage = () => {

  const getStartedHandler = () => {
    console.log('get started')
  }

  return (
    <main className={classes['splash-main']}>
      <section className={classes['text-section']}>
        <h1></h1>
        <h3></h3>
        <PurpleButton type={'button'} onClick={getStartedHandler}>Get Started</PurpleButton>
        <p></p>
      </section>
    </main>
  )
}

export default WelcomePage