import { configureStore } from "@reduxjs/toolkit";
import authReducer from './auth-slice'
import signReducer from './sign-slice'
import formReducer from './form-slice'
import { TypedUseSelectorHook, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        authReducer,
        signReducer,
        formReducer
    }
})
export type RootState = ReturnType<typeof store.getState>
export type AppDiapatch = typeof store.dispatch
export default store
// 自定义selector，这样就会有提示
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector