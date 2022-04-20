import { ChangeEvent, FC, useEffect } from 'react'
import { Button, Form, Image, Spinner } from 'react-bootstrap'
import { alertSuccess } from '../../app/alertState'
import { useRemoveCoachMutation, useUploadCoachAvatarMutation } from '../../app/coach.service'
import { useAppDispatch } from '../../app/hooks'

interface IItemProps {
	id: string
    birthday: string
	name: string
	post?: string
	src?: string
	showAvatarHandler: (id: string) => void
	editedHandler: (id: string) => void
}

const Item: FC<IItemProps> = ({ id, birthday, name,  post, src, editedHandler, showAvatarHandler }) => {
    const [upload, { isLoading, isSuccess }] = useUploadCoachAvatarMutation()
    const [remove, { isLoading: removeLoading, isSuccess: removeSuccess }] = useRemoveCoachMutation()
    const dispatch = useAppDispatch()

    const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if ( file ) {
            const body = new FormData()
			body.append("avatar", file)
			upload({ body, id })
        }
    }

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Аватар успешно загружен'))
        }
    }, [isSuccess])

    useEffect(() => {
		if (removeSuccess) {
			dispatch(alertSuccess("Тренер успешно удалён"))
		}
	}, [removeSuccess])

    return (
		<tr className="align-middle text-center">
			<td>
				{src ? (
					<Button
						className="m-0 p-0 bg-none"
						onClick={() => showAvatarHandler(id)}
					>
						<Image width="50" src={src} alt="avatar" />
					</Button>
				) : (
					<Form.Label className="m-0 p-0 w-50">
						<input
							type="file"
							accept="image/*"
							style={{ width: 0, height: 0, margin: 0, display: 'none' }}
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
			<td>{name}</td>
			<td>{post || "Не указано"}</td>
			<td>{birthday || "Не указано"}</td>
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