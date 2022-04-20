import { configureStore } from "@reduxjs/toolkit";
import fileApi from "./file.service";
import mainPagehApi from "./mainPage.servie";

const store = configureStore({
	reducer: {
		[fileApi.reducerPath]: fileApi.reducer,
		[mainPagehApi.reducerPath]: mainPagehApi.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		fileApi.middleware,
		mainPagehApi.middleware,
	],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store