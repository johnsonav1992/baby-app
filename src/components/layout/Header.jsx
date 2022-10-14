import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import NavBar from './NavBar.jsx'
import logo from '../../assets/logo.svg'
import classes from './Header.module.css'

const Header = () => {
	const token = useSelector(state => state.auth.token)

	return (
		<header className={classes['main-header']}>
			<Link to={token ? "/dashboard" : "/"}>
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
