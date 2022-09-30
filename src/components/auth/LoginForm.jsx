import React, { useState } from 'react'
import { Formik, Form, Field } from 'formik'
import BlueButton from '../UI/BlueButton'
import classes from './LoginForm.module.css'
import axios from 'axios'

const LoginForm = () => {
    const [error, setError] = useState('')

	const url = 'http://localhost:4000'

	const initialValues = {
		username: '',
		password: '',
	}

	const handleSubmit = async (values) => {
        try {
            const response = await axios.post(`${url}/register`, values)
            console.log(response.data)
        } catch (err) {
            console.log(err)
            setError(err.response.data)
        }
	}

	return (
		<div className={classes['outer-form-wrapper']}>
			<h1>Login</h1>

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
						<p className={classes.option}>No Account?</p>
						<button className={classes['action-btn']} type="button">
							Register here.
						</button>
					</div>
					<BlueButton type={'submit'}>Login</BlueButton>
				</Form>
			</Formik>
            <p>{error}</p>
		</div>
	)
}

export default LoginForm
