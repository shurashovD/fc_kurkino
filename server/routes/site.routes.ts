import { Types } from 'mongoose';
import { ICoach, IFootballer, IMatch, IMatchPage, IMatchPhoto, ITeam, ITeamPage } from './../../shared/index.d';
import { Request, Router } from "express"
import path from 'path'
import MatchModel from '../models/matchModel'
import TeamModel from '../models/teamModel'
import FootballerModel from '../models/footballerModel';
import CoachModel from '../models/coachModel';
import NewsModel from '../models/NewsModel';

const router = Router()

router.get("/static", async (req: Request<{}, {}, {}, {file: string}>, res) => {
	try {
		const { file } = req.query
		const filePath = path.join(__dirname, file)
		return res.sendFile(filePath)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get("/file/:file", async (req, res) => {
	try {
		const { file } = req.params
		const filePath = path.join(__dirname, "static", "site-static", file)
		return res.sendFile(filePath)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get("/main-page/matches", async (req, res) => {
	try {
        const year = new Date().getFullYear()
        const gte = `${year}-01-01`
        const lte = `${year}-12-31`
		const matches = await MatchModel.find({
			date: { $gte: gte, $lte: lte },
			archived: false,
		})
			.populate([
				{ path: "homeTeam", model: TeamModel },
				{ path: "guestTeam", model: TeamModel }
			])
			.sort({ date: 1 })
        return res.json(matches)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get("/main-page/photos", async (req, res) => {
	try {
		function getPhotos(arr: IMatch[], res: IMatchPhoto[] = [], include = new Set<string>()): IMatchPhoto[] {
			if (res.length === 6) return res
			const candidates = arr
				.filter(({ _id }) => !include.has(_id.toString()))
				.reduce<IMatchPhoto[]>((res, { _id, photo, guestTeam, homeTeam }) => {
					const item = photo?.map<IMatchPhoto>(photo => 
						({ _id, photo, title: `${guestTeam.title} - ${homeTeam.title}` })) || []
					return res.concat(item)
				}, [])
				.filter(({ photo }) => res.every(item => item.photo !== photo))
			if (candidates.length === 0) {
				include.clear()
				const candidates = arr
					.filter(({ _id }) => !include.has(_id.toString()))
					.reduce<IMatchPhoto[]>(
						(res, { _id, photo, guestTeam, homeTeam }) => {
							const item =
								photo?.map<IMatchPhoto>((photo) => ({
									_id,
									photo,
									title: `${guestTeam.title} - ${homeTeam.title}`,
								})) || []
							return res.concat(item)
						},
						[]
					)

				if (candidates.length === 0) {
					return res
				}
				return getPhotos(arr, res, include)
			}
			const index = Math.round(Math.random() * (candidates.length - 1))
			include.add(candidates[index]._id.toString())
			return getPhotos(arr, res.concat(candidates[index]), include)
		}

		const year = new Date().getFullYear()
		const gte = `${year}-01-01`
		const lte = `${year}-12-31`
		const matches = await MatchModel.find({
			date: { $gte: gte, $lte: lte },
			archived: false,
		}).populate<{ homeTeam: ITeam, guestTeam: ITeam }>([
			{ path: 'homeTeam', model: TeamModel },
			{ path: 'guestTeam', model: TeamModel },
		])
		const photos = getPhotos(matches)
		return res.json(photos)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get('/main-page/birthdays', async (req, res) => {
	try {
		interface compare {
			_id: Types.ObjectId
			date: number
		}

		const team = await FootballerModel.find({ birthday: { $exists: true }, archived: false })
		const coaches = await CoachModel.find({ birthday: { $exists: true }, archived: false })

		const teamCompare: compare[] = team.map(({_id, birthday}: IFootballer) => {
			const ms = Date.parse(birthday?.toString() || '')
			const month = new Date(ms).getMonth()
			const day = new Date(ms).getDate()
			const date = new Date(`1970-${month + 1}-${day}`).getTime()
			const result: compare = {
				_id: new Types.ObjectId(_id), date
			}
			return result
		})

		const coachCompare: compare[] = coaches.map(({ _id, birthday }: ICoach) => {
				const ms = Date.parse(birthday?.toString() || '')
				const month = new Date(ms).getMonth()
				const day = new Date(ms).getDate()
				const date = new Date(`1970-${month + 1}-${day}`).getTime()
				const result: compare = {
					_id: new Types.ObjectId(_id),
					date,
				}
				return result
			})

		const sortByBirthdays = teamCompare.concat(coachCompare).sort((a, b) => 
			Math.sign(a.date - b.date)
		)

		const month = new Date().getMonth() + 1
		const day = new Date().getDate()

		const todayMs = new Date(`1970-${month}-${day}`).getTime()
		const startTodayMs = todayMs
		const index = sortByBirthdays.findIndex(({ date }) => date >= todayMs)
		const target = sortByBirthdays.slice(index, index + 3)
		const result = target.map(item => {
			const candidate = team.find(({_id}) => _id.toString() === item._id.toString())
			if ( candidate ) {
				const { _id, name, avatar, post, number, birthday } = candidate.toObject()
				const today = startTodayMs === item.date
				let description = post
				if ( number ) {
					description += `, номер ${number}`
				}
				return { _id, date: birthday, name, photo: avatar, post: description, today }
			}
			const coach = coaches.find(({ _id }) => _id.toString() === item._id.toString())
			if ( coach ) {
				const { _id, name, avatar, post, birthday } = coach.toObject()
				const today = startTodayMs === item.date
				return { _id, date: birthday, name, photo: avatar, post, today }
			}
		})
		return res.json(result)
	}
	catch (e) {
		console.log(e)
		return res.json({ message: 'Что-то пошло не так...' })
	}
})

router.get("/match-page/futures", async (req, res) => {
	try {
		const year = new Date().getFullYear()
		const gte = new Date()
		const lte = `${year}-12-31`
		const matches = await MatchModel.find({
			date: { $gte: gte, $lte: lte },
			archived: false,
		})
			.populate([
				{ path: "homeTeam", model: TeamModel },
				{ path: "guestTeam", model: TeamModel },
			])
			.sort({ date: 1 })

		const result = matches.reduce<IMatchPage[]>((arr, item) => {
			const { date } = item
			const month = new Date(Date.parse(date.toString())).getMonth() + 1
			const index = arr.findIndex(item => item.month === month)
			if ( index === -1 ) {
				return arr.concat({
					month,
					matches: [item]
				})
			}
			arr[index].matches.push(item)
			return arr
		}, [])
		return res.json(result)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get("/match-page/continous", async (req, res) => {
	try {
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
		
		const result = matches.reduce<IMatchPage[]>((arr, item) => {
			const { date } = item
			const month = new Date(Date.parse(date.toString())).getMonth() + 1
			const index = arr.findIndex((item) => item.month === month)
			if (index === -1) {
				return arr.concat({
					month,
					matches: [item],
				})
			}
			arr[index].matches.push(item)
			return arr
		}, [])
		return res.json(result)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get("/match-page/match/:id", async (req, res) => {
	try {
		const formatter = new Intl.DateTimeFormat("ru", {
			weekday: "short",
			month: "long",
			day: "numeric",
			hour: "numeric",
			minute: "2-digit",
		})
		const {id} = req.params
		const match = await MatchModel.findById(id)
			.populate([
				{ path: "homeTeam", model: TeamModel },
				{ path: "guestTeam", model: TeamModel },
			])
			.then(doc => {
				if ( !doc ) return doc
				return { ...doc?.toObject(), date: formatter.format(Date.parse(doc.date.toString())) }
			})

		if ( !match ) {
			return res.status(500).json({ messsage: 'Матч не найден' })
		}

		return res.json(match)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get("/team-page", async (req, res) => {
	try {
		const init: ITeamPage[] = [
			{ role: "Вратари", footballers: [] },
			{ role: "Защитники", footballers: [] },
			{ role: "Полузащитники", footballers: [] },
			{ role: "Нападающие", footballers: [] },
		]

		const team = await FootballerModel.find({ archived: false })

		const result = team.reduce((arr, item) => {
			const firstLiteral = item.post?.substring(0, 1).toLocaleLowerCase()
			if ( !firstLiteral ) return arr

			const index = arr.findIndex(({ role }) => 
				(role.substring(0, 1).toLocaleLowerCase() === firstLiteral)
			)
			if ( index === -1 ) return arr

			let age = 0, ageDescription = 'лет'
			if ( item.birthday ) {
				const now = new Date()
				const nowYear = now.getFullYear()
				const nowMonth = now.getMonth() + 1
				const nowDate = now.getDate()
 				const birthYear = new Date(item.birthday.toString()).getFullYear()
				const birthMonth = new Date(item.birthday.toString()).getMonth() + 1
				const birthDate = new Date(item.birthday.toString()).getDate()
				const haveCelebrate = Date.parse(`1970-${birthMonth}-${birthDate}`) > Date.parse(`1970-${nowMonth}-${nowDate}`)
				age = (haveCelebrate ? 0 : -1) + nowYear - birthYear
				const reminder = (age - 1) % 10
				if ( reminder < 4 ) ageDescription = 'года'
				if ( reminder === 0 ) ageDescription = 'год'
			}

			const description = `
				${item.post || ""}${age > 0 ? `, ${age} ${ageDescription}` : ""}
			`

			arr[index]?.footballers?.push({
				id: item._id.toString(), name: item.name, photo: item.avatar, number: item.number, description
			})
			return arr
		}, init)

		return res.json(result)
	} catch (e) {
		console.log(e)
		return res.status(500).send("Что-то пошло не так...")
	}
})

router.get('/coach-page', async (req, res) => {
	try {
		const coaches = await CoachModel.find({ archived: false })
		return res.json(coaches)
	}
	catch (e) {
		console.log(e)
		return res.status(500).json({ message: 'Что-то пошло не так...' })
	}
})

router.get('/news-page', async (req: Request<{}, {}, {}, { page: number, limit: number }>, res) => {
	try {
		const formatter = Intl.DateTimeFormat("ru", {
			day: "numeric",
			month: "numeric",
			year: "numeric",
		})

		const { limit, page } = req.query
		const skip = (page - 1) * limit
		const lte = new Date()
		const data = await NewsModel.find({ archived: false, date: { $lte: lte } })
			.sort({ date: -1 })
			.skip(skip)
			.limit(limit)
			.then(doc => doc.map(item => {
				const today = formatter.format(Date.now())
				const date = formatter.format(Date.parse(item.date.toString()))
				return { ...item.toObject(), date: (date === today) ? 'Сегодня' : date }
			}))

		const length = await NewsModel.find({ archived: false }).then(doc => doc.length)

		return res.json({ data, length })
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.get(
	"/photos-page",
	async (req: Request<{}, {}, {}, { page: number; limit: number }>, res) => {
		try {
			const formatter = Intl.DateTimeFormat("ru", {
				day: "numeric",
				month: "numeric",
				year: "numeric",
			})

			const { limit, page } = req.query
			const start = (page - 1) * limit
			const data: { data: IMatchPhoto[], length: number} = await MatchModel.find({ archived: false, photo: { $exists: true} })
				.sort({ date: -1 })
				.populate([
					{ path: 'homeTeam', model: TeamModel },
					{ path: 'guestTeam', model: TeamModel }
				])
				.then((doc) => {
					const result = doc.reduce((arr: IMatchPhoto[], item) => {
						const title = `${item.homeTeam.title} - ${item.guestTeam.title}`
						const today = formatter.format(Date.now())
						const date = formatter.format(Date.parse(item.date.toString()))
						if ( !item.photo || item.photo.length === 0 ) return arr
						const index = Math.round(Math.random() * item.photo?.length || 0)
						return arr.concat({
							_id: item._id, title,
							photo: item.photo?.[index] || '',
							date: date === today ? "Сегодня" : date,
						}) || []
					}, [])
					return { data: result.slice(start, +start + (+limit)), length: result.length }
				})
			
			return res.json(data)
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: "Что-то пошло не так..." })
		}
	}
)

router.get("/article-page/get-by-id/:id", async (req: Request<{id: string}>, res) => {
		try {
			const formatter = Intl.DateTimeFormat("ru", {
				day: "numeric",
				month: "numeric",
				year: "numeric",
			})

			const { id } = req.params
			const article = await NewsModel.findById(id).then(doc => {
				if ( !doc ) return doc
				const today = formatter.format(Date.now())
				const date = formatter.format(Date.parse(doc.date.toString()))
				return { ...doc.toObject(), date: (date === today) ? 'Сегодня' : date }
			})
			if ( !article ) {
				return res.status(500).json({ message: 'Новость не найдена' })
			}
			return res.json(article)
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: "Что-то пошло не так..." })
		}
	}
)

router.get(
	"/article-page/get-last/:id",
	async (req: Request<{ id: string }>, res) => {
		try {
			const formatter = Intl.DateTimeFormat("ru", {
				day: "numeric",
				month: "numeric",
				year: "numeric",
			})

			const { id } = req.params
			const lte = new Date()
			const articles = await NewsModel.find({
				archived: false,
				date: { $lte: lte },
				_id: { $ne: new Types.ObjectId(id) }
			}).sort({ date: -1 }).limit(2).then((doc) => doc.map(item => {
					const today = formatter.format(Date.now())
					const date = formatter.format(
						Date.parse(item.date.toString())
					)
					return {
						...item.toObject(),
						date: date === today ? "Сегодня" : date,
					}
				})
			)
			return res.json(articles)
		} catch (e) {
			console.log(e)
			return res.status(500).json({ message: "Что-то пошло не так..." })
		}
	}
)

export default router