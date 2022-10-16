import React from 'react'

import BlueButton from '../UI/BlueButton'
import PurpleButtonSmall from '../UI/PurpleButtonSmall'
import Card from '../UI/Card'
import classes from './AccountPage.module.css'

const AccountPage = () => {
	return (
		<main className={classes['account-main']}>
			<h1>Account</h1>
			<p>
				Fill out your profile details below to change information about
				your account
			</p>
			<Card>
				<form action="submit" className={classes.form}>
					<div className={classes.group}>
						<fieldset>
							<label htmlFor="firstName">First name</label>
							<input type="text" />
						</fieldset>
						<fieldset>
							<label htmlFor="lastName">Last name</label>
							<input type="text" />
						</fieldset>
					</div>
					<div className={classes.group}>
						<fieldset>
							<label htmlFor="username">Username</label>
							<input type="text" />
						</fieldset>
						<div className={classes['btn-wrapper']}>
							<BlueButton>Save</BlueButton>
						</div>
					</div>
				</form>
			</Card>
			<div className={classes['edit-buttons']}>
				<BlueButton>Save</BlueButton>
				<PurpleButtonSmall addClass={'change-pw'}>
					Change Password
				</PurpleButtonSmall>
			</div>
		</main>
	)
}

export default AccountPage
