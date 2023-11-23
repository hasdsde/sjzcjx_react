import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type SignState = {
    alterDialog: boolean
}
type InitialState = {
    value: SignState
}

const initialState: InitialState = {
    value: {
        alterDialog: false
    } as SignState
} as InitialState

export const sign = createSlice({
    name: "sign",
    initialState: initialState,
    reducers: {
        setAlterDialog: (state, action: PayloadAction<boolean>) => {
            return {
                value: {
                    alterDialog: action.payload
                }
            }
        },
    }

})

export const { setAlterDialog } = sign.actions
export default sign.reducer