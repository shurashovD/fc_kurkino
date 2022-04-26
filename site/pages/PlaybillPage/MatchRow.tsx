import { FC } from "react"
import { Col, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import LogoComponent from "../../components/LogoComponent"

interface IMatchRowInterface {
    id: string
    continous: boolean
    date: string
    place?: string
    home: string
    guest: string
    homeLogo?: string
    guestLogo?: string
    homeFrom?: string
    guestFrom?: string
    homeScores?: number
    guestScore?: number
}

const MatchRow: FC<IMatchRowInterface> = (props) => {
    return (
		<Row className="shadow m-0 mb-3 p-0 py-4 match-row bg-white">
			<Col md={2} className="d-flex p-0">
				<p
					className={`m-auto p-3 py-4 text-center w-100 
                    text-${props.continous ? "dark" : "white"} 
                    bg-${props.continous ? "light" : "primary"} text-uppercase`}
				>
					{props.date}
				</p>
			</Col>
			<Col md={3} xl={4} className="d-flex">
				<small className="m-auto w-100 text-secondary text-uppercase text-center lh-sm">
					{props.place}
				</small>
			</Col>
			<Col
				md={2}
				xl={1}
				className="d-flex flex-column justify-content-start align-items-center"
			>
				<LogoComponent height={100} width={100} src={props.homeLogo} />
				<span className="text-uppercase text-center">{props.home}</span>
				<small className="text-uppercase text-center text-secondary">
					{props.homeFrom}
				</small>
			</Col>
			<Col md={2} xl={1} className="d-flex">
				<p
					className={`m-auto w-100 py-1 px-2 ibm-medium 
                        bg-${
							props.homeScores && props.guestScore
								? "dark"
								: "light"
						} 
                        text-uppercase text-center fs-3`}
				>
					{props.homeScores && props.guestScore ? (
						<>
							{props.homeScores}:{props.guestScore}
						</>
					) : (
						<>VS</>
					)}
				</p>
			</Col>
			<Col
				md={2}
				xl={1}
				className="d-flex flex-column justify-content-start align-items-center"
			>
				<LogoComponent height={100} width={100} src={props.guestLogo} />
				<span className="text-uppercase text-center">
					{props.guest}
				</span>
				<small className="text-uppercase text-center text-secondary">
					{props.guestFrom}
				</small>
			</Col>
			<Col
				md={1}
				xl={3}
				className="d-flex justify-content-center align-items-center"
			>
				{props.continous && (
					<NavLink
						to={`/match/${props.id}`}
						className="d-flex justify-content-center align-items-center"
					>
						<span>Смотреть детали</span>
						<div className="arrow-right-primary rounded-circle mt-1" />
					</NavLink>
				)}
			</Col>
		</Row>
	)
}

export default MatchRow