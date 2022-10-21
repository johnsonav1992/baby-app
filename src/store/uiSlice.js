import { createSlice } from '@reduxjs/toolkit'

//^ INITIAL STATE //
const initialState = {
	loading: 'loaded'
}

//* UI SLICE //
const uiSlice = createSlice({
	name: 'ui',
	initialState,
	reducers: {
		setLoading(state, action) {
			state.loading = action.payload
		}
  }
})


export const uiActions = uiSlice.actions

export default uiSlice.reducer