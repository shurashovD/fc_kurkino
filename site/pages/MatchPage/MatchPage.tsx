import { useEffect, useRef, useState } from "react"
import { Button, Carousel, Col, Container, Image, Modal, Row, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useGetMatchQuery } from "../../app/matchPage.service"
import PhotoComponent from "../../components/PhotoComponent"
import Intro from "./Intro"
import IntroMobile from "./IntroMobile"
import MatchPlayer from "./MatchPlayer"

const MatchPage = () => {
	const {id} = useParams()
	const navigate = useNavigate()
	const { data: match, isLoading } = useGetMatchQuery(id || '', {refetchOnMountOrArgChange: true})
	const [mobile, setMobile] = useState(true)
	const formatter = useRef(
		new Intl.DateTimeFormat('ru', {
			weekday: 'short',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		})
	)
	const [photo, setPhoto] = useState<string | undefined>()

	useEffect(() => {
		if ( window?.innerWidth > 576 ) setMobile(false)
	}, [])

	return (
		<Container className="pt-5" id="current-match-page">
			<Modal fullscreen={true} show={!!photo} onHide={() => setPhoto(undefined)} style={{
				maxHeight: '100vh'
			}}>
				<Modal.Header closeButton />
				<Modal.Body className="h-100 text-center">
					<img src={photo || ''} alt="fc" style={{
						objectFit: 'scale-down',
						width: 'auto',
						height: '100%'
					}} />
				</Modal.Body>
			</Modal>
			<Button
				variant="link"
				className="text-secondary mb-5 d-flex align-items-center"
				onClick={() => navigate(-1)}
			>
				<div
					className="arrow-right-secondary mt-1"
					style={{ transform: "rotate(180deg)" }}
				/>
				<span className="text-uppercase">назад</span>
			</Button>
			{ isLoading && <Spinner animation="border" variant="secondary" className="mx-auto my-5" /> }
			{ !isLoading && match && !mobile && (
				<Container>
					<h3 className="text-uppercase mb-4">
						{`Матч ${match.homeTeam.title} - ${match.guestTeam.title}`}
					</h3>
					<Intro
						date={formatter.current.format(
							Date.parse(match.date.toString())
						)}
						guest={match.guestTeam.title}
						home={match.homeTeam.title}
						guestFrom={match.guestTeam.city}
						guestLogo={match.guestTeam.logo}
						guestScore={match.guestTeamScore}
						homeFrom={match.homeTeam.city}
						homeLogo={match.homeTeam.logo}
						homeScore={match.homeTeamScore}
						place={match.place}
					/>
					<h3 className="text-uppercase mb-4">Фото</h3>
					{match.photo && match.photo.length > 0 ? (
						<Row md={2} xl={3} className="mb-5 g-4">
							{match?.photo?.map((item, index) => (
								<Col key={`photo_${index}`}>
									<Button
										variant="link"
										className="bg-transparent rounded-0 m-0 p-0 w-100"
										onClick={() => setPhoto(item)}
									>
										<PhotoComponent src={item} />
									</Button>
								</Col>
							))}
						</Row>
					) : (
						<p className="bg-light text-center text-uppercase py-5 mb-5">
							Скоро здесь появятся фотографии матча
						</p>
					)}
					<h3 className="text-uppercase mb-4">Видео</h3>
					{match.video && match.video.length > 0 ? (
						match.video.map((item) => <MatchPlayer src={item} />)
					) : (
						<p className="bg-light text-center text-uppercase py-5">
							Скоро здесь появятся видео матча
						</p>
					)}
				</Container>
			)}
			{ !isLoading && match && mobile && (
				<Container>
					<h3 className="text-uppercase mb-4">
						{`Матч ${match.homeTeam.title} - ${match.guestTeam.title}`}
					</h3>
					<IntroMobile
						date={formatter.current.format(
							Date.parse(match.date.toString())
						)}
						guest={match.guestTeam.title}
						home={match.homeTeam.title}
						guestFrom={match.guestTeam.city}
						guestLogo={match.guestTeam.logo}
						guestScore={match.guestTeamScore}
						homeFrom={match.homeTeam.city}
						homeLogo={match.homeTeam.logo}
						homeScore={match.homeTeamScore}
						place={match.place}
					/>
					<h3 className="text-uppercase mt-5 mb-4">Фото</h3>
					{match.photo && match.photo.length > 0 ? (
						<Carousel indicators={false} style={{ minHeight: '100px' }}>
							{match?.photo?.map((item, index) => (
								<Carousel.Item key={`_${index}`}>
									<PhotoComponent src={item} />
								</Carousel.Item>
							))}
						</Carousel>
					) : (
						<p className="bg-light text-center text-uppercase py-5 mb-5">
							Скоро здесь появятся фотографии матча
						</p>
					)}
					<h3 className="text-uppercase mt-5 mb-4">Видео</h3>
					{match.video && match.video.length > 0 ? (
						match.video.map((item, index) => <MatchPlayer key={`v_${index}`} src={item} />)
					) : (
						<p className="bg-light text-center text-uppercase py-5">
							Скоро здесь появятся видео матча
						</p>
					)}
				</Container>
			)}
		</Container>
	)
}

export default MatchPage
