import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    show: boolean
    text: string | null
    variant: string | undefined
}

const initialState: IInitialState = {
    show: false,
    text: null,
    variant: 'danger'
}

export const alertSlice = createSlice({
    initialState,
    name: 'alertSlice',
    reducers: {
        alertSuccess: (state, { payload }: PayloadAction<string>) => {
            state.show = true
            state.text = payload
            state.variant = 'success'
        },
        alertError: (state, { payload }: PayloadAction<string>) => {
            state.show = true
            state.text = payload
            state.variant = 'danger'
        },
        alertHide: (state) => {
            state.show = false
            state.text = null
        } 
    }
})

export default alertSlice.reducer

export const { alertError, alertHide, alertSuccess } = alertSlice.actions