import { createSlice } from '@reduxjs/toolkit'
import { uiActions } from './uiSlice'
import axios from 'axios'

//^ INITIAL STATE //
const initialState = {
	childId: '',
	childName: '',
	children: [],
	feedings: [],
	sleeps: [],
	changings: [],
}

//* CHILD SLICE //
const childSlice = createSlice({
	name: 'child',
	initialState,
	reducers: {
		setChildren(state, action) {
			state.children = action.payload
		},
		setChildName(state, action) {
			state.childName = action.payload
		},
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
		},
	},
})

// * THUNKS //
export const getChildren = (userId, token) => {
	return dispatch => {
		axios
			.get(`/api/children/${userId}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				dispatch(uiActions.setLoading('loaded'))
				dispatch(childActions.setChildren(data))
			})
			.catch(err => {
				dispatch(uiActions.setLoading('loaded'))
				console.log(err)
			})
	}
}

export const getChildData = (childId, token) => {
	return dispatch => {
		const headers = {
			headers: {
				authorization: token,
			},
		}
		const sleepsReq = axios.get(`/api/sleeps/${childId}`, headers)
		const feedingsReq = axios.get(`/api/feedings/${childId}`, headers)
		const changingsReq = axios.get(`/api/changings/${childId}`, headers)

		axios
			.all([sleepsReq, feedingsReq, changingsReq])
			.then(
				axios.spread(
					(
						{ data: sleeps },
						{ data: feedings },
						{ data: changings }
					) => {
						dispatch(uiActions.setLoading('loaded'))
						dispatch(childActions.setSleeps(sleeps))
						dispatch(childActions.setFeedings(feedings))
						dispatch(childActions.setChangings(changings))
					}
				)
			)
			.catch(errors => {
				dispatch(uiActions.setLoading('loaded'))
				console.log(errors)
			})
	}
}

export const childActions = childSlice.actions

export default childSlice.reducer
