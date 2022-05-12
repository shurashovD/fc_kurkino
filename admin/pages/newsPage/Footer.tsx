import { ChangeEvent, useEffect, useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { useCreateNewMutation } from "../../app/newsService"

const initialState = {
	title: "",
	date: "",
}

const Footer = () => {
    const [state, setState] = useState(initialState)
    const [create, { isLoading, isSuccess }] = useCreateNewMutation()
    const dispatch = useAppDispatch()

    const handler = (event: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target
		setState((state) => ({ ...state, [name]: value }))
	}

    const saveHandler = () => {
		create(state)
	}

    useEffect(() => {
        if ( isSuccess ) {
			setState(initialState)
            dispatch(alertSuccess('Новость успешно создана'))
        }
    }, [isSuccess])

    return (
		<tr className="text-center align-middle">
			<td></td>
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
			<td></td>
		</tr>
	)
}

export default Footer