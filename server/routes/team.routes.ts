import { Request, Router } from "express"
import path from 'path'
import TeamModel from "../models/teamModel"
import multer from "multer"
import bodyParser from "body-parser"
import { ITeam, ITeamPayload } from "../../shared"
import { access, mkdir, readdir, rm } from "fs/promises"
import { constants } from "fs"

const router = Router()

const storage = multer.diskStorage({
    destination: async (req, file, cb) => {
        const { id } = req.params
        if ( !id ) {
            return
        }
        const logoPath = path.join(__dirname, 'static', 'uploads', 'logos', id)
        try {
            await access(logoPath, constants.W_OK)
            const files = await readdir(logoPath)
            for ( const i in files ) {
                try {
                    await rm(path.join(logoPath, files[i]))
                }
                catch (e) {
                    console.log(e)
                }
            }
        }
        catch {
            await mkdir(logoPath, { recursive: true })
        }
        cb(null, logoPath)
    },
    filename: (req, file, cb) => {
        const fileName = `${Date.now()}${path.extname(file.originalname)}`
        cb(null, fileName)
    }
})

const upload = multer({ storage })

// получить все команды;
router.get('/', async (req, res) => {
    try {
        const teams = await TeamModel.find({ archived: { $ne: true } })
        return res.json(teams)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Что-то пошло не так..." })
    }
})

// получить команду по id;
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const team = await TeamModel.findOne({ archived: { $ne: true }, _id: id })
        return res.json(team)
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Что-то пошло не так..." })
    }
})

// создать новую команду;
router.post('/', bodyParser.json(), async (req: Request<{}, {}, ITeamPayload>, res) => {
    try {
        const { city, title } = req.body
        const team = new TeamModel({ city, title })
        await team.save()
        return res.end()
    }
    catch (e: any) {
        if (e.code === 11000) {
			return res.status(500).json({ message: "Команда с таким названием уже существует" })
		}
        console.log(e)
        return res.status(500).json({ message: "Что-то пошло не так..." })
    }
})

// изменить команду;
router.put('/:id', bodyParser.json(), async (req: Request<{ id: string }, {}, ITeam>, res) => {
    try {
        const { id } = req.params
        const { city, title } = req.body
        await TeamModel.findByIdAndUpdate(id, { city, title })
        return res.end()
    }
    catch (e: any) {
        if (e.code === 11000 || e.code === 11001) {
			return res
				.status(500)
				.json({ message: "Команда с таким названием уже существует" })
		}
        console.log(e)
        return res.status(500).json({ message: "Что-то пошло не так..." })
    }
})

// загрузить логотип команды;
router.put('/upload-logo/:id', upload.single('logo'), async (req, res) => {
    try {
        const { id } = req.params
        if (req.file?.filename) {
            const logo = `/static/uploads/logos/${id}/${req.file.filename}`
			await TeamModel.findByIdAndUpdate(id, { logo })
            return res.end()
        }
        else {
            return res.status(500).json({ message: 'Логотип не сохранён' })
        }
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Что-то пошло не так..." })
    }
})

// удалить логотип команды;
router.delete("/logo/:id", async (req, res) => {
	try {
		const { id } = req.params
        const team = await TeamModel.findById(id)
        if ( !team ) {
            return res.status(500).json({ message: 'Команда не найдена' })
        }
        if ( team.logo ) {
            try {
				await rm(path.join(__dirname, team.logo))
			} catch (e) {
				console.log(e)
			}
			await TeamModel.findByIdAndUpdate(id, { $unset: { logo: true } })
        }
        return res.end()
	} catch (e) {
		console.log(e)
		return res.status(500).json({ message: "Что-то пошло не так..." })
	}
})

// удалить команду;
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params
        await TeamModel.findByIdAndUpdate(id, { archived: true })
        return res.end()
    }
    catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Что-то пошло не так..." })
    }
})

export default router