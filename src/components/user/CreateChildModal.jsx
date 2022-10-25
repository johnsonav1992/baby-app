import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import FormModal from '../general/FormModal'
import Error from '../UI/Error'
import BlueButton from '../UI/BlueButton'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import { getChildren } from '../../store/childSlice'
import classes from './CreateChildModal.module.css'

const CreateChildModal = ({ toggle, handleRefresh }) => {
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)
	const dispatch = useDispatch()

	const formInitialValues = {
		name: '',
		age: '',
		birthday: '',
		gender: '',
	}

	const validationSchema = Yup.object({
		name: Yup.string()
			.max(100, 'Max of 100 characters.')
			.required('You must input a name.'),
		age: Yup.number()
			.max(13, 'Age must be less than 13.')
			.required('You must input an age'),
		birthday: Yup.date().required('You must input a birthday.'),
	})

	const handleSubmit = values => {
		console.log(values)
		const birthday = new Date(values.birthday)
		const age = Math.floor((Date.now() - birthday.getTime()) / 31556952000)
		axios
			.post(`/api/children/${userId}`,
				{ age: age, name: values.name, gender: values.gender },
				{
					headers: {
						authorization: token,
					},
				}
			)
			.then(dispatch(getChildren(userId, token)))
			.catch(err => console.log(err))
	}

	return (
		<FormModal>
			<Formik
				initialValues={formInitialValues}
				validationSchema={validationSchema}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
					toggle()
					handleRefresh()
				}}
			>
				{({ errors, touched }) => (
					<Form action="submit" className={classes.form}>
						<h1>Add new child</h1>
						<div className={classes['group-container']}>
							<div className={classes.group}>
								<fieldset className={classes.fieldset}>
									<label htmlFor="name">Name</label>
									<Field
										type="text"
										name="name"
										className={`${classes.input} ${
											touched.name && errors.name
												? classes.error
												: null
										}`}
									/>
									<ErrorMessage
										component={Error}
										name="name"
									/>
								</fieldset>
								<fieldset className={classes.fieldset}>
									<label htmlFor="gender">Gender</label>
									<Field
										as="select"
										name="gender"
										className={classes.input}
									>
										<option>Select gender</option>
										<option value="male">Male</option>
										<option value="female">Female</option>
									</Field>
								</fieldset>
							</div>
							<div className={classes.group}>
								<fieldset className={classes.fieldset}>
									<label htmlFor="birthday">Birthday</label>
									<Field
										type="date"
										name="birthday"
										className={`${classes.input} ${
											touched.birthday && errors.birthday
												? classes.error
												: null
										}`}
									/>
									<ErrorMessage
										component={Error}
										name="birthday"
									/>
								</fieldset>
								<fieldset className={classes.fieldset}>
									<label htmlFor="age">Age</label>
									<Field
										type="number"
										name="age"
										min="0"
										max="13"
										className={`${classes.input} ${
											touched.age && errors.age
												? classes.error
												: null
										}`}
									/>
									<ErrorMessage
										component={Error}
										name="age"
									/>
								</fieldset>
							</div>
						</div>
						<div className={classes['btn-container']}>
							<PurpleButtonSmall type={'button'} onClick={toggle}>
								Cancel
							</PurpleButtonSmall>
							<BlueButton addClass={'modal-btn'} type={'submit'}>
								Add
							</BlueButton>
						</div>
					</Form>
				)}
			</Formik>
		</FormModal>
	)
}

export default CreateChildModal
