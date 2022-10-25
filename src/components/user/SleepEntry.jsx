import React, { useRef } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import BlueButton from '../UI/BlueButton'
import Error from '../UI/Error'
import { toMilliseconds } from '../../helper-functions/helperFunctions'
import classes from './Entry.module.css'

const SleepEntry = ({
	handleSubmit,
	toggle,
	status,
	id,
	editValues,
	handleRefresh,
}) => {
	const startRef = useRef(null)
	const sleepValid = Yup.object({
		day: Yup.date().required('Date required'),
		startTime: Yup.string().required('Start time required'),
		endTime: Yup.string().required('End time required'),
	})

	const validateEndTime = value => {
		const splitStart = startRef.current.value.split(':')
		const splitEnd = value.split(':')
		const numericStart = toMilliseconds(splitStart[0], splitStart[1], 0)
		const numericEnd = toMilliseconds(splitEnd[0], splitEnd[1], 0)

		let error

		if (numericStart >= numericEnd) {
			error = 'End time must be after start time!'
		}
		console.log({error})
		return error
	}

	return (
		<Formik
			initialValues={
				status === 'edit'
					? editValues
					: {
							category: 'sleep',
							day: '',
							startTime: '',
							endTime: '',
					  }
			}
			enableReinitialize
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
									innerRef={startRef}
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
									validate={validateEndTime}
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
						<BlueButton
							addClass={'modal-btn'}
							type={'submit'}
							onClick={handleRefresh}
						>
							{status === 'edit' ? 'Edit' : 'Add'}
						</BlueButton>
					</div>
				</Form>
			)}
		</Formik>
	)
}

export default SleepEntry
