import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import childReducer from "./childSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        child: childReducer
    }
})

export default store