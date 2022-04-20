import { ChangeEvent, FC, useEffect, useState } from "react"
import { Form, Spinner } from "react-bootstrap"
import { alertError, alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { useVideosMutation } from "../../app/match.service"

interface IFooterProps {
    id: string
	prefix: string
}

const Footer: FC<IFooterProps> = ({ id, prefix }) => {
	const [isLoading, setLoading] = useState(false)
    const [upload, { isSuccess }] = useVideosMutation()
    const dispatch = useAppDispatch()

    const fileHandler = async (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (id && file) {
			const body = new FormData()
			const key = `${prefix}/${performance.now()}.${
				file.type.split("/")[1]
			}`
			body.append("key", key)
			body.append("file", file)
			const bucketName = "shurashovdbacket"
			const url = `https://storage.yandexcloud.net/${bucketName}`
			try {
				setLoading(true)
				await fetch(url, { body, method: 'POST'}).then(() => {
					upload({ body: { file: key }, id })
					setLoading(false)
				})
			}
			catch (e) {
				setLoading(false)
				console.log(e)
				dispatch(alertError('Ошибка! Видео не загружено!!!'))
			}
		}
	}

    useEffect(() => {
		if (isSuccess) {
			dispatch(alertSuccess("Видео успешно загружено"))
		}
	}, [isSuccess])

    return (
		<tr>
			<td></td>
			<td>
				{isLoading ? (
					<div className="align-middle m-0 p-0 text-center">
						<span className="me-3">Видео загружается</span>
						<Spinner
							animation="border"
							size="sm"
							variant="primary"
						/>
					</div>
				) : (
					<Form.Label>
						<span className="btn btn-link m-0 p-0 text-center">Добавить видео</span>
						<input
							type="file"
							style={{ width: 0, height: 0 }}
							onChange={fileHandler}
							disabled={isLoading}
							accept="video/*"
						/>
					</Form.Label>
				)}
			</td>
		</tr>
	)
}

export default Footer