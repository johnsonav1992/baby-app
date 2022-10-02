import React from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import classes from './NavBar.module.css'
import { authActions } from '../../store/authSlice'

const NavBar = () => {
	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()

	const styleActiveLink = ({ isActive }) => 
		isActive ? classes.active : classes.inactive

	return (
		<nav className={classes['main-nav']}>
			<ul className={classes['nav-list']}>
				{token && (
					<>
						<li className={classes['nav-item']}>
							<NavLink
								className={styleActiveLink}
								to="/dashboard"
							>
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
				{!token ? (
					<li className={classes['nav-item']}>
						<NavLink className={styleActiveLink} to="/login">
							Login or Register
						</NavLink>
					</li>
				) : (
					<NavLink
						className={styleActiveLink}
						onClick={() => dispatch(authActions.logout())}
						to="/login"
					>
						Logout
					</NavLink>
				)}
			</ul>
		</nav>
	)
}

export default NavBar
