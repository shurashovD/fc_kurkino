import { ChangeEvent, useEffect, useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { IFootballerPayload } from "../../../shared"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { useCreateFootballerMutation } from "../../app/squad.service"

const initialState = {
	name: "",
	number: "",
	birthday: "",
	post: "",
}

const Footer = () => {
    const [state, setState] = useState(initialState)
    const [create, { isLoading, isSuccess }] = useCreateFootballerMutation()
    const dispatch = useAppDispatch()

    const handler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		if (name === "number") {
			if (isNaN(parseInt(value)) && value.length > 0) {
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
		create(body)
	}

    useEffect(() => {
        if ( isSuccess ) {
			setState(initialState)
            dispatch(alertSuccess('Игрок успешно создан'))
        }
    }, [isSuccess])

    return (
		<tr className="text-center align-middle">
			<td></td>
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
			<td></td>
		</tr>
	)
}

export default Footer