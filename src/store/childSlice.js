import { createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
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
const url = 'http://localhost:4000'
// const userId = useSelector(state => state.auth.userId)

// export const getChildren = () => {
// 	return (dispatch) => {
// 		axios
// 			.get(`${url}/children/${userId}`, {
// 				headers: {
// 					authorization: token,
// 				},
// 			})
// 			.then(({ data }) => {
// 				setChildren(data)
// 			})
// 			.catch(err => {
// 				console.log(err)
// 			})
// 	}
// }


export const getChildData = (childId, token) => {
	return (dispatch) => {

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
			axios.spread(({data: sleeps}, {data: feedings}, {data: changings}) => {
				console.log(sleeps, feedings, changings)

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