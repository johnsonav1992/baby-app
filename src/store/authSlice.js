import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: '',
	userId: ''
}

let logoutTimer

const calculateRemainingTime = exp => {
	const currentTime = new Date().getTime()
	const expTime = exp
	const remainingTime = expTime - currentTime
	return remainingTime
}

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

            logoutTimer = setTimeout(this.logout, remainingTime)
        },
        logout() {}
    }
})

export const authActions = authSlice.actions

export default authSlice 