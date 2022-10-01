import React from 'react'
import classes from './Header.module.css'
import { Link } from 'react-router-dom'

import NavBar from './NavBar.jsx'
import logo from '../../assets/logo.svg'

const Header = () => {
	return (
		<header className={classes['main-header']}>
			<Link to="/">
				<div className={classes['title-wrapper']}>
					<div className={classes['image-wrapper']}>
						<img className={classes.img} src={logo} alt="bb-logo" />
					</div>
					<h1 className={classes['title']}>BabyBright</h1>
				</div>
			</Link>
			<NavBar />
		</header>
	)
}

export default Header
