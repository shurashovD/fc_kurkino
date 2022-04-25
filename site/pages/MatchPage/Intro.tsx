import { FC } from "react"
import { Col, Row } from "react-bootstrap"
import LogoComponent from "../../components/LogoComponent"

interface IIntroProps {
	home: string
	guest: string
	homeLogo?: string
	homeFrom?: string
	guestLogo?: string
	guestFrom?: string
	homeScore?: number
	guestScore?: number
	date: string
	place?: string
}

const Intro: FC<IIntroProps> = (props) => {
	return (
		<Row className="justify-content-center align-items-stretch bg-primary m-0 p-4 position-relative mb-5">
			<Col
				md={4}
				xl={3}
				className="d-flex flex-column align-items-center pt-1"
			>
				<LogoComponent height={200} src={props.homeLogo} width={200} />
				<h4 className="p-0 text-center text-uppercase m-0 mt-2">
					{props.home}
				</h4>
				<p className="p-0 text-center text-white m-0 mt-auto">
					{props.homeFrom}
				</p>
			</Col>
			<Col
				md={4}
				className="d-flex flex-column justify-content-center align-items-center"
			>
				<span className="bg-dark ibm-medium fs-3 text-white text-center p-3 py-1 mb-3">
					{`${props.homeScore?.toString() || "-"}:${
						props.guestScore?.toString() || "-"
					}`}
				</span>
				<span className="text-light text-uppercase text-center lh-sm">
					{props.place}
				</span>
			</Col>
			<Col
				md={4}
				xl={3}
				className="d-flex flex-column align-items-center pt-1"
			>
				<LogoComponent height={200} src={props.guestLogo} width={200} />
				<h4 className="p-0 text-center text-uppercase m-0 mt-2">
					{props.guest}
				</h4>
				<p className="p-0 text-center text-white m-0 mt-auto">
					{props.guestFrom}
				</p>
			</Col>
			<span className="position-absolute top-0 start-50 bg-light p-2 translate-middle-x text-center col-2">
				{props.date}
			</span>
		</Row>
	)
}

export default Intro
