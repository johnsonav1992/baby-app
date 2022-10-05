import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

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

// * THUNKS //
export const getChildData = (childId, token) => {
	return (dispatch) => {
		const url = 'http://localhost:4000'

		const sleepsReq = axios.get(`${url}/sleeps/${childId}`, {
			headers: {
				authorization: token,
			},
		})
		const feedingsReq = axios.get(`${url}/feedings/${childId}`, {
			headers: {
				authorization: token,
			},
		})
		const changingsReq = axios.get(`${url}/changings/${childId}`, {
			headers: {
				authorization: token,
			},
		})
		axios.all([sleepsReq, feedingsReq, changingsReq]).then(
			axios.spread(({data: sleepsData}, {data: feedingsData}, {data: changingsData}) => {
				console.log(sleepsData, feedingsData, changingsData)

				dispatch(childActions.setSleeps(sleepsData))
				dispatch(childActions.setFeedings(feedingsData))
				dispatch(childActions.setChangings(changingsData))
			})
		).catch(errors => {
			console.log(errors)
		})
	}
}

export const childActions = childSlice.actions

export default childSlice.reducer