import { IMatch, IMatchPhoto, ITeam } from './../../shared/index.d';
import { Request, Router } from "express"
import path from 'path'
import MatchModel from '../models/matchModel'
import TeamModel from '../models/teamModel'

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
		const filePath = path.join(__dirname, "static", "site", file)
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

export default router