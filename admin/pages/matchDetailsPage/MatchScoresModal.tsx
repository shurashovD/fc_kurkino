import { ChangeEvent, useEffect, useState } from "react"
import { Button, Col, Form, Modal, Row, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useScoresMutation } from "../../app/match.service"
import { hideMatchScoresModal } from "../../app/matchScoresModalState"

const initialState = { homeTeamScore: "", guestTeamScore: "" }

const MatchScoresModal = () => {
    const { guest, home, homeScores, guestScores, id, show } = useAppSelector(
		(state) => state.matchScoresModal
	)
    const [state, setState] = useState({
		homeTeamScore: homeScores?.toString() || "",
		guestTeamScore: guestScores?.toString() || "",
	})
    const dispatch = useAppDispatch()
    const [setScores, { isLoading, isSuccess }] = useScoresMutation()

    const handler = (event: ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target
        if ( value === '' ) {
            setState(state => ({ ...state, [event.target.name]: value }))
        }
        if ( isNaN(+value) ) {
            return
        }
        setState((state) => ({ ...state, [event.target.name]: value.trim() }))
    }
    
    const dismissHandler = () => {
        dispatch(hideMatchScoresModal())
        setState(initialState)
    }

    const saveHandler = () => {
        if (
			Number.isNaN(state.homeTeamScore) ||
			Number.isNaN(state.guestTeamScore) ||
			!id
		) {
			return
		}

        const body = {
			homeTeamScore: parseInt(state.homeTeamScore),
			guestTeamScore: parseInt(state.guestTeamScore),
		}

        setScores({ body, id})
        
    }

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(hideMatchScoresModal())
            setState(initialState)
            setTimeout(() => {
                dispatch(alertSuccess("Счет матча успешно установлен"))
            }, 1000)
        }
    }, [isSuccess])

    return (
		<Modal
			centered
			aria-labelledby="scores"
			show={show}
			onHide={dismissHandler}
		>
			<Modal.Header closeButton />
			<Modal.Body>
				<Row>
					<Col
						sm={5}
						className="d-flex flex-column align-items-center justify-content-between"
					>
						<p className="fs-3 text-center">{home}</p>
						<Form.Control
							className="text-center w-50"
							value={state.homeTeamScore}
							name="homeTeamScore"
							onChange={handler}
						/>
					</Col>
					<Col sm={2}></Col>
					<Col
						sm={5}
						className="d-flex flex-column align-items-center justify-content-between"
					>
						<p className="fs-3 text-center">{guest}</p>
						<Form.Control
							className="text-center w-50"
							value={state.guestTeamScore}
							name="guestTeamScore"
							onChange={handler}
						/>
					</Col>
				</Row>
			</Modal.Body>
			<Modal.Footer className="justify-content-center">
				{isLoading ? (
					<Spinner animation="border" variant="primary" size="sm" />
				) : (
					<Button
						onClick={saveHandler}
						disabled={
							isNaN(parseInt(state.homeTeamScore)) ||
							isNaN(parseInt(state.guestTeamScore))
						}
					>
						Сохранить счёт
					</Button>
				)}
			</Modal.Footer>
		</Modal>
	)
}

export default MatchScoresModal