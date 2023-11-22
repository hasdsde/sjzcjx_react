import {createSlice, PayloadAction} from "@reduxjs/toolkit";

type  AuthState = {
    isAuth: Boolean,
    username: string,
    uid: string,
    token: string,
    role: string
}
type InitialState = {
    value: AuthState
}

const initialState: InitialState = {
    value: {
        isAuth: false,
        username: "",
        uid: "",
        token: "",
        role: ""
    } as AuthState
} as InitialState

export const auth = createSlice({
    name: "auth",
    initialState: initialState,
    reducers: {
        logout: () => {
            return initialState
        },
        login: (state, action: PayloadAction<AuthState>) => {
            return {
                value: {
                    isAuth: true,
                    username: action.payload.username,
                    token: action.payload.token,
                    uid: action.payload.uid,
                    role: action.payload.role,
                }
            }
        },
    }
})
export const {login, logout} = auth.actions
export default auth.reducer