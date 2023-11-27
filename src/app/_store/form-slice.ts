import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type Sort = {
    id: string | undefined,
    sortName: string | undefined,
    name: string | undefined,
    parent: string | undefined,
}
type Form = {
    sort: Sort
}
type InitialState = {
    value: Form
}
const initialState: InitialState = {
    value: {
        sort: {
            id: "",
            sortName: "",
            name: "",
            parent: ""
        }
    } as Form
} as InitialState

export const form = createSlice({
    name: "form",
    initialState: initialState,
    reducers: {
        setInitForm: () => {
            return initialState
        },
        setSort: (state, action: PayloadAction<Sort>) => {
            return {
                value: {
                    ...state.value,
                    sort: action.payload
                }
            }
        }
    }
})

export const { setInitForm, setSort } = form.actions
export default form.reducer