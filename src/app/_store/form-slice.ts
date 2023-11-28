import { PayloadAction, createSlice } from "@reduxjs/toolkit"

type Sort = {
    id: string | undefined,
    sortName: string | undefined,
    name: string | undefined,
    parent: string | undefined,
}
type Reousrce = {
    id: string | undefined,
    name: string | undefined,
    otherName: string | undefined,
    iconId: string | undefined,
    comment: string | undefined,
    sortId: string | undefined,
    uploader: string | undefined,
}
type Form = {
    sort: Sort
    resource: Reousrce
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
        },
        resource: {
            id: "",
            name: "",
            otherName: "",
            iconId: "",
            comment: "",
            uploader: "",
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
        },
        setResource: (state, action: PayloadAction<Reousrce>) => {
            return {
                value: {
                    ...state.value,
                    resource: action.payload
                }
            }
        }
    }
})

export const { setInitForm, setSort, setResource } = form.actions
export default form.reducer