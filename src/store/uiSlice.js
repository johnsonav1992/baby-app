import { createSlice } from '@reduxjs/toolkit'

//^ INITIAL STATE //
const initialState = {
	isLoading: false
}

//* UI SLICE //
const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setIsLoading(state, action) {
			state.isLoading = action.payload
		}
  }
})


export const uiActions = uiSlice.actions

export default uiSlice.reducer