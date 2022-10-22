import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

import FormModal from '../general/FormModal'
import BlueButton from '../UI/BlueButton'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import RedButton from '../UI/RedButton'
import DropDown from '../UI/Dropdown'
import classes from './ChildEdit.module.css'

const ChildEdit = ({ toggle, sentInitValues, validSchema }) => {
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)

	const dispatch = useDispatch()

	const handleSubmit = () => {}

	return (
		<FormModal>
      <h1>Select Child to Edit</h1>
      {/* <DropDown></DropDown> */}
			<Formik
				initialValues={sentInitValues}
				validationSchema={validSchema}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
					toggle()
				}}
			>
				{({ errors, touched }) => (
					<Form action="submit" className={classes.form}>
						<h1>Edit child</h1>
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
						<BlueButton addClass={'modal-btn'} type={'submit'}>
							Add
						</BlueButton>
						<RedButton>Delete Child</RedButton>
						<div className={classes['btn-container']}>
							<PurpleButtonSmall type={'button'} onClick={toggle}>
								Cancel
							</PurpleButtonSmall>
						</div>
					</Form>
				)}
			</Formik>
		</FormModal>
	)
}

export default ChildEdit
