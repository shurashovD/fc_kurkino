import MatchModel from "../models/matchModel"
import TeamModel from "../models/teamModel"
import coachPageApi from "../../site/app/coachPage.service"
import fileApi from "../../site/app/file.service"
import mainPageApi from "../../site/app/mainPage.service"
import matchApi from "../../site/app/matchPage.service"
import teamPageApi from "../../site/app/teamPage.service"

import { configureStore, createSlice, Store } from "@reduxjs/toolkit"
import { IPageInitialState } from "../../shared"
import articleApi from "../../site/app/article.service"
import newsApi from "../../site/app/news.service"
//import pageSlice from "../../site/app/pageSlice"
import photosApi from "../../site/app/photos.service"

type initialStateType = {
	preloadedState: ReturnType<Store["getState"]>
	store: Store
}

export async function initialState(): Promise<initialStateType> {
	try {
        const initialState: IPageInitialState = {
			date: undefined,
			link: undefined,
			pageTitle: "ФК Куркино",
			title: undefined,
		}
		const year = new Date().getFullYear()
		const gte = `${year}-01-01`
		const lte = new Date()
		const match = await MatchModel.find({
			date: { $gte: gte, $lte: lte },
			archived: false,
		})
			.populate([
				{ path: "homeTeam", model: TeamModel },
				{ path: "guestTeam", model: TeamModel },
			])
			.sort({ date: -1 }).then(doc => doc?.[0])

		const formatter = Intl.DateTimeFormat("ru", {
			day: "numeric",
			month: "long",
		})

        if ( match ) {
            initialState.date = formatter.format(new Date(match.date.toString()))
			initialState.title = `${match.homeTeam.title} - ${match.guestTeam.title}`
			initialState.link = `/match/${match._id.toString()}`
        }

		const store = configureStore({
			reducer: {
				pageSlice: createSlice({
					initialState,
					name: "newsSlice",
					reducers: {},
				}).reducer,
				[articleApi.reducerPath]: articleApi.reducer,
				[coachPageApi.reducerPath]: coachPageApi.reducer,
				[fileApi.reducerPath]: fileApi.reducer,
				[mainPageApi.reducerPath]: mainPageApi.reducer,
				[matchApi.reducerPath]: matchApi.reducer,
				[newsApi.reducerPath]: newsApi.reducer,
				[photosApi.reducerPath]: photosApi.reducer,
				[teamPageApi.reducerPath]: teamPageApi.reducer,
			},
		})
		const preloadedState = store.getState()
		return { preloadedState, store }
	} catch (e) {
		throw e
	}
}
