import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import AlterDialog from "../_component/AlterDialog"

type AlterDialog = {
    open: boolean,
    title: string,
    context: string
}
type SnackBar = {
    open: boolean,
    color: "primary" | "neutral" | "danger" | "success" | "warning",
    context: string,
}
type SignState = {
    alterDialog: AlterDialog,
    snackBar: SnackBar
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
        },
        snackBar: {
            open: false,
            color: "primary",
            context: "",
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
                    },
                    snackBar: state.value.snackBar
                }
            }
        },
        closeAlterDialog: () => {
            return initialState
        },
        openSnkckBar: (state, action: PayloadAction<{ color: "primary" | "neutral" | "danger" | "success" | "warning", context: string }>) => {
            return {
                value: {
                    alterDialog: state.value.alterDialog,
                    snackBar: {
                        open: true,
                        color: action.payload.color,
                        context: action.payload.context
                    }
                }
            }
        },
        closeSnackBar: (state) => {
            return {
                value: {
                    alterDialog: state.value.alterDialog,
                    snackBar: {
                        ...state.value.snackBar,
                        open: false
                    }
                }
            }
        }
    }

})

export const { openAlterDialog, closeAlterDialog, openSnkckBar, closeSnackBar } = sign.actions
export default sign.reducer