import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import BlueButton from '../UI/BlueButton'
import Error from '../UI/Error'
import classes from './Entry.module.css'

const SleepEntry = ({ handleSubmit, toggle, status, id }) => {
	const sleepValid = Yup.object({
		day: Yup.date().required('Date required'),
		startTime: Yup.string().required('Start time required'),
		endTime: Yup.string().required('End time required'),
	})

	return (
		<Formik
			initialValues={{
				category: 'sleep',
				day: '',
				startTime: '',
				endTime: '',
			}}
			validationSchema={sleepValid}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values, status, id)
				resetForm({ values: '' })
				toggle()
			}}
		>
			{({ errors, touched }) => (
				<Form action="submit" className={classes.form}>
					<h1>{status === 'edit' ? 'Edit' : 'Add'} sleep entry</h1>
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
								<label htmlFor="startTime">Start Time</label>
								<Field
									type="time"
									name="startTime"
									className={`${classes.input} ${
										touched.startTime && errors.startTime
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage
									component={Error}
									name="startTime"
								/>
							</fieldset>
							<fieldset className={classes.fieldset}>
								<label htmlFor="endTime">End Time</label>
								<Field
									type="time"
									name="endTime"
									className={`${classes.input} ${
										touched.endTime && errors.endTime
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage
									component={Error}
									name="endTime"
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
	)
}

export default SleepEntry
