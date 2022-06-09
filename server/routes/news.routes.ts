import bodyParser from 'body-parser';
import { Request, Router } from "express";
import { constants } from "fs";
import { access, mkdir, readdir, rm } from "fs/promises";
import multer from "multer";
import path from "path";
import NewsModel from "../models/NewsModel";

const router = Router()

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const { id } = req.params
		if (!id) {
			return
		}
		const logoPath = path.join(
			__dirname,
			"static",
			"uploads",
			"news",
			id
		)
		try {
			await access(logoPath, constants.W_OK)
			const files = await readdir(logoPath)
			for (const i in files) {
				try {
					await rm(path.join(logoPath, files[i]))
				} catch (e) {
					console.log(e)
				}
			}
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

const upload = multer({ storage })
const uploadVideo = multer({ storage: videoStorage })

router.get('/', async (req, res) => {
    try {
        const year = new Date().getFullYear()
		const gte = `${year}-01-01`
		const lte = `${year}-12-31`
        const news = await NewsModel.find({
			archived: false,
			date: { $gte: gte, $lte: lte }
		}).sort({ date: -1 })
        return res.json(news)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.post("/", bodyParser.json(), async (req: Request<{}, {}, { title: string, date: string }>, res) => {
	try {
		const { date, title } = req.body
		const newCurr = new NewsModel({ date, title })
        await newCurr.save()
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.put("/:id", bodyParser.json(), async (req: Request<{id: string}, {}, { title: string, date: string }>, res) => {
	try {
        const { id } = req.params
		const { date, title } = req.body
		await NewsModel.findByIdAndUpdate(id, { date, title })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.delete("/:id", async (req: Request<{id: string}, {}, {}>, res) => {
	try {
        const { id } = req.params
		await NewsModel.findByIdAndUpdate(id, { archived: true })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.put("/text/:id", bodyParser.json(), async (req: Request<{id: string}, {}, { text: string }>, res) => {
	try {
        const { id } = req.params
		const { text } = req.body
		await NewsModel.findByIdAndUpdate(id, { text })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.put("/photo/:id", upload.single('photo'), async (req: Request<{id: string}, {}, {}>, res) => {
	try {
        const { id } = req.params
        if ( req.file?.filename ) {
            const photo = `/static/uploads/news/${id}/${req.file.filename}`
			await NewsModel.findByIdAndUpdate(id, { photo })
        }
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.put("/video/:id", uploadVideo.single('video'), async (req, res) => {
	try {
		const { id } = req.params
		const { file } = req
		const newRecord = await NewsModel.findById(id)
		if (!newRecord) {
			return res.status(500).json({ message: "Новость не найдена" })
		}

		console.log(req.file)

		if ( !file ) {
			return res.status(500).json({ message: "Видео не загружено" })
		}

		newRecord.video = `/static/uploads/videos/${id}/${file.filename}`
		await newRecord.save()

		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.delete("/photo/:id", async (req: Request<{id: string}, {}, {}>, res) => {
	try {
        const { id } = req.params
        const newCurrent = await NewsModel.findById(id)
        if ( !newCurrent ) {
            throw new Error(`Не найдена новость ${id}`)
        }

        if ( newCurrent.photo ) {
            const filePath = path.join(__dirname, newCurrent.photo)
			try {
				await access(filePath, constants.W_OK)
				await rm(filePath)
			} catch {}
        }

        await NewsModel.findByIdAndUpdate(id, { $unset: { photo: true } })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

router.delete("/video/:id", async (req: Request<{id: string}, {}, {}>, res) => {
	try {
        const { id } = req.params
        const newCurrent = await NewsModel.findById(id)
        if ( !newCurrent ) {
            throw new Error(`Не найдена новость ${id}`)
        }

        if ( newCurrent.video ) {
            const filePath = path.join(__dirname, newCurrent.video)
			try {
				await access(filePath, constants.W_OK)
				await rm(filePath)
			} catch {}
        }

        await NewsModel.findByIdAndUpdate(id, { $unset: { video: true } })
		return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

export default router