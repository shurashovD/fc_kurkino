import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IInitalState {
	id?: string
	guest: string
	guestScores?: number
	home: string
	homeScores?: number
    show?: boolean
}

const initialState: IInitalState = {
    id: undefined,
    guest: '',
    guestScores: undefined,
    home: '',
    homeScores: undefined,
    show: false
}

const matchScoresModalSlice = createSlice({
	initialState,
	name: "matchScoresModal",
	reducers: {
		showMatchScoresModal: (
			state,
			{
				payload,
			}: PayloadAction<{
				id: string
				guest: string
				guestScores?: number
				home: string
				homeScores?: number
			}>
		) => {
			state.show = true
			state.guest = payload.guest
			state.home = payload.home
			state.guestScores = payload.guestScores
			state.homeScores = payload.homeScores
			state.id = payload.id
		},
		hideMatchScoresModal: () => initialState,
	},
})

export const { hideMatchScoresModal, showMatchScoresModal } = matchScoresModalSlice.actions

export default matchScoresModalSlice