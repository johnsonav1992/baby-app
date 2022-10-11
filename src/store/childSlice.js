import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

//^ INITIAL STATE //
const initialState = {
	childId: '',
	children: [],
	feedings: [],
	sleeps: [],
	changings: []
}

//* CHILD SLICE //
const childSlice = createSlice({
	name: 'child',
	initialState,
	reducers: {
		setChildren(state, action) {
			state.children = action.payload
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
		}
    }
})

// * THUNKS //
export const getChildren = (userId, token) => {
	return (dispatch) => {
		axios
			.get(`/children/${userId}`, {
				headers: {
					authorization: token,
				},
			})
			.then(({ data }) => {
				dispatch(childActions.setChildren(data))
			})
			.catch(err => {
				console.log(err)
			})
	}
}


export const getChildData = (childId, token) => {
	return (dispatch) => {
		const headers = {
			headers: {
				authorization: token,
			},
		}
		const sleepsReq = axios.get(`/sleeps/${childId}`, headers)
		const feedingsReq = axios.get(`/feedings/${childId}`, headers)
		const changingsReq = axios.get(`/changings/${childId}`, headers)

		axios.all([sleepsReq, feedingsReq, changingsReq]).then(
			axios.spread(({data: sleeps}, {data: feedings}, {data: changings}) => {
				dispatch(childActions.setSleeps(sleeps))
				dispatch(childActions.setFeedings(feedings))
				dispatch(childActions.setChangings(changings))
			})
		).catch(errors => {
			console.log(errors)
		})
	}
}

export const childActions = childSlice.actions

export default childSlice.reducer