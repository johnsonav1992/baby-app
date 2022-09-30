import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

import classes from './NavBar.module.css'

const NavBar = () => {
	return (
		<nav className={classes['main-nav']}>
			<ul className={classes['nav-list']}>
                <li className={classes['nav-item']}><NavLink to="/account">Account</NavLink></li>
                <li className={classes['nav-item']}><NavLink to="/login">Login</NavLink></li>
            </ul>
		</nav>
	)
}

export default NavBar
