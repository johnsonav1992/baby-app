import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'

import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import { authActions } from '../../store/authSlice'
import classes from './NavBar.module.css'

const NavBar = () => {
	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()
	const navigate = useNavigate()

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
						<NavLink
							className={styleActiveLink}
							to="/login"
							onClick={() =>
								dispatch(authActions.setRegister(false))
							}
						>
							Login or Register
						</NavLink>
					</li>
				) : (
					<PurpleButtonSmall
						type={'button'}
						onClick={() => {
							dispatch(authActions.logout())
							navigate('/login')
						}}
					>
						Logout
					</PurpleButtonSmall>
				)}
			</ul>
		</nav>
	)
}

export default NavBar
