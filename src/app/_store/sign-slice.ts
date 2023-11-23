import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type AlterDialog = {
    open: boolean,
    title: string,
    context: string
}

type SignState = {
    alterDialog: AlterDialog
}
type InitialState = {
    value: SignState
}

const initialState: InitialState = {
    value: {
        alterDialog: {
            open: false,
            title: "提示",
            context: ""
        }
    } as SignState
} as InitialState

export const sign = createSlice({
    name: "sign",
    initialState: initialState,
    reducers: {
        openAlterDialog: (state, action: PayloadAction<{ title: string, context: string }>) => {
            return {
                value: {
                    alterDialog: {
                        open: true,
                        title: action.payload.title,
                        context: action.payload.context
                    }
                }
            }
        },
        closeAlterDialog: () => {
            return initialState
        }
    }

})

export const { openAlterDialog, closeAlterDialog } = sign.actions
export default sign.reducer