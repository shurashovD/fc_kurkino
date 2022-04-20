import { Request } from 'express'
import { Router } from 'express'
import FootballerModel from '../models/footballerModel'
import bodyParser from 'body-parser'
import { IFootballerPayload } from '../../shared'
import multer from 'multer'
import path from 'path'
import { constants } from 'fs'
import { access, mkdir, readdir, rm } from 'fs/promises'

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
        const squad = await FootballerModel.find({ archived: false })
        return res.json(squad)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.post('/', bodyParser.json(), async (req: Request<{}, {}, IFootballerPayload>, res) => {
    try {
        const { name, post, birthday, number } = req.body
        const footballer = new FootballerModel({
            birthday, name, number, post
        })
        await footballer.save()
        return res.end()
    }
    catch (e: any) {
        if (e.code === 11000) {
			return res.status(500).json({ message: "Игрок с таким именем уже существует" })
		}
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

router.put('/:id', bodyParser.json(), async (req: Request<{id: string}, {}, IFootballerPayload>, res) => {
    try {
        const { id } = req.params
        const { name, post, birthday, number } = req.body
        await FootballerModel.findByIdAndUpdate(id, {
            birthday, name, number, post
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
        await FootballerModel.findByIdAndUpdate(id, { archived: true })
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
        await FootballerModel.findByIdAndUpdate(id, { avatar })
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
        await FootballerModel.findByIdAndUpdate(id, { $unset: { avatar: true } })
        return res.end()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: 'Что-то пошло не так...' })
    }
})

export default router