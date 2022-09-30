import React, { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
import Header from './components/layout/Header.jsx'
import LoginForm from './components/auth/LoginForm.jsx'

import './App.css'
import axios from 'axios'

function App() {
	return (
		<>
			<Header />
			<main className="main-content">
				<Routes>
					<Route path="/login" element={<LoginForm />} />
				</Routes>
			</main>
		</>
	)
}

export default App