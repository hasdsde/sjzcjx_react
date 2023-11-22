import {configureStore} from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import {TypedUseSelectorHook, useSelector} from "react-redux";

export const store = configureStore({
    reducer: {
        authReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDiapatch = typeof store.dispatch
export default store
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector