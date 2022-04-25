import { FC } from "react"
import { Col, Image, Placeholder, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useStaticQuery } from "../../app/file.service"
import noLogo from '../../img/no-logo.svg'

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
    const { data: homeLogo, isLoading: homeLoading, isError: homeError } = useStaticQuery(
        props.homeLogo || '', { refetchOnMountOrArgChange: true }
    )
    const { data: guestLogo, isLoading: guestLoading, isError: guestError } = useStaticQuery(
        props.guestLogo || '', { refetchOnMountOrArgChange: true }
    )

    return (
		<Row className="shadow m-0 mb-3 p-0 py-3 match-row bg-white">
			<Col md={2} className="d-flex p-0">
				<p
					className={`m-auto p-3 text-center w-100 
                    text-${props.continous ? "dark" : "white"} 
                    bg-${props.continous ? "light" : "primary"} text-uppercase`}
				>
					{props.date}
				</p>
			</Col>
			<Col md={3} xl={4} className="d-flex">
				<p className="m-auto w-100 text-secondary text-uppercase text-center">
					{props.place}
				</p>
			</Col>
			<Col
				md={2}
				xl={1}
				className="d-flex flex-column justify-content-center align-items-center"
			>
				<div
					className="d-flex justify-content-center align-items-center"
					style={{
						width: "60px",
						height: "60px",
						objectFit: "contain",
					}}
				>
					{homeError && <Image alt="logo" src={noLogo} />}
					{homeLoading && (
						<Placeholder
							as="div"
							anumation="glow"
							className="h-100 w-100"
						>
							<Placeholder xs={12} className="h-100 w-100" />
						</Placeholder>
					)}
					{homeLogo && <Image alt="logo" src={homeLogo} />}
				</div>
				<span className="text-uppercase text-center">{props.home}</span>
				<small className="text-uppercase text-center text-secondary">
					{props.homeFrom}
				</small>
			</Col>
			<Col md={2} xl={1} className="d-flex">
				<p
					className={`m-auto w-100 py-1 px-2 
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
				className="d-flex flex-column justify-content-center align-items-center"
			>
				<div
					className="d-flex justify-content-center align-items-center"
					style={{
						width: "60px",
						height: "60px",
						objectFit: "contain",
					}}
				>
					{guestError && <Image alt="logo" src={noLogo} />}
					{guestLoading && (
						<Placeholder
							as="div"
							anumation="glow"
							className="h-100 w-100"
						>
							<Placeholder xs={12} className="h-100 w-100" />
						</Placeholder>
					)}
					{guestLogo && <Image alt="logo" src={guestLogo} />}
				</div>
				<span className="text-uppercase text-center">
					{props.guest}
				</span>
				<small className="text-uppercase text-center text-secondary">
					{props.guestFrom}
				</small>
			</Col>
			<Col md={1} xl={3} className="d-flex justify-content-center align-items-center">
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