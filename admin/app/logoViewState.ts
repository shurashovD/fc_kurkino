import { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IInitialState {
    show: boolean
    src?: string
    id?: string
}

const initialState: IInitialState = {
	show: false,
	src: undefined,
	id: undefined,
}

const logoViewSlice = createSlice({
    initialState,
    name: 'logoViewState',
    reducers: {
        logoViewShow: (state, { payload }: PayloadAction<{ src: string, id: string }>) => {
            state.show = true
            state.id = payload.id
            state.src = payload.src
        },
        logoViewHide: state => {
            state.show = false
            state.id = undefined
            state.src = undefined
        },
    }
})

export const { logoViewHide, logoViewShow } = logoViewSlice.actions

export default logoViewSlice