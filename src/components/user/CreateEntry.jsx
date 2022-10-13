import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import FormModal from '../general/FormModal'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import BlueButton from '../UI/BlueButton'
import Error from '../UI/Error'
import classes from './CreateEntry.module.css'
import { getChildData } from '../../store/childSlice'

const CreateEntry = ({ entry, toggle, selectedDate }) => {
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)
	const childId = useSelector(state => state.child.childId)

	const dispatch = useDispatch()

	const sleepValid = Yup.object({
		day: Yup.date().required('Date required'),
		startTime: Yup.string().required('Start time required'),
		endTime: Yup.string().required('End time required'),
	})

	const feedingValid = Yup.object({
		day: Yup.date().required('Date required'),
		time: Yup.string().required('Time required'),
		type: Yup.string().required('Feeding type required'),
		food: Yup.string()
			.max(100, 'Too many characters')
			.required('Food required'),
		amount: Yup.string().required('Amount required'),
	})

	const changingValid = Yup.object({
		day: Yup.date().required('Date required'),
		time: Yup.string().required('Time required'),
		type: Yup.string().required('Type required'),
	})

	const sleepEntry = (
		<Formik
			initialValues={{
				category: 'sleep',
				day: '',
				startTime: '',
				endTime: '',
			}}
			validationSchema={sleepValid}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values, 'sleep')
				resetForm({ values: '' })
				toggle()
			}}
		>
			{({ errors, touched }) => (
				<Form action="submit" className={classes.form}>
					<h1>Add sleep entry</h1>
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
	const feedingEntry = (
		<Formik
			initialValues={{
				category: 'feeding',
				type: '',
				food: '',
				amount: '',
				day: '',
				time: '',
			}}
			validationSchema={feedingValid}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values)
				resetForm({ values: '' })
				toggle()
			}}
		>
			{({ errors, touched }) => (
				<Form action="submit" className={classes.form}>
					<h1>Add feeding entry</h1>
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
								<label htmlFor="type">Feeding Type</label>
								<Field
									name="type"
									className={`${classes.input} ${
										touched.type && errors.type
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage component={Error} name="type" />
							</fieldset>
						</div>
						<div className={classes.group}>
							<fieldset className={classes.fieldset}>
								<label htmlFor="food">Food</label>
								<Field
									name="food"
									className={`${classes.input} ${
										touched.food && errors.food
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage component={Error} name="food" />
							</fieldset>
							<fieldset className={classes.fieldset}>
								<label htmlFor="amount">Amount</label>
								<Field
									name="amount"
									className={`${classes.input} ${
										touched.amount && errors.amount
											? classes.error
											: null
									}`}
								/>
								<ErrorMessage component={Error} name="amount" />
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
	const changingEntry = (
		<Formik
			initialValues={{
				category: 'changing',
				type: '',
				day: '',
				time: '',
			}}
			validationSchema={changingValid}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values)
				resetForm({ values: '' })
				toggle()
			}}
		>
			{({ errors, touched }) => (
				<Form action="submit" className={classes.form}>
					<h1>Add diaper change</h1>
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
							Add
						</BlueButton>
					</div>
				</Form>
			)}
		</Formik>
	)

	const handleSubmit = values => {
		console.log(values)
		axios
			.post(
				values.category === 'sleep'
					? `/sleeps/${childId}`
					: values.category === 'feeding'
					? `/feedings/${childId}`
					: `/changings/${childId}`,
				values,
				{
					headers: {
						authorization: token,
					},
				}
			)
			.then(dispatch(getChildData(childId, token)))
	}

	return (
		<FormModal>
			{entry === 'sleep'
				? sleepEntry
				: entry === 'feeding'
				? feedingEntry
				: changingEntry}
		</FormModal>
	)
}

export default CreateEntry
