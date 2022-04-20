import { FC, useEffect } from "react"
import { Button, Image, Modal, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from '../../app/hooks'
import { useRemoveCoachAvatarMutation } from "../../app/coach.service"

interface IAvatarModalProps {
    id: string
    src: string
    show: boolean
    dismissHandler: () => void
}

const AvatarModal: FC<IAvatarModalProps> = ({ id, src, show, dismissHandler }) => {
    const [remove, { isSuccess, isLoading }] = useRemoveCoachAvatarMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Аватар успешно удалён'))
        }
    }, [isSuccess])

    return (
		<Modal
			centered
			aria-labelledby="logoView"
			show={show}
			onHide={dismissHandler}
		>
			<Modal.Header closeButton />
			<Modal.Body className="text-center">
				<Image alt="avatar-view" src={src} width="250" />
			</Modal.Body>
			<Modal.Footer>
				{isLoading ? (
					<Spinner animation="border" className="danger" />
				) : (
					<Button variant="danger" onClick={() => remove(id)}>
						Удалить аватар
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}

export default AvatarModal