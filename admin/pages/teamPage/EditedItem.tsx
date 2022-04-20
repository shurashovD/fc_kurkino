import { ChangeEvent, FC, useEffect, useState } from "react"
import { Button, Form, Spinner } from 'react-bootstrap'
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { useUpdateTeamMutation } from "../../app/team.service"

interface IItem {
    id: string,
    title: string,
    city?: string,
    callback: () => void
}

const EditedItem: FC<IItem> = ({ id, title, city, callback }) => {
	const [state, setState] = useState({ title, city: city || '' })
	const [update, { isLoading, isSuccess }] = useUpdateTeamMutation()
	const dispatch = useAppDispatch()

	const handler = (event: ChangeEvent<HTMLInputElement>) => {
		setState(state => ({ ...state, [event.target.name]: event.target.value }))
	}

	const updHandler = () => {
		update({ id, body: state })
	}

	useEffect(() => {
		if (isSuccess) {
			dispatch(alertSuccess("Команда успешно изменена"))
			callback()
		}
	}, [isSuccess])

	return (
		<tr className="text-center align-middle" key={id}>
			<td></td>
			<td>
				<Form.Label className="w-100 m-0">
					<Form.Control
						placeholder="Название"
						value={state.title}
						name="title"
						onChange={handler}
					/>
				</Form.Label>
			</td>
			<td>
				<Form.Label className="w-100 m-0">
					<Form.Control
						placeholder="Город"
						value={state.city}
						name="city"
						onChange={handler}
					/>
				</Form.Label>
			</td>
			<td className="text-center">
				{isLoading ? (
					<Spinner animation="border" size="sm" variant="success" />
				) : (
					<Button size="sm" onClick={updHandler} variant="success" disabled={ (state.title.length === 0) || (state.city.length === 0) }>
						Сохранить
					</Button>
				)}
			</td>
			<td className="text-center">
				<Button size="sm" onClick={callback} variant="secondary">
					Отмена
				</Button>
			</td>
			<td className="text-center"></td>
		</tr>
	)
}

export default EditedItem