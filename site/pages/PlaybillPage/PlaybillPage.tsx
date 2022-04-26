import { useState } from "react"
import { Button, Col, Container, Row } from "react-bootstrap"
import Continous from "./Continous"
import Futures from "./Futures"

const PlaybillPage = () => {
	const [tabIndex, setTabIndex] = useState(0)

	return (
		<Container fluid className="px-0" id="match-page">
			<Container>
				<Row>
					<Col xs={"auto"}>
						<Button
							variant="link"
							className={`${
								tabIndex === 0 && "fw-bold"
							} text-uppercase`}
							onClick={() => setTabIndex(0)}
						>
							Расписание
						</Button>
					</Col>
					<Col xs={"auto"}>
						<Button
							variant="link"
							className={`${
								tabIndex === 1 && "fw-bold"
							} text-uppercase`}
							onClick={() => setTabIndex(1)}
						>
							Результаты
						</Button>
					</Col>
				</Row>
			</Container>
			<hr />
			<Container>
				{tabIndex === 0 && <Futures />}
				{tabIndex === 1 && <Continous />}
			</Container>
		</Container>
	)
}

export default PlaybillPage
