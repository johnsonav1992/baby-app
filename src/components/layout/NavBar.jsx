import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import classes from './NavBar.module.css'

const NavBar = () => {
	const token = useSelector(state => state.auth.token)

	const styleActiveLink = ({ isActive }) =>
		isActive ? classes.active : classes.inactive

	return (
		<nav className={classes['main-nav']}>
			<ul className={classes['nav-list']}>
				{token && (
					<>
						<li className={classes['nav-item']}>
							<NavLink className={styleActiveLink} to="/dashboard">
								Dashboard
							</NavLink>
						</li>
						<li className={classes['nav-item']}>
							<NavLink className={styleActiveLink} to="/account">
								Account
							</NavLink>
						</li>
					</>
				)}
				<li className={classes['nav-item']}>
					<NavLink className={styleActiveLink} to="/login">
						Login
					</NavLink>
				</li>
			</ul>
		</nav>
	)
}

export default NavBar
