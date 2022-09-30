import { createSlice } from '@reduxjs/toolkit'

const initialState = {
	token: '',
	userId: ''
}

createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.token += action.payload.token
            state.userId += action.payload.userId
        },
        logout() {}
    }
})
