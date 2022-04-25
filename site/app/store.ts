import { configureStore } from "@reduxjs/toolkit";
import coachPageApi from "./coachPage.service";
import fileApi from "./file.service";
import mainPageApi from "./mainPage.service";
import matchApi from "./matchPage.service";
import teamPageApi from "./teamPage.service";

const store = configureStore({
	reducer: {
		[coachPageApi.reducerPath]: coachPageApi.reducer,
		[fileApi.reducerPath]: fileApi.reducer,
		[mainPageApi.reducerPath]: mainPageApi.reducer,
		[matchApi.reducerPath]: matchApi.reducer,
		[teamPageApi.reducerPath]: teamPageApi.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		coachPageApi.middleware,
		fileApi.middleware,
		mainPageApi.middleware,
		matchApi.middleware,
		teamPageApi.middleware,
	],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store