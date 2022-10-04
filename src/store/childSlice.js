import { createSlice } from '@reduxjs/toolkit'

//^ INITIAL STATE //
const initialState = {
	feedings: [],
	sleeps: [],
	changings: []
}

//* CHILD SLICE //
const childSlice = createSlice({
	name: 'child',
	initialState,
	reducers: {
        add(state, action) {
           const { type, newEntry } = action.payload
            state[type].push(newEntry)
        }
    }
})

export const childActions = childSlice.actions

export default childSlice.reducer