import React from 'react'
import { Formik, Form, Field } from 'formik'

import FormModal from '../general/FormModal'
import BlueButton from '../UI/BlueButton'
import classes from './CreateChildModal.module.css'

const CreateChildModal = ({ add }) => {
	const formInitialValues = {
		name: '',
		age: '',
		birthday: '',
		gender: '',
	}

	const handleSubmit = values => {
		console.log(values)
	}

	return (
		<FormModal>
			<Formik
				initialValues={formInitialValues}
				onSubmit={(values, { resetForm }) => {
					handleSubmit(values)
					resetForm({ values: '' })
					add()
				}}
			>
				{() => (
					<Form action="submit" className={classes.form}>
						<h1>Add new child</h1>
						<div className={classes.group}>
							<fieldset className={classes.fieldset}>
								<label htmlFor="name">Name</label>
								<Field
									type="text"
									name="name"
									className={classes.input}
								/>
							</fieldset>
							<fieldset className={classes.fieldset}>
								<label htmlFor="birthday">Birthday</label>
								<Field
									type="date"
									name="birthday"
									className={classes.input}
								/>
							</fieldset>
						</div>
						<div className={classes.group}>
							<fieldset className={classes.fieldset}>
								<label htmlFor="gender">Gender</label>
								<Field
									as="select"
									name="gender"
									className={classes.input}
								>
									<option value="select" disabled selected>
										Select gender
									</option>
									<option value="male">Male</option>
									<option value="female">Female</option>
								</Field>
							</fieldset>
							<fieldset className={classes.fieldset}>
								<label htmlFor="age">Age</label>
								<Field
									type="number"
									name="age"
									min="1"
									max="13"
									className={classes.input}
								/>
							</fieldset>
						</div>
						<BlueButton addClass={'modal-btn'} type={'submit'}>
							Add
						</BlueButton>
					</Form>
				)}
			</Formik>
		</FormModal>
	)
}

export default CreateChildModal
