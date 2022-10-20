import { configureStore } from "@reduxjs/toolkit"
import authReducer from "./authSlice"
import childReducer from "./childSlice"
import uiReducer from "./uiSlice"


const store = configureStore({
    reducer: {
        auth: authReducer,
        child: childReducer,
        ui: uiReducer
    }
})

export default store