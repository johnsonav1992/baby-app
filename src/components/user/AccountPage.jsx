import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import BlueButton from '../UI/BlueButton'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import RedButton from '../UI/RedButton'
import Error from '../UI/Error'
import ChangePass from '../user/ChangePass'
import DeleteUser from './DeleteUser'
import classes from './AccountPage.module.css'

const AccountPage = () => {
	const [error, setError] = useState('')
	const [showPWModal, setShowPWModal] = useState(false)
	const [showDeleteModal, setShowDeleteModal] = useState(false)
	const userId = useSelector(state => state.auth.userId)
	const userName = useSelector(state => state.auth.userName)
	const token = useSelector(state => state.auth.token)

	const handleSubmit = values => {
		let { firstName, lastName, username } = values

		if (username == null) {
			username = userName
		}
		axios.put(`/api/users/${userId}`, {
			firstName,
			lastName,
			username
		}, {
		headers: {
			authorization: token,
		}})
		.then(({data}) => console.log(data))
		.catch(err => {
			console.log(err)
			setError(err.response.data)
			setTimeout(() => {
				setError('')
			}, 2000)
		})
	}

	const validation = Yup.object({
		firstName: Yup.string().required('Required'),
		lastName: Yup.string().required('Required'),
	})

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
				validationSchema={validation}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
				}}
			>
				{({ errors, touched }) => (
					<Form action="submit" className={classes.form}>
						<div className={classes.group}>
							<fieldset>
								<label htmlFor="firstName">First name</label>
								<Field
									name="firstName"
									className={`${classes.input} ${
										touched.firstName && errors.firstName
											? classes.error
											: null
									}`}
									placeholder="First"
								/>
								<ErrorMessage component={Error} name="firstName" />
							</fieldset>
							<fieldset>
								<label htmlFor="lastName">Last name</label>
								<Field
									name="lastName"
									className={`${classes.input} ${
										touched.lastName && errors.lastName
											? classes.error
											: null
									}`}
									placeholder="Last"
								/>
								<ErrorMessage component={Error} name="lastName" />
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
								{error !== '' && <Error>{error}</Error>}
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
					<PurpleButtonSmall addClass={'change-pw'} onClick={() => setShowPWModal(!showPWModal)}>
						Change Password
					</PurpleButtonSmall>
					{showPWModal && <ChangePass toggle={() => setShowPWModal(!showPWModal)} />}
				</div>
				<div className={classes['delete']}>
					<RedButton addClass={'small'} onClick={() => setShowDeleteModal(!showDeleteModal)}>Delete Account</RedButton>
					{showDeleteModal && <DeleteUser toggle={() => setShowDeleteModal(!showDeleteModal)} />}
				</div>
			</div>
		</main>
	)
}

export default AccountPage
