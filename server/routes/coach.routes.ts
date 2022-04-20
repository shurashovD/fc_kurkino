import { Request } from 'express'
import { Router } from 'express'
import bodyParser from 'body-parser'
import { ICoachPayload } from '../../shared'
import multer from 'multer'
import path from 'path'
import { constants } from 'fs'
import { access, mkdir, readdir, rm } from 'fs/promises'
import CoachModel from '../models/coachModel'

const router = Router()

const storage = multer.diskStorage({
	destination: async (req, file, cb) => {
		const { id } = req.params
		if (!id) {
			return
		}
		const logoPath = path.join(__dirname, "static", "uploads", "avatars", id)
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

const upload = multer({ storage })

router.get('/', async (req, res) => {
    try {
        const squad = await CoachModel.find({ archived: false })
        return res.json(squad)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.post('/', bodyParser.json(), async (req: Request<{}, {}, ICoachPayload>, res) => {
    try {
        const { name, post, birthday } = req.body
        const coach = new CoachModel({
            birthday, name, post
        })
        await coach.save()
        return res.end()
    }
    catch (e: any) {
        if (e.code === 11000) {
			return res.status(500).json({ message: "Тренер с таким именем уже существует" })
		}
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.put('/:id', bodyParser.json(), async (req: Request<{id: string}, {}, ICoachPayload>, res) => {
    try {
        const { id } = req.params
        const { name, post, birthday } = req.body
        await CoachModel.findByIdAndUpdate(id, {
            birthday, name, post
        })
        return res.end()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.delete('/:id', bodyParser.json(), async (req: Request<{id: string}, {}, {}>, res) => {
    try {
        const { id } = req.params
        await CoachModel.findByIdAndUpdate(id, { archived: true })
        return res.end()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.put('/avatar/:id', upload.single('avatar'), async (req: Request<{id: string}, {}, {}>, res) => {
    try {
        const { id } = req.params
        const file = req.file as Express.Multer.File
        const avatar = `/static/uploads/avatars/${id}/${file.filename}`
        await CoachModel.findByIdAndUpdate(id, { avatar })
        return res.end()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.delete('/avatar/:id', async (req: Request<{id: string}, {}, {}>, res) => {
    try {
        const { id } = req.params
        await CoachModel.findByIdAndUpdate(id, { $unset: { avatar: true } })
        return res.end()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

export default router