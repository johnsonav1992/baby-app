import React from 'react'
import classes from './Header.module.css'

import NavBar from './NavBar.jsx'
import logo from '../../assets/logo.svg'

const Header = () => {
	return (
		<header className={classes['main-header']}>
			<div className={classes['title-wrapper']}>
				<div className={classes['image-wrapper']}>
					<img src={logo} alt="bb-logo" className="logo" />
				</div>
				<h1 className={classes['title']}>BabyBright</h1>
			</div>
			<NavBar />
		</header>
	)
}

export default Header
