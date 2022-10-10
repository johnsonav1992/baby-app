import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Header from './components/layout/Header.jsx'
import LoginForm from './components/auth/LoginForm.jsx'
import AccountPage from './components/user/AccountPage.jsx'
import WelcomePage from './components/general/WelcomePage.jsx'
import DashboardPage from './components/user/DashboardPage'

import './App.css'

function App() {
	const token = useSelector(state => state.auth.token)

	return (
		<>
			<Header />
			<main className="main-content">
				<Routes>
					<Route index element={<WelcomePage />}></Route>
					<Route path="/login" element={<LoginForm />} />
					{token && (
						<>
							<Route
								path="/dashboard"
								element={<DashboardPage />}
							/>
							<Route path="/account" element={<AccountPage />} />
						</>
					)}
				</Routes>
			</main>
		</>
	)
}

export default App
