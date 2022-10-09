import React from 'react'
import ReactDOM from 'react-dom'
import { Formik, Form, Field } from 'formik'
import Card from '../UI/Card'
import BlueButton from '../UI/BlueButton'
import classes from './CreateChildModal.module.css'

const CreateChildModal = ({ add }) => {
	const formInitialValues = {
		name: '',
		age: '',
		birthday: '',
		gender: '',
	}

	const handleSubmit = (values) => {
		console.log(values)
	}

	return ReactDOM.createPortal(
		<>
			<div className={classes.backdrop}>
				<Card addClass={'modal'}>
					<Formik
						initialValues={formInitialValues}
						onSubmit={(values, { resetForm }) => {
							handleSubmit(values)
							resetForm({ values: '' })
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
										type="text"
										name="birthday"
										className={classes.input}
									/>
								</fieldset>
							</div>
							<div className={classes.group}>
								<fieldset className={classes.fieldset}>
									<label htmlFor="gender">Gender</label>
									<Field
										type="text"
										name="gender"
										className={classes.input}
									/>
								</fieldset>
								<fieldset className={classes.fieldset}>
									<label htmlFor="age">Age</label>
									<Field
										type="text"
										name="age"
										className={classes.input}
									/>
								</fieldset>
							</div>
							<BlueButton onClick={add} addClass={'modal-btn'}>
								Add
							</BlueButton>
						</Form>
						)}
					</Formik>
				</Card>
			</div>
		</>,
		document.getElementById('modal')
	)
}

export default CreateChildModal
