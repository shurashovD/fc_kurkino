import { FC, useEffect } from "react"
import { Button, Image, Modal, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from '../../app/hooks'
import { useRemovePhotoMutation } from "../../app/newsService"

interface IPhotoModalProps {
    id: string
    src: string
    show: boolean
    dismissHandler: () => void
}

const PhotoModal: FC<IPhotoModalProps> = ({ id, src, show, dismissHandler }) => {
    const [remove, { isSuccess, isLoading }] = useRemovePhotoMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Фото успешно удалено'))
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
				<Image alt="avatar-view" src={src} fluid />
			</Modal.Body>
			<Modal.Footer>
				{isLoading ? (
					<Spinner animation="border" className="danger" />
				) : (
					<Button variant="danger" onClick={() => remove(id)}>
						Удалить фото
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}

export default PhotoModal