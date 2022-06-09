import { FC, useEffect } from "react"
import { Button, Modal, Spinner } from "react-bootstrap"
import ReactPlayer from "react-player"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from '../../app/hooks'
import { useRemoveVideoMutation } from "../../app/newsService"

interface IVideoModalProps {
	id: string
	src: string
	show: boolean
	dismissHandler: () => void
}

const VideoModal: FC<IVideoModalProps> = ({ id, src, show, dismissHandler }) => {
    const [remove, { isSuccess, isLoading }] = useRemoveVideoMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Видео успешно удалено'))
        }
    }, [isSuccess])

    return (
		<Modal
			centered
			aria-labelledby="videoView"
			show={show}
			onHide={dismissHandler}
		>
			<Modal.Header closeButton />
			<Modal.Body className="text-center">
				<div>
					<ReactPlayer url={src} controls={true} width={'100%'} />
				</div>
			</Modal.Body>
			<Modal.Footer>
				{isLoading ? (
					<Spinner animation="border" className="danger" />
				) : (
					<Button variant="danger" onClick={() => remove(id)}>
						Удалить видео
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}

export default VideoModal