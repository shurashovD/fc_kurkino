import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitialState {
    src?: string
    volume: number
    pause: boolean
    stop: boolean
}

const initialState: IInitialState = {
	src: undefined,
	volume: 0.7,
	pause: false,
	stop: true,
}

const playerSlice = createSlice({
    initialState,
    name: 'player',
    reducers: {
        setSrc: (state, { payload }: PayloadAction<string>) => {
            state.src = payload
        },
        resetPalyer: () => initialState,
    }
})

export const { resetPalyer, setSrc } = playerSlice.actions

export default playerSlice