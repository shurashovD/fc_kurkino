import { writeFile } from "fs"
import { readFile } from "fs/promises"
import { convert, resize } from "imagemagick"

convert.path = "C:/Program Files/ImageMagick-7.1.0-Q16-HDRI/convert.exe"

export async function resizeImg(
	inputPath: string,
	outputPath: string,
	width: number
) {
	try {
		const srcData = await readFile(inputPath, "binary")
		await new Promise((resolve, reject) => {
			resize({ srcData, width }, (err, stdout) => {
				if (err) reject(err)
				writeFile(outputPath, stdout, { encoding: "binary" }, (err) => {
					if (err) reject(err)
					resolve(outputPath)
				})
				resolve(outputPath)
			})
			resolve(outputPath)
		})
	} catch (e) {
		throw e
	}
}