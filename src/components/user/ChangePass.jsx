import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import FormModal from '../general/FormModal'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import BlueButton from '../UI/BlueButton'
import Error from '../UI/Error'
import classes from './ChangePass.module.css'

const ChangePass = ({ toggle }) => {
	const [error, setError] = useState('')
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)

	const validation = Yup.object({
		oldPassword: Yup.string().required('Required'),
		newPassword: Yup.string().required('Required'),
		newPasswordConfirm: Yup.string().required('Required')
	})

	const handleSubmit = values => {
		axios
			.post(
				`/api/users/password/${userId}`,
				{ oldPassword: values.oldPassword },
				{
					headers: {
						authorization: token,
					},
				}
			)
			.then(({ data }) => {
				if (data) {
					axios
						.put(
							`/api/users/password/${userId}`,
							{
								newPassword: values.newPassword,
								newPasswordConfirm: values.newPasswordConfirm,
							},
							{
								headers: {
									authorization: token,
								},
							}
						)
						.then(({ data }) => {
							toggle()
						})
						.catch(err => {
							setError(err.response.data)
							setTimeout(() => {
								setError('')
							}, 3000)
						})
				}
			})
			.catch(err => {
				setError(err.response.data)
				setTimeout(() => {
					setError('')
				}, 3000)
			})
	}

	return (
		<FormModal>
			<Formik
				initialValues={{
					oldPassword: '',
					newPassword: '',
					newPasswordConfirm: '',
				}}
				validationSchema={validation}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
				}}
			>
				{({ errors, touched }) => (
					<Form action="submit" className={classes.form}>
						<h1>Change Password</h1>
						<div className={classes['group-container']}>
							<fieldset className={classes.fieldset}>
								<label htmlFor="oldPassword">
									Old Password
								</label>
								<Field
									name="oldPassword"
									type="password"
									className={`${classes.input} ${
										touched.oldPassword &&
										errors.oldPassword
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage
									component={Error}
									name="oldPassword"
								/>
							</fieldset>
							<fieldset className={classes.fieldset}>
								<label htmlFor="newPassword">
									New Password
								</label>
								<Field
									name="newPassword"
									type="password"
									className={`${classes.input} ${
										touched.newPassword &&
										errors.newPassword
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage
									component={Error}
									name="newPassword"
								/>
							</fieldset>
							<fieldset className={classes.fieldset}>
								<label htmlFor="newPasswordConfirm">
									Confirm New Password
								</label>
								<Field
									name="newPasswordConfirm"
									type="password"
									className={`${classes.input} ${
										touched.newPasswordConfirm &&
										errors.newPasswordConfirm
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage
									component={Error}
									name="newPasswordConfirm"
								/>
							</fieldset>
						</div>
						<div className={classes['btn-container']}>
							<PurpleButtonSmall type={'button'} onClick={toggle}>
								Cancel
							</PurpleButtonSmall>
							<BlueButton addClass={'modal-btn'} type={'submit'}>
								Change
							</BlueButton>
						</div>
					</Form>
				)}
			</Formik>
			{error && <p className={classes.errortext}>{error}</p>}
		</FormModal>
	)
}

export default ChangePass
