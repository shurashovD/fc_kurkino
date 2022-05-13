import { configureStore } from "@reduxjs/toolkit";
import articleApi from "./article.service";
import coachPageApi from "./coachPage.service";
import fileApi from "./file.service";
import mainPageApi from "./mainPage.service";
import matchApi from "./matchPage.service";
import newsApi from "./news.service";
import pageSlice from "./pageSlice";
import photosApi from "./photos.service";
import teamPageApi from "./teamPage.service";

const store = configureStore({
	preloadedState: window?.__PRELOADED_STATE__ || {},
	reducer: {
		[articleApi.reducerPath]: articleApi.reducer,
		[coachPageApi.reducerPath]: coachPageApi.reducer,
		[fileApi.reducerPath]: fileApi.reducer,
		[mainPageApi.reducerPath]: mainPageApi.reducer,
		[matchApi.reducerPath]: matchApi.reducer,
		[newsApi.reducerPath]: newsApi.reducer,
		[pageSlice.name]: pageSlice.reducer,
		[photosApi.reducerPath]: photosApi.reducer,
		[teamPageApi.reducerPath]: teamPageApi.reducer,
	},
	middleware: (getDefaultMiddleware) => [
		...getDefaultMiddleware(),
		articleApi.middleware,
		coachPageApi.middleware,
		fileApi.middleware,
		mainPageApi.middleware,
		matchApi.middleware,
		newsApi.middleware,
		photosApi.middleware,
		teamPageApi.middleware,
	],
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store