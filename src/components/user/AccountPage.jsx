import React from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

import BlueButton from '../UI/BlueButton'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import RedButton from '../UI/RedButton'
import classes from './AccountPage.module.css'

const AccountPage = () => {
	const userId = useSelector(state => state.auth.userId)
	const userName = useSelector(state => state.auth.userName)

	const handleSubmit = values => {
		let { firstName, lastName, username } = values

		if (username == null) {
			username = userName
		}
		axios.put(`/users/${userId}`, {
			firstName,
			lastName,
			username
		})
		.then(({data}) => console.log(data))
		.catch(err => console.log(err))
	}

	return (
		<main className={classes['account-main']}>
			<h1>Account</h1>
			<p>
				Fill out your profile details below to change information about
				your account
			</p>
			<Formik
				initialValues={{
					firstName: '',
					lastName: '',
					username: null
				}}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
				}}
			>
				{() => (
					<Form action="submit" className={classes.form}>
						<div className={classes.group}>
							<fieldset>
								<label htmlFor="firstName">First name</label>
								<Field
									name="firstName"
									className={classes.input}
									placeholder="First"
								/>
							</fieldset>
							<fieldset>
								<label htmlFor="lastName">Last name</label>
								<Field
									name="lastName"
									className={classes.input}
									placeholder="Last"
								/>
							</fieldset>
						</div>
						<div className={classes.group}>
							<fieldset>
								<label htmlFor="username">Username</label>
								<Field
									name="username"
									className={classes.input}
									placeholder="New username"
								/>
							</fieldset>
							<div className={classes['btn-wrapper']}>
								<BlueButton type={'submit'}>Save</BlueButton>
							</div>
						</div>
					</Form>
				)}
			</Formik>
			<div className={classes['btn-container']}>
				<div className={classes['edit-buttons']}>
					<BlueButton>Edit Children</BlueButton>
					<PurpleButtonSmall addClass={'change-pw'}>
						Change Password
					</PurpleButtonSmall>
				</div>
				<div className={classes['delete']}>
					<RedButton addClass={'small'}>Delete Account</RedButton>
				</div>
			</div>
		</main>
	)
}

export default AccountPage
