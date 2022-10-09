import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'

import BlueButton from '../UI/BlueButton'
import classes from './LoginForm.module.css'
import { authActions } from '../../store/authSlice'

import axios from 'axios'

const LoginForm = () => {
	const [error, setError] = useState('')
	const register = useSelector(state => state.auth.isRegister)
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const url = 'http://localhost:4000'

	const formInitialValues = {
		username: '',
		password: '',
	}

	const handleSubmit = async values => {
		try {
			const response = await axios.post(
				register ? `${url}/register` : `${url}/login`,
				values
			)
			const data = response.data
			dispatch(
				authActions.login({
					token: data.token,
					sessionExp: data.expirationTime,
					userId: data.userId
				})
			)
			navigate('/dashboard')
		} catch (err) {
			console.log(err)
			setError(err.response.data)
			if (register) {
				setTimeout(() => {
					setError('')
				}, 8000)
			} else {
				setTimeout(() => {
					setError('')
				}, 2000)
			}
		}
	}

	return (
		<div className={classes['outer-form-wrapper']}>
			<h1>{!register ? 'Login' : 'Register for an account'}</h1>

			<Formik
				initialValues={formInitialValues}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
				}}
			>
				{({ isSubmitting, dirty }) => (
					<Form className={classes.form}>
						<div className={classes['inner-form-wrapper']}>
							<label className={classes.label} htmlFor="username">
								Username
							</label>
							<Field
								className={classes.input}
								name="username"
								placeholder="Email or username"
							/>
							<label className={classes.label} htmlFor="password">
								Password
							</label>
							<Field
								className={classes.input}
								type="password"
								name="password"
								placeholder="Password"
							/>
						</div>
						<div className={classes['switch-option-wrapper']}>
							<p className={classes.option}>
								{register ? 'Need to log in?' : 'No Account?'}
							</p>
							<button
								className={classes['action-link']}
								type="button"
								onClick={() => dispatch(authActions.toggleRegister())}
							>
								{register ? 'Login here.' : 'Register here.'}
							</button>
						</div>
						<BlueButton
							loading={isSubmitting}
							disabled={!dirty}
							type={'submit'}
						>
							{!register ? 'Login' : 'Register'}
						</BlueButton>
					</Form>
				)}
			</Formik>
			<p className={classes.error}>{error}</p>
		</div>
	)
}

export default LoginForm
