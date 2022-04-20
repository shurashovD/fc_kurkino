import { useCallback, useEffect } from 'react'
import { Alert, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { alertHide } from '../app/alertState'
import { useAppDispatch, useAppSelector } from '../app/hooks'

const AlertComponent = () => {
    const { show, text, variant } = useAppSelector(state => state.alertSlice)
    const dispatch = useAppDispatch()

    const dismiss = useCallback(() => {
		dispatch(alertHide())
	}, [dispatch])

	useEffect(() => {
		if (show) {
			setTimeout(() => {
				document.addEventListener("click", dismiss)
			}, 1500)
		} else {
			document.removeEventListener("click", dismiss)
		}
		return () => {
			document.removeEventListener("click", dismiss)
		}
	}, [dismiss, show])

    return (
		<Container fluid className="position-absolute top-0 start-0 end-0 p-1" style={{ zIndex: 1080 }}>
			<Alert show={show} variant={variant}>
				{text}
			</Alert>
		</Container>
	)
}

export default AlertComponent