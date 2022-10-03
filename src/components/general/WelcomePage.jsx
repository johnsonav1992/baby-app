import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { authActions } from '../../store/authSlice'
import classes from './WelcomePage.module.css'
import PurpleButton from '../UI/PurpleButton'

const WelcomePage = () => {
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const getStartedHandler = () => {
		dispatch(authActions.setRegister(true))
		navigate('/login')
	}

	return (
		<main className={classes['splash-main']}>
			<section className={classes['text-section']}>
				<h1 className={classes.heading}>Welcome to BabyBright</h1>
				<h3 className={classes.sub}>Baby tracking, made easy.</h3>
				<PurpleButton type={'button'} onClick={getStartedHandler}>
					Get Started
				</PurpleButton>
				<p className={classes['action-text']}>
					Already have an account?{' '}
					<button
						className={classes['action-link']}
						onClick={() => {
							dispatch(authActions.setRegister(false))
							navigate('/login')
						}}
					>
						Login here.
					</button>
				</p>
			</section>
		</main>
	)
}

export default WelcomePage
