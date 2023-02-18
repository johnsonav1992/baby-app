import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'

import FormModal from '../general/FormModal'
import BlueButton from '../UI/BlueButton'
import PurpleButton from '../UI/PurpleButton'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import RedButton from '../UI/RedButton'
import DropDown from '../UI/Dropdown'
import Error from '../UI/Error'
import { getChildren } from '../../store/childSlice'
import classes from './ChildEdit.module.css'

const ChildEdit = ({ toggle }) => {
	const userId = useSelector(state => state.auth.userId)
	const token = useSelector(state => state.auth.token)
	const children = useSelector(state => state.child.children)
	const [selectedChild, setSelectedChild] = useState(null)
	const [refresh, setRefresh] = useState(false)
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(getChildren(userId, token))
	}, [token, userId, dispatch, refresh])

	const editValues = {
		name: selectedChild?.name,
		age: selectedChild?.age,
		gender: selectedChild?.gender,
	}

	const validSchema = Yup.object({
		name: Yup.string()
			.max(100)
			.required(),
		age: Yup.number()
			.max(13)
			.required(),
	})

	const handleSubmit = values => {
		axios
			.put(`/api/children/${selectedChild.id}`, values, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				setRefresh((prev) => !prev)
			})
			.catch(err => console.log(err))
	}

	const deleteChildHandler = () => {
		axios
			.delete(`/api/children/${selectedChild.id}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				setRefresh((prev) => !prev)
			})
			.catch(err => console.log(err))
	}

	return (
		<FormModal>
			{children.length === 0 ? (
				<p>
					You have no children added yet! Please go back to the
					dashboard to add a child.
				</p>
			) : !selectedChild ? (
				<>
					<h1>Select Child to Edit</h1>
					<DropDown
						name={'child'}
						value={'select child'}
						onChange={e => {
							setSelectedChild(
								children.filter(
									child => child.name === e.target.value
								)[0]
							)
						}}
						data={children}
					/>
					<PurpleButton type={'button'} onClick={toggle}>
						Cancel
					</PurpleButton>
				</>
			) : (
				<Formik
					initialValues={
						selectedChild
							? editValues
							: {
									name: '',
									age: '',
									gender: '',
							  }
					}
					validationSchema={validSchema}
					enableReinitialize
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
											<option disabled>
												Select gender
											</option>
											<option value="male">Male</option>
											<option value="female">
												Female
											</option>
										</Field>
									</fieldset>
								</div>
								<div className={classes.group}>
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
									<BlueButton
										addClass={'modal-btn'}
										type={'submit'}
									>
										Edit
									</BlueButton>
								</div>
							</div>
							<div className={classes['btn-container']}>
								<BlueButton
									addClass={'modal-btn'}
									type={'button'}
									onClick={() => setSelectedChild(null)}
								>
									Back
								</BlueButton>
								<PurpleButtonSmall
									type={'button'}
									onClick={toggle}
								>
									Cancel
								</PurpleButtonSmall>
							</div>
							<RedButton
								type={'button'}
								onClick={() => {
									deleteChildHandler()
									toggle()
								}}
							>
								Delete Child
							</RedButton>
						</Form>
					)}
				</Formik>
			)}
		</FormModal>
	)
}

export default ChildEdit
