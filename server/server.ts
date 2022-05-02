import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import config from 'config'
import session from "express-session"
import MongoStore from "connect-mongo"
import teamRoutes from './routes/team.routes'
import matchRoutes from './routes/match.routes'
import squadRoutes from './routes/squad.routes'
import coachRoutes from "./routes/coach.routes"
import adminRoutes from './routes/admin.routes'
import siteRoutes from './routes/site.routes'
import { engine } from 'express-handlebars'
import authMiddleware from './middleware/auth.middleware'
import ssrRouter from './routes/ssr.routes'

const PORT = 3000

const app = express()

app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

const start = async () => {
    try {
        await mongoose.connect(config.get('mongoUri'))
        app.listen(PORT, () => {
			console.log(`Server is running on ${PORT}...`)
		})
    }
    catch (e) {
        console.log(e)
    }
}

start()

app.use('/static', express.static(path.join(__dirname, 'static')))

app.use(
	session({
		secret: config.get("sessionSecret"),
		resave: true,
		saveUninitialized: true,
		store: MongoStore.create({
			mongoUrl: config.get("mongoUri"),
		}),
	})
)

app.use("/admin", adminRoutes)

app.use("/api/site", siteRoutes)

app.use('/api/team', authMiddleware, teamRoutes)

app.use("/api/match", authMiddleware, matchRoutes)

app.use("/api/squad", authMiddleware, squadRoutes)

app.use("/api/coach", authMiddleware, coachRoutes)


app.get("*", ssrRouter)