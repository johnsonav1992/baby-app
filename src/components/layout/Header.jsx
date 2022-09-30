import React from 'react'
import classes from './Header.module.css'

import NavBar from './NavBar.jsx'

const Header = () => {
  return (
    <header className={classes['main-header']}>
        <div className={classes['title-wrapper']}>
            <h1 className={classes['title']}>BabyBright</h1>
        </div>
        <NavBar />
    </header>
  )
}

export default Header