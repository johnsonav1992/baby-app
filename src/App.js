import React from 'react'

import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import LoginForm from './components/auth/LoginForm.jsx'
import AccountPage from './components/user/AccountPage.jsx'
import WelcomePage from './components/general/WelcomePage.jsx'

import './App.css'

function App() {
	return (
		<>
			<Header />
			<main className="main-content">
				<Routes>
					<Route index element={<WelcomePage />}></Route>
					<Route path="/login" element={<LoginForm />} />
					<Route path="/account" element={<AccountPage />} />
				</Routes>
			</main>
		</>
	)
}

export default App
