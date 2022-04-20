import { Router } from 'express'
import bodyParser from 'body-parser'
import UserModel from '../models/userModel'
import md5 from 'md5'
import path from 'path'
import { readFile } from 'fs/promises'

const router = Router()

router.get('/', (req, res) => {
    try {
        return res.render("login")
    }
    catch (e) {
        console.log(e)
        return res.send('Что-то пошло не так...')
    }
})

router.post("/", bodyParser.urlencoded({ extended: false }), async (req, res) => {
	try {
		const { login, pass } = req.body
		const user = await UserModel.findOne({ login, pass: md5(pass) })
		if (user) {
            req.session.admin = true
			return res.redirect("/admin/panel")
		}
        return res.redirect("/admin")
	} catch (e) {
		console.log(e)
		return res.send("Что-то пошло не так...")
	}
})

router.get('/panel', async (req, res) => {
    try {
        if (req.session.admin) {
            const tempPath = path.join(
				__dirname,
				"static",
				"admin",
				"index.html"
			)
			const template = await readFile(tempPath, { encoding: "utf-8" })
            return res.send(template)
        }
        return res.redirect('/admin')
    }
    catch (e) {
        console.log(e)
		return res.send("Что-то пошло не так...")
    }
})

export default router