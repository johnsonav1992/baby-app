import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import FormModal from '../general/FormModal'
import PurpleButton from '../UI/PurpleButton'
import RedButton from '../UI/RedButton'
import { authActions } from '../../store/authSlice'
import classes from './DeleteUser.module.css'

const DeleteUser = ({ toggle }) => {
	const userId = useSelector(state => state.auth.userId)
  const token = useSelector(state => state.auth.token)
  const dispatch = useDispatch()
  const navigate = useNavigate()

	const handleDelete = () => {
		axios
			.delete(`/api/users/${userId}`, {
        headers: {
          authorization: token,
        }
      })
			.then(({ data }) => console.log(data))
			.catch(err => console.log(err))

		toggle()
    dispatch(authActions.logout())
    navigate('/')
	}

	return (
		<FormModal>
			<div className={classes.container}>
				<h1>Delete Account</h1>
				<div>
					<p>
						Are you <strong>SURE</strong> you want to delete your
						account?
					</p>
					<p>
						<strong>ALL</strong> data will be lost and cannot be
						recovered.
					</p>
				</div>
				<PurpleButton onClick={toggle}>Cancel</PurpleButton>
				<RedButton onClick={handleDelete}>Delete Account</RedButton>
			</div>
		</FormModal>
	)
}

export default DeleteUser
