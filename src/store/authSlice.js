import { createSlice } from '@reduxjs/toolkit'

//^ INITIAL STATE AND TIMER //
const initialState = {
	token: '',
	userId: '',
	isRegister: false
}

let logoutTimer

//& TIME CALCULATOR //
const calculateRemainingTime = exp => {
	const currentTime = new Date().getTime()
	const expTime = exp
	const remainingTime = expTime - currentTime
	return remainingTime
}

//& LOCAL DATA HELPER //
const getLocalData = () => {
	const storedToken = localStorage.getItem('token')
	const storedExp = localStorage.getItem('exp')
	const storedUserId = localStorage.getItem('userId')

	const remainingTime = calculateRemainingTime(storedExp)

	if (remainingTime <= 1000 * 60 * 30) {
		localStorage.removeItem('token')
		localStorage.removeItem('exp')
		localStorage.removeItem('userId')
		return null
	}

	return {
		token: storedToken,
		duration: remainingTime,
		userId: storedUserId
	}
}

const localData = getLocalData()

if (localData) {
    initialState.token = localData.token
    initialState.userId = localData.userId
}

//* AUTH SLICE //
const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		login(state, action) {
			state.token += action.payload.token
			state.userId += action.payload.userId
			const sessionExp = action.payload.sessionExp

			localStorage.setItem('exp', sessionExp)
			localStorage.setItem('token', state.token)
			localStorage.setItem('userId', state.userId)

			const remainingTime = calculateRemainingTime(sessionExp)

			logoutTimer = setTimeout(authSlice.caseReducers.logout, remainingTime)
		},
		logout(state) {
			state.token = null
			state.userId = null

			localStorage.removeItem('exp')
			localStorage.removeItem('token')
			localStorage.removeItem('userId')

            if (logoutTimer) {
                clearTimeout(logoutTimer)
            }
		},
		setRegister(state) {
			state.isRegister = true
		},
		toggleRegister(state) {
			state.isRegister = !state.isRegister
		}
	},
})

export const authActions = authSlice.actions

export default authSlice.reducer
