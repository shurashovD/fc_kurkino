import { FC } from 'react'
import { Card, Col, Image, Placeholder, Row } from "react-bootstrap"
import { NavLink } from 'react-router-dom'
import { useStaticQuery } from '../app/file.service'
import noImage from '../img/no-image.jpg'

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
			<Card.Body className="p-4 rounded-0 d-flex flex-column">
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
						<p className="text-center text-uppercase">{home}</p>
					</Col>
					<Col className="d-flex flex-column justify-content-center">
						{homeScore?.toString() && guestScore?.toString() ? (
							<p className="ibm-medium fs-4 fs-xl-3 m-0 p-2 bg-dark text-center text-uppercase text-white">
								{homeScore?.toString()}:{guestScore?.toString()}
							</p>
						) : (
							<p className="ibm-medium fs-4 fs-xl-3 m-0 p-2 bg-light text-center text-uppercase">
								VS
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
						<p className="text-center text-uppercase">{guest}</p>
					</Col>
				</Row>
				<p className="text-center text-secondary text-uppercase">
					<small>{place}</small>
				</p>
				<div className="text-center mt-auto">
					<NavLink
						to={`/match/${id}`}
						className="d-flex justify-content-center align-items-center"
					>
						<span>Смотреть детали</span>
						<div className="arrow-right-primary rounded-circle mt-1" />
					</NavLink>
				</div>
			</Card.Body>
		</Card>
	)
}

export default MatchCard