import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import classes from './NavBar.module.css'

const NavBar = () => {
    const styleActiveLink = ({ isActive }) => (isActive ? classes.active : classes.inactive)

	return (
		<nav className={classes['main-nav']}>
			<ul className={classes['nav-list']}>
                <li className={classes['nav-item']}><NavLink className={styleActiveLink} to="/account">Account</NavLink></li>
                <li className={classes['nav-item']}><NavLink className={styleActiveLink} to="/login">Login</NavLink></li>
            </ul>
		</nav>
	)
}

export default NavBar
