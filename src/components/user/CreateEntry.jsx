import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import axios from 'axios'

import FormModal from '../general/FormModal'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import BlueButton from '../UI/BlueButton'
import classes from './CreateEntry.module.css'
import { getChildData } from '../../store/childSlice'

const CreateEntry = ({ entry, toggle }) => {
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)
	const childId = useSelector(state => state.child.childId)

  const dispatch = useDispatch()

	const handleSubmit = (values) => {
    axios.post(`/sleeps/${childId}`, values, {
      headers: {
        authorization: token,
      },
    }).then(dispatch(getChildData(childId, token)))
  }

	const sleepEntry = (
		<Formik
			initialValues={{
        category: 'sleep',
        day: '',
        startTime: '',
        endTime: '',
      }}
			// validationSchema={validationSchema}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values)
				resetForm({ values: '' })
				toggle()
			}}
		>
			{({ errors, touched }) => (
				<Form action="submit" className={classes.form}>
					<h1>Add sleep entry</h1>
					<div className={classes['group-container']}>
						<div className={classes.group}>
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
						</div>
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
        type: '',
        food: '',
        amount: '',
        day: '',
        time: '',
      }}
			// validationSchema={validationSchema}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values, 'feeding')
				resetForm({ values: '' })
				toggle()
			}}
		></Formik>
	)
	const changingEntry = (
		<Formik
			initialValues={{
        type: '',
        day: '',
        time: '',
      }}
			// validationSchema={validationSchema}
			onSubmit={(values, { resetForm }) => {
				handleSubmit(values, 'changing')
				resetForm({ values: '' })
				toggle()
			}}
		></Formik>
	)

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
