import { constants } from "fs"
import { access, mkdir, readdir } from "fs/promises"
import path from "path"
import { resizeImg } from "./handlers/image.hendler"

const inputDir = path.join(__dirname, 'static', 'uploads', 'photos')
const outputDir = path.join(__dirname, 'photos')

async function start() {
	try {
        try {
            await access(outputDir, constants.W_OK)
        }
        catch {
            await mkdir(outputDir, { recursive: true })
        }

		const dirs = await readdir(inputDir)
		let counter = 0
		for (const i in dirs) {
			const dir = dirs[i]
			const files = await readdir(path.join(inputDir, dir))
			for (const i in files) {
				const file = files[i]
				const inputPath = path.join(inputDir, dir, file)
				const outputPath = path.join(outputDir, file)
				await resizeImg(inputPath, outputPath, 1440)
				console.log(++counter)
			}
		}
	} catch (e) {
		console.log(e)
	}
}

start()

/*
async function start() {
	try {
		const dirs = await readdir(inputDir)
		let counter = 0
		for (const i in dirs) {
			const dir = dirs[i]
			const files = await readdir(path.join(inputDir, dir))
			for (const i in files) {
				const file = files[i]
				const inputPath = path.join(inputDir, dir, file)
				const outputPath = path.join(outputDir, file)
				const args = [
					inputPath,
					"-filter",
					"Triangle",
					"-define",
					"filter:support=2",
					"-thumbnail",
					width,
					outputPath,
				]
				await new Promise((resolve, reject) => {
					convert(args, (err) => {
						if (err) reject(err)
						resolve(true)
					})
				})
				console.log(++counter)
			}
		}
	} catch (e) {
		console.log(e)
	}
}*/