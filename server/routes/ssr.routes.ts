import { Provider } from 'react-redux';
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Router } from "express";
import { readFile } from 'fs/promises';
import path from 'path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import coachPageApi from '../../site/app/coachPage.service';
import fileApi from '../../site/app/file.service';
import mainPageApi from '../../site/app/mainPage.service';
import matchApi from '../../site/app/matchPage.service';
import teamPageApi from '../../site/app/teamPage.service';
import { SSRProvider } from 'react-bootstrap';
import App from '../../site/App';
import MatchModel from '../models/matchModel';
import TeamModel from '../models/teamModel';

const router = Router()

function getPageTitle(location: string): string {
	switch (location) {
		case "/about":
			return "О клубе"
		case "/playbill":
			return "Матчи"
		case "/team-squad":
			return "Состав команды"
		case "/coach-squad":
			return "Тренерский штаб"
		case "/contacts":
			return "Контакты"
		default:
			return "ФК Куркино"
	}
}

function getPageDescription(location: string): string {
	switch (location) {
		case "/about":
			return "Информация об администрации, истории и ключевых игроках футбольного клуба"
		case "/playbill":
			return `Афиша матчей футбольного сезона ${new Date().getFullYear()}`
		case "/team-squad":
			return "Информация обо всех игроках футбольного клуба"
		case "/coach-squad":
			return "Информация об администрации и тренерах футбольного клуба"
		case "/contacts":
			return "Футбольный клуб Куркино, город Москва"
		default:
			return "Футбольный клуб Куркино, город Москва"
	}
}

function pageExists(location: string): boolean {
	switch (location) {
		case "/":
			return true
		case "/about":
			return true
		case "/playbill":
			return true
		case "/team-squad":
			return true
		case "/coach-squad":
			return true
		case "/contacts":
			return true
		default:
			return false
	}
}

router.get('*', async (req, res) => {
	try {
		if (req.session.admin) {
			return res.redirect("/admin/panel")
		}

		const location = req.path
		if ( !pageExists(location) ) {
			return res.status(404).end()
		}

		const year = new Date().getFullYear()
		const gte = `${year}-01-01`
		const lte = new Date()
		const matches = await MatchModel.find({
			date: { $gte: gte, $lte: lte },
			archived: false,
		})
			.populate([
				{ path: "homeTeam", model: TeamModel },
				{ path: "guestTeam", model: TeamModel },
			])
			.sort({ date: -1 })

		if ( matches.length === 0 ) {
			return
		}

		const formatter = Intl.DateTimeFormat('ru', {
			day: 'numeric',
			month: 'long'
		})

		const date = formatter.format(new Date(matches[0].date.toString()))
		const title = `${matches[0].homeTeam.title} - ${matches[0].guestTeam.title}`
		const link = `/match/${matches[0]._id.toString()}`

		const store = configureStore({
			reducer: {
				newsSlice: createSlice({
					initialState: { date, link, title },
					name: "newsSlice",
					reducers: {},
				}).reducer,
				[coachPageApi.reducerPath]: coachPageApi.reducer,
				[fileApi.reducerPath]: fileApi.reducer,
				[mainPageApi.reducerPath]: mainPageApi.reducer,
				[matchApi.reducerPath]: matchApi.reducer,
				[teamPageApi.reducerPath]: teamPageApi.reducer,
			},
		})
		const preloadedState = store.getState()

		const component = renderToString(
			createElement(
				StaticRouter,
				{ location },
				createElement(
					Provider,
					{ store },
					createElement(SSRProvider, null, createElement(App))
				)
			)
		)

		const tempPath = path.join(__dirname, "static", "site", "index.html")
		const template = await readFile(tempPath, { encoding: "utf-8" })
		const proladedStateScript = `<script>window.__PRELOADED_STATE__ = ${JSON.stringify(
			preloadedState
		).replace(/</g, "\\u003c")}</script>`
		const result = template
			.replace(`<title>ФК Куркино</title>`, `<title>${getPageTitle(location)}</title>`)
			.replace(
				`<meta name="description" content="">`,
				`<meta name="description" content="${getPageDescription(location)}">`
			)
			.replace(
				`<div id="root"></div>`,
				`<div id="root">${component}</div>${proladedStateScript}`
			)
		return res.send(result)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

export default router