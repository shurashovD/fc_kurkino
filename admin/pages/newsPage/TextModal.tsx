import { FC, useEffect, useState } from "react"
import { Button, Form, Modal, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from '../../app/hooks'
import { useUpdateTextMutation } from "../../app/newsService"

interface ITextModalProps {
    id: string
    text: string
    show: boolean
    dismissHandler: () => void
}

const TextModal: FC<ITextModalProps> = ({ id, text, show, dismissHandler }) => {
	const [state, setState] = useState(text)
	const [update, { isSuccess, isLoading }] = useUpdateTextMutation()
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (isSuccess) {
			dismissHandler()
			dispatch(alertSuccess("Текст новости сохранён"))
			setState('')
		}
	}, [isSuccess])

	useEffect(() => {
		setState(text)
	}, [text])

	return (
		<Modal
			centered
			aria-labelledby="logoView"
			show={show}
			onHide={dismissHandler}
		>
			<Modal.Header closeButton />
			<Modal.Body className="text-center">
				<Form.Control
					as="textarea"
					rows={16}
					onChange={event => setState(event.target.value)}
					value={state}
				/>
			</Modal.Body>
			<Modal.Footer>
				{isLoading ? (
					<Spinner animation="border" className="danger" />
				) : (
					<Button onClick={() => update({ body: { text: state }, id })}>
						Сохранить
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}

export default TextModal