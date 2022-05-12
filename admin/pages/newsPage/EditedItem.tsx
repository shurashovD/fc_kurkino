import { ChangeEvent, FC, useEffect, useState } from 'react'
import { Button, Form, Image, Spinner } from 'react-bootstrap'
import { alertSuccess } from '../../app/alertState'
import { useAppDispatch } from '../../app/hooks'
import { useUpdateNewMutation } from '../../app/newsService'

interface IEditedItemProps {
	id: string
    date: string
	title: string
	src?: string
	cancelHandler: () => void
}

const EditedItem: FC<IEditedItemProps> = ({ id, date, title, src, cancelHandler }) => {
	const [state, setState] = useState({ title, date })
    const [update, { isSuccess, isLoading }] = useUpdateNewMutation()
    const dispatch = useAppDispatch()

	const handler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setState((state) => ({ ...state, [name]: value }))
	}

	const saveHandler = () => {
		update({ body: state, id })
	}

    useEffect(() => {
        if ( isSuccess ) {
			cancelHandler()
            dispatch(alertSuccess('Новость успешно изменена'))
        }
    }, [isSuccess])

    return (
		<tr className="align-middle text-center">
			<td>{src && <Image width="50" src={src} alt="avatar" />}</td>
			<td>
				<Form.Control
					className="w-100"
					name="title"
					value={state.title}
					placeholder="Название"
					onChange={handler}
				/>
			</td>
			<td>
				<Form.Control
					className="w-100"
					name="date"
					value={state.date}
					type="date"
					onChange={handler}
				/>
			</td>
			<td />
			<td>
				{isLoading ? (
					<Spinner animation="border" size="sm" variant="primary" />
				) : (
					<Button
						variant="primary"
						disabled={(state.title.length === 0) || (state.date === '')}
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