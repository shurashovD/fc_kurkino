import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Form, Image, Spinner } from 'react-bootstrap'
import { IFootballerPayload } from '../../../shared'
import { alertSuccess } from '../../app/alertState'
import { useAppDispatch } from '../../app/hooks'
import { useUpdateFootballerMutation } from '../../app/squad.service'

interface IEditedItemProps {
	id: string
    birthday: string
	name: string
	number?: number
	post?: string
	src?: string
	cancelHandler: () => void
}

const EditedItem: FC<IEditedItemProps> = ({ id, birthday, name, number, post, src, cancelHandler }) => {
	const [state, setState] = useState({ name, number: number?.toString() || '', birthday: birthday || '', post: post || '' })
    const [update, { isSuccess, isLoading }] = useUpdateFootballerMutation()
    const dispatch = useAppDispatch()

	const handler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		if ( name === 'number' ) {
			if ( isNaN(parseInt(value)) && (value.length > 0) ) {
				return 
			}
		}
		setState((state) => ({ ...state, [name]: value }))
	}

	const saveHandler = () => {
		const number = state.number.length === 0 ? undefined : parseInt(state.number)
		const birthday = state.birthday.length === 0 ? undefined : state.birthday
		const post = state.post.length === 0 ? undefined : state.post
		const body: IFootballerPayload = {
			...state, number, birthday, post
		}
		update({ body, id })
	}

    useEffect(() => {
        if ( isSuccess ) {
			cancelHandler()
            dispatch(alertSuccess('Игрок успешно изменён'))
        }
    }, [isSuccess])

    return (
		<tr className="align-middle text-center">
			<td>{src && <Image width="50" src={src} alt="avatar" />}</td>
			<td>
				<Form.Control
					className="w-100"
					name="name"
					value={state.name}
					placeholder="Имя"
					onChange={handler}
				/>
			</td>
			<td>
				<Form.Control
					className="w-100"
					name="post"
					value={state.post}
					placeholder="Амплуа"
					onChange={handler}
				/>
			</td>
			<td>
				<Form.Control
					className="w-100 text-center"
					name="number"
					value={state.number}
					placeholder="Номер"
					onChange={handler}
				/>
			</td>
			<td>
				<Form.Control
					className="w-100"
					name="birthday"
					value={state.birthday}
					type="date"
					onChange={handler}
				/>
			</td>
			<td>
				{isLoading ? (
					<Spinner animation="border" size="sm" variant="primary" />
				) : (
					<Button
						variant="primary"
						disabled={state.name.length === 0}
						onClick={saveHandler}
					>
						Сохранить
					</Button>
				)}
			</td>
			<td>
				<Button variant="secondary" onClick={cancelHandler}>
					Отмена
				</Button>
			</td>
		</tr>
	)
}

export default EditedItem