import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import BlueButton from '../UI/BlueButton'
import classes from './LoginForm.module.css'
import axios from 'axios'

const LoginForm = () => {
	const [error, setError] = useState('')
	const [register, setRegister] = useState(false)

	const url = 'http://localhost:4000'

	const initialValues = {
		username: '',
		password: '',
	}

	const handleSubmit = async values => {
		try {
			const response = await axios.post(
				register ? `${url}/register` : `${url}/login`,
				values
			)
			console.log(response.data)
		} catch (err) {
			console.log(err)
			setError(err.response.data)
			setTimeout(() => {
				setError('')
			}, 2000)
		}
	}

	return (
		<div className={classes['outer-form-wrapper']}>
			<h1>{!register ? 'Login' : 'Register for an account'}</h1>

			<Formik
				initialValues={initialValues}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
				}}
			>
				<Form className={classes.form} action="">
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
							className={classes['action-btn']}
							type="button"
							onClick={() => setRegister(!register)}
						>
							{register ? 'Login here.' : 'Register here.'}
						</button>
					</div>
					<BlueButton type={'submit'}>
						{!register ? 'Login' : 'Register'}
					</BlueButton>
				</Form>
			</Formik>
			<p>{error}</p>
		</div>
	)
}

export default LoginForm
