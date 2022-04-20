import multer from 'multer';
import config from 'config'
import { Request, Router } from "express";
import { IMatchPayload } from "../../shared";
import MatchModel from "../models/matchModel";
import TeamModel from '../models/teamModel'
import bodyParser from "body-parser";
import { access, mkdir, rm } from 'fs/promises';
import { constants } from 'fs';
import path from 'path';

const router = Router()

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const { id } = req.params
		if (!id) {
			return
		}
		const logoPath = path.join(__dirname, "static", "uploads", "photos", id)
		try {
			await access(logoPath, constants.W_OK)
		} catch {
			await mkdir(logoPath, { recursive: true })
		}
		cb(null, logoPath)
	},
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}${path.extname(file.originalname)}`
		cb(null, fileName)
	},
})

const videoStorage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const { id } = req.params
		if (!id) {
			return
		}
		const logoPath = path.join(__dirname, "static", "uploads", "videos", id)
		try {
			await access(logoPath, constants.W_OK)
		} catch {
			await mkdir(logoPath, { recursive: true })
		}
		cb(null, logoPath)
	},
	filename: (req, file, cb) => {
		const fileName = `${Date.now()}${path.extname(file.originalname)}`
		cb(null, fileName)
	},
})

const uploadPhoto = multer({ storage })
const uploadVideo = multer({ storage: videoStorage })

router.get('/', async (req, res) => {
    try {
        const matches = await MatchModel.find({ archived: false }).populate([
			{ path: "homeTeam", model: TeamModel },
			{ path: "guestTeam", model: TeamModel },
		])
        return res.json(matches)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.get("/:id", async (req, res) => {
	try {
		const { id } = req.params
		const match = await MatchModel.findOne({
			_id: id,
			archived: false,
		}).populate([
			{ path: "homeTeam", model: TeamModel },
			{ path: "guestTeam", model: TeamModel },
		])
		if (!match) {
			return res.status(500).json({ message: "Ошибка получения матча" })
		}
		return res.json(match)
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.post("/", bodyParser.json(), async (req: Request<{}, {}, IMatchPayload>, res) => {
	try {
		const { date, homeTeam, guestTeam, place } = req.body
        const match = new MatchModel({ date, homeTeam, guestTeam, place })
        await match.save()
        return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.put("/:id", bodyParser.json(), async (req: Request<{id: string}, {}, IMatchPayload>, res) => {
	try {
        const { id } = req.params
		const { date, homeTeam, guestTeam, place } = req.body
		await MatchModel.findByIdAndUpdate(id, {
            date, homeTeam, guestTeam, place
        })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.delete("/:id", async (req, res) => {
	try {
        const { id } = req.params
		await MatchModel.findByIdAndUpdate(id, { archived: true })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})


router.put('/scores/:id', bodyParser.json(), async (req, res) => {
    try {
        const { id } = req.params
        const { guestTeamScore, homeTeamScore } = req.body
        await MatchModel.findByIdAndUpdate(id, { guestTeamScore, homeTeamScore })
        return res.end()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.delete("/scores/:id", bodyParser.json(), async (req, res) => {
	try {
		const { id } = req.params
		await MatchModel.findByIdAndUpdate(id, { $unset: { homeTeamScore: true, guestTeamScore: true } })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.put("/photos/:id", uploadPhoto.array('photos', 10), async (req, res) => {
	try {
		const { id } = req.params
		const files = req.files as Express.Multer.File[]
        const match = await MatchModel.findById(id)
        if ( !match ) {
            return res.status(500).json({ message: 'Матч не найден' })
        }

        const photos = files.map(
			({ filename }) => `/static/uploads/photos/${id}/${filename}`
		)
        if ( match.photo && (match.photo?.length > 0) ) {
            match.photo = match.photo?.concat(photos)
        }
        else {
            match.photo = photos
        }
		await match.save()
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.delete("/photos/:id", bodyParser.json(), async (req: Request<{id: string}, {}, { files: string[] }>, res) => {
	try {
		const { id } = req.params
		const { files } = req.body
		const match = await MatchModel.findById(id)
		if (!match) {
			return res.status(500).json({ message: "Матч не найден" })
		}

        for ( const i in files ) {
            const fileName = files[i].split('/').pop()
            if ( !fileName ) {
                continue
            }
            const filePath = path.join(__dirname, 'static', 'uploads', 'photos', id, fileName)
            try {
                await rm(filePath)
            }
            catch (e) {
                console.log(e)
            }
        }

        if ( match.photo ) {
            match.photo = match.photo.filter((photo) =>
				files.every((item: string) => item !== photo)
			)
			await match.save()
        }
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})


/*router.put('/video/:id', uploadVideo.single('football-video'), async (req, res) => {
	try {
		const { id } = req.params
		const file = req.file as Express.Multer.File
		if ( !file ) {
			return res.status(500).json({ message: "Видео не отправлено" })
		}

		const match = await MatchModel.findById(id)
		if (!match) {
			return res.status(500).json({ message: "Матч не найден" })
		}

		const videoPath = `/static/uploads/videos/${id}/${file.filename}`
		if (match.video && match.video?.length > 0) {
			match.video = match.video?.concat(videoPath)
		} else {
			match.video = [videoPath]
		}
		await match.save()
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})*/

router.put('/video/:id', bodyParser.json(), async (req, res) => {
	try {
		const { id } = req.params
		const { file } = req.body
		const match = await MatchModel.findById(id)
		if (!match) {
			return res.status(500).json({ message: "Матч не найден" })
		}

		const { Bucket } = config.get("yandex")
		const videoPath = `https://storage.yandexcloud.net/${Bucket}/${file}`
		if (match.video && match.video?.length > 0) {
			match.video = match.video?.concat(videoPath)
		} else {
			match.video = [videoPath]
		}
		await match.save()
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.delete("/video/:id", bodyParser.json(), async (req: Request<{id: string}, {}, { files: string[] }>, res) => {
	try {
		const { id } = req.params
		const { files } = req.body
		const match = await MatchModel.findById(id)
		if (!match) {
			return res.status(500).json({ message: "Матч не найден" })
		}

        /*for ( const i in files ) {
            const fileName = files[i].split('/').pop()
            if ( !fileName ) {
                continue
            }
            const filePath = path.join(__dirname, 'static', 'uploads', 'videos', id, fileName)
            try {
                await rm(filePath)
            }
            catch (e) {
                console.log(e)
            }
        }*/

        if ( match.video ) {
            match.video = match.video.filter((video) =>
				files.every((item: string) => item !== video)
			)
			await match.save()
        }
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

export default router