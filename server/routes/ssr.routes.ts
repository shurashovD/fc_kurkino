import { Provider } from 'react-redux';
import { Router } from "express";
import { readFile } from 'fs/promises';
import path from 'path';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { SSRProvider } from 'react-bootstrap';
import App from '../../site/App';
import { initialState } from '../handlers/state.handler';

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
	const pages = new Set([
		"/news",
		"/playbill",
		"/team-squad",
		"/coach-squad",
		"/photo",
		"/about",
		"/contacts",
	])

	const reg = new RegExp(Array.from(pages).map(item => `(${item})`).join("|^"))

	switch (location) {
		case "/":
			return true
		case "/news":
			return true
		case "/playbill":
			return true
		case "/team-squad":
			return true
		case "/coach-squad":
			return true
		case "/photo":
			return true
		case "/about":
			return true
		case "/contacts":
			return true
		default:
			return false
	}
}

router.get(/^\/admin/, (req, res) => res.redirect("/admin/panel"))

router.get('*', async (req, res) => {
	try {
		const location = req.path
		if ( !pageExists(location) ) {
			return res.status(404).end()
		}

		const { preloadedState, store } = await initialState()

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