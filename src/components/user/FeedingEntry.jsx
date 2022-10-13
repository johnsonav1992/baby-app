import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import classes from './Entry.module.css'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import BlueButton from '../UI/BlueButton'

const FeedingEntry = ({ handleSubmit, toggle }) => {
	const feedingValid = Yup.object({
		day: Yup.date().required('Date required'),
		time: Yup.string().required('Time required'),
		type: Yup.string().required('Feeding type required'),
		food: Yup.string()
			.max(100, 'Too many characters')
			.required('Food required'),
		amount: Yup.string().required('Amount required'),
	})

	return (
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
}

export default FeedingEntry
