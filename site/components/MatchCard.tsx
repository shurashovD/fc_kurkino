import { FC } from 'react'
import { Card, Col, Image, Placeholder, Row } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import { useStaticQuery } from '../app/file.service'
import noImage from '../img/no-logo.svg'

interface IMatchCardProps {
	id: string
	date: string
	home: string
	guest: string
	homeLogo?: string
	guestLogo?: string
	homeScore?: number
	guestScore?: number
	place?: string
	continous: boolean
}

const MatchCard: FC<IMatchCardProps> = ({ id, continous, date, home, guest, homeLogo, guestLogo, homeScore, guestScore, place }) => {
	const { data: homeSrc, isLoading: homeLoading, isError: homeError, isSuccess: homeSuccess } = useStaticQuery(homeLogo || '')
	const { data: gouestSrc, isLoading: guestLoading, isError: guestError } = useStaticQuery(guestLogo || '')

    return (
		<Card>
			<Card.Header
				className={`text-uppercase text-center bg-${
					continous ? "light" : "primary"
				} text-${continous ? "dark" : "white"} rounded-0 py-3`}
			>
				{date}
			</Card.Header>
			<Card.Body className="p-4 pt-5 rounded-0 d-flex flex-column match-card-body">
				<Row xs={3}>
					<Col className="d-flex flex-column align-items-center">
						{homeLoading && (
							<Placeholder as="div" animation="glow">
								<Placeholder
									xs={12}
									className="card-logo-placeholder"
								/>
							</Placeholder>
						)}
						{homeSuccess && (
							<div className="card-image-container">
								<Image src={homeSrc} fluid />
							</div>
						)}
						{homeError && (
							<div className="card-image-container">
								<Image src={noImage} fluid />
							</div>
						)}
						<p className="text-center text-uppercase lh-1 text-nowrap text-truncate">
							{home}
						</p>
					</Col>
					<Col className="d-flex flex-column justify-content-center">
						{homeScore?.toString() && guestScore?.toString() ? (
							<p className="ibm-medium fs-4 m-0 p-2 bg-dark text-center text-uppercase text-white py-0">
								<span className="d-lg-none">
									{homeScore?.toString()}:
									{guestScore?.toString()}
								</span>
								<span className="d-none d-lg-block fs-3">
									{homeScore?.toString()}:
									{guestScore?.toString()}
								</span>
							</p>
						) : (
							<p className="ibm-medium fs-4 m-0 p-2 py-3 bg-light text-center text-uppercase py-0">
								<span className="d-lg-none">VS</span>
								<span className="d-none d-lg-block fs-3">
									VS
								</span>
							</p>
						)}
					</Col>
					<Col className="d-flex flex-column align-items-center">
						{guestLoading && (
							<Placeholder as="div" animation="glow">
								<Placeholder
									xs={12}
									className="card-logo-placeholder"
								/>
							</Placeholder>
						)}
						{homeSuccess && (
							<div className="card-image-container">
								<Image src={gouestSrc} fluid />
							</div>
						)}
						{guestError && (
							<div className="card-image-container">
								<Image src={noImage} fluid />
							</div>
						)}
						<p className="text-center text-uppercase lh-1 text-nowrap text-truncate">
							{guest}
						</p>
					</Col>
				</Row>
				<p className="text-center text-secondary text-uppercase lh-1">
					<small>{place}</small>
				</p>
				<div className="text-center mt-auto">
					{id !== "" && continous && (
						<NavLink
							to={`/match/${id}`}
							className="d-flex justify-content-center align-items-center"
						>
							<span>Смотреть детали</span>
							<div className="arrow-right-primary rounded-circle mt-1" />
						</NavLink>
					)}
				</div>
			</Card.Body>
		</Card>
	)
}

export default MatchCard