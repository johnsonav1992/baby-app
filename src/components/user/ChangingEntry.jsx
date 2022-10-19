import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import BlueButton from '../UI/BlueButton'
import Error from '../UI/Error'
import classes from './Entry.module.css'

const ChangingEntry = ({ handleSubmit, toggle, status, id, editValues }) => {
	const changingValid = Yup.object({
		day: Yup.date().required('Date required'),
		time: Yup.string().required('Time required'),
		type: Yup.string().required('Type required'),
	})

	return (
		<Formik
			initialValues={status === 'edit' ? editValues : {
				category: 'changing',
				type: '',
				day: '',
				time: '',
			}}
			enableReinitialize
			validationSchema={changingValid}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values, status, id)
				resetForm({ values: '' })
				toggle()
			}}
		>
			{({ errors, touched }) => (
				<Form action="submit" className={classes.form}>
					<h1>{status === 'edit' ? 'Edit' : 'Add'} diaper change</h1>
					<div className={classes['group-container']}>
						<fieldset className={classes.fieldset}>
							<label htmlFor="day">Day</label>
							<Field
								type="date"
								name="day"
								className={`${classes.input} ${
									touched.day && errors.day
										? classes.error
										: null
								}`}
							/>
							<ErrorMessage component={Error} name="day" />
						</fieldset>
						<div className={classes.group}>
							<fieldset className={classes.fieldset}>
								<label htmlFor="time">Time</label>
								<Field
									type="time"
									name="time"
									className={`${classes.input} ${
										touched.time && errors.time
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage component={Error} name="time" />
							</fieldset>
							<fieldset className={classes.fieldset}>
								<label htmlFor="type">Type</label>
								<Field
									as="select"
									name="type"
									className={`${classes.input} ${
										touched.type && errors.type
											? classes.error
											: null
									}`}
								>
									<option value="select type">
										Select Type
									</option>
									<option value="Wet">Wet</option>
									<option value="Dirty">Dirty</option>
									<option value="Dirty/Wet">Dirty/Wet</option>
								</Field>
								<ErrorMessage component={Error} name="type" />
							</fieldset>
						</div>
					</div>
					<div className={classes['btn-container']}>
						<PurpleButtonSmall type={'button'} onClick={toggle}>
							Cancel
						</PurpleButtonSmall>
						<BlueButton addClass={'modal-btn'} type={'submit'}>
							{status === 'edit' ? 'Edit' : 'Add'}
						</BlueButton>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default ChangingEntry
