import { ChangeEvent, useEffect, useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { ITeamPayload } from "../../../shared"
import { useCreateTeamMutation } from "../../app/team.service"
import { useAppDispatch } from '../../app/hooks'
import { alertSuccess } from "../../app/alertState"

const initialState: ITeamPayload = { title: "", city: "" }

const Footer = () => {
    const [save, { isLoading, isSuccess }] = useCreateTeamMutation()
    const [state, setState] = useState(initialState)
	const dispatch = useAppDispatch()

    const handler = (event: ChangeEvent<HTMLInputElement>) => {
        setState(state => ({ ...state, [event.target.name]: event.target.value }))
    }

    const saveHandler = () => {
        save(state)
    }

    useEffect(() => {
        if ( isSuccess ) {
            setState(initialState)
			dispatch(alertSuccess('Команда успешно создана'))
        }
    }, [isSuccess])

    return (
		<tr className="text-center align-middle">
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
					<Spinner size="sm" variant="primary" animation="border" />
				) : (
					<Button
						size="sm"
						disabled={
							state.title.length === 0 || state.city.length === 0
						}
						onClick={saveHandler}
					>
						Сохранить
					</Button>
				)}
			</td>
			<td></td>
			<td></td>
		</tr>
	)
}

export default Footer