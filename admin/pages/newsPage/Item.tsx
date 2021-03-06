import { ChangeEvent, FC, useEffect } from 'react'
import { Button, Form, Image, Spinner } from 'react-bootstrap'
import { alertSuccess } from '../../app/alertState'
import { useAppDispatch } from '../../app/hooks'
import { useRemoveNewMutation, useUpdatePhotoMutation, useUpdateVideoMutation } from '../../app/newsService'

interface IItemProps {
	id: string
	date: string
	hasVideo: boolean
	src?: string
	title: string
	showPhotoHandler: (id: string) => void
	showTextHandler: (id: string) => void
	showVideoHandler: (id: string) => void
	editedHandler: (id: string) => void
}

const Item: FC<IItemProps> = ({ id, date, title, src, editedHandler, hasVideo, showPhotoHandler, showTextHandler, showVideoHandler }) => {
    const [upload, { isLoading, isSuccess }] = useUpdatePhotoMutation()
	const [uploadVideo, { isLoading: videoLoading, isSuccess: videoSuccess }] = useUpdateVideoMutation()
    const [remove, { isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveNewMutation()
    const dispatch = useAppDispatch()

    const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if ( file ) {
            const body = new FormData()
			body.append("photo", file)
			upload({ body, id })
        }
    }

	const videoHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0]
		if (file) {
			const body = new FormData()
			body.append("video", file)
			uploadVideo({ body, id })
		}
	}

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Фото успешно загружено'))
        }
    }, [isSuccess])

	useEffect(() => {
		if (videoSuccess) {
			dispatch(alertSuccess("Видео успешно загружено"))
		}
	}, [videoSuccess])

    useEffect(() => {
		if (removeSuccess) {
			dispatch(alertSuccess("Новость успешно удалена"))
		}
	}, [removeSuccess])

    return (
		<tr className="align-middle text-center">
			<td>
				{src ? (
					<Button
						className="m-0 p-0 bg-none"
						onClick={() => showPhotoHandler(id)}
					>
						<Image width="50" src={src} alt="news" />
					</Button>
				) : (
					<Form.Label className="m-0 p-0 w-50">
						<input
							type="file"
							accept="image/*"
							style={{
								width: 0,
								height: 0,
								margin: 0,
								display: "none",
							}}
							onChange={fileHandler}
							disabled={isLoading}
						/>
						<span className="btn btn-link m-0 p-0">Фото</span>
					</Form.Label>
				)}
				{isLoading && (
					<Spinner animation="border" variant="primary" size="sm" />
				)}
			</td>
			<td>{title}</td>
			<td>{date}</td>
			<td>
				<Button size="sm" onClick={() => showTextHandler(id)}>
					Текст
				</Button>
			</td>
			<td>
				{hasVideo ? (
					<Button
						className="m-0 bg-none"
						size="sm"
						onClick={() => showVideoHandler(id)}
					>
						Просмотреть
					</Button>
				) : (
					<Form.Label className="m-0 p-0 w-50">
						<input
							type="file"
							accept="video/*"
							style={{
								width: 0,
								height: 0,
								margin: 0,
								display: "none",
							}}
							onChange={videoHandler}
							disabled={videoLoading}
						/>
						<span className="btn btn-link m-0 p-0">Загрузить</span>
					</Form.Label>
				)}
				{videoLoading && (
					<Spinner animation="border" variant="primary" size="sm" />
				)}
			</td>
			<td>
				<Button
					variant="warning"
					size="sm"
					onClick={() => editedHandler(id)}
				>
					Изменить
				</Button>
			</td>
			<td>
				{removeLoading ? (
					<Spinner animation="border" size="sm" variant="danger" />
				) : (
					<Button
						variant="link"
						className="text-danger"
						size="sm"
						onClick={() => remove(id)}
					>
						Удалить...
					</Button>
				)}
			</td>
		</tr>
	)
}

export default Item