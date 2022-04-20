import { useEffect } from "react"
import { Button, Image, Modal, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { logoViewHide } from "../../app/logoViewState"
import { useDeleteLogoMutation } from "../../app/team.service"

const LogoView = () => {
    const { show, id, src } = useAppSelector(state => state.logoViewState)
    const [remove, { isLoading, isSuccess }] = useDeleteLogoMutation()
    const dispatch = useAppDispatch()

    const handler = () => {
        if ( id ) {
            remove(id)
        }
    }

    const dismissHandler = () => {
        dispatch(logoViewHide())
    }

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(logoViewHide())
            dispatch(alertSuccess('Логотип успешно удалён'))
        }
    }, [isSuccess])

    return (
		<Modal centered aria-labelledby="logoView" show={show} onHide={dismissHandler}>
			<Modal.Header closeButton />
			<Modal.Body className="text-center">
				{src && <Image alt="logo-view" src={src} width="250" />}
			</Modal.Body>
			<Modal.Footer>
				{isLoading ? (
					<Spinner animation="border" className="danger" />
				) : (
					<Button variant="danger" onClick={handler}>
						Удалить лого
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}

export default LogoView