import { createSlice } from '@reduxjs/toolkit'

//^ INITIAL STATE //
const initialState = {
	childId: '',
	feedings: [],
	sleeps: [],
	changings: []
}

//* CHILD SLICE //
const childSlice = createSlice({
	name: 'child',
	initialState,
	reducers: {
		setChildId(state, action) {
			state.childId = action.payload
		},
        setFeedings(state, action) {
           state.feedings = action.payload
        },
		setSleeps(state, action) {
			state.sleeps = action.payload
		},
		setChangings(state, action) {
			state.changings = action.payload
		}
    }
})

export const childActions = childSlice.actions

export default childSlice.reducer