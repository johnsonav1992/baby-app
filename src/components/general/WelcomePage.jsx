import React from 'react'
import { useNavigate } from 'react-router-dom'

import classes from './WelcomePage.module.css'
import PurpleButton from '../UI/PurpleButton'

const WelcomePage = () => {
	const navigate = useNavigate()

	const getStartedHandler = () => {
		console.log('get started')
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
						onClick={() => navigate('/login')}
					>
						Login here.
					</button>
				</p>
			</section>
		</main>
	)
}

export default WelcomePage
