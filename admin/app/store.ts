import { configureStore } from "@reduxjs/toolkit";
import { alertSlice } from "./alertState";
import coachApi from "./coach.service";
import { errorHandler } from "./errorHandler";
import logoViewSlice from "./logoViewState";
import matchApi from "./match.service";
import matchScoresModalSlice from "./matchScoresModalState";
import playerSlice from "./playerState";
import squadApi from "./squad.service";
import { teamApi } from "./team.service"

export const store = configureStore({
	reducer: {
		[alertSlice.name]: alertSlice.reducer,
		[coachApi.reducerPath]: coachApi.reducer,
		[logoViewSlice.name]: logoViewSlice.reducer,
		[matchApi.reducerPath]: matchApi.reducer,
		[matchScoresModalSlice.name]: matchScoresModalSlice.reducer,
		[playerSlice.name]: playerSlice.reducer,
		[squadApi.reducerPath]: squadApi.reducer,
		[teamApi.reducerPath]: teamApi.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		errorHandler,
		matchApi.middleware,
		squadApi.middleware,
		teamApi.middleware,
		coachApi.middleware,
	],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch