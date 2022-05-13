import { useCallback, useEffect, useRef, useState } from "react"
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useGetMatchQuery } from "../../app/matchPage.service"
import PhotoComponent from "../../components/PhotoComponent"
import Intro from "./Intro"
import IntroMobile from "./IntroMobile"
import MatchPlayer from "./MatchPlayer"

const limit = 1

const MatchPage = () => {
	const [state, setState] = useState<string[]>([])
	const [page, setPage] = useState(1)
	const {hash} = useLocation()
	const {id} = useParams()
	const navigate = useNavigate()
	const { data: match, isLoading } = useGetMatchQuery(id || '', {refetchOnMountOrArgChange: true})
	const [mobile, setMobile] = useState(true)
	const container = useRef<HTMLDivElement | null>(null)
	const [photo, setPhoto] = useState<string | undefined>()

	const photos = useCallback((photosBlock: HTMLHeadingElement) => {
		function getTop(element: HTMLElement, top = 0): number {
			const { parentElement, offsetTop } = element
			if (!(parentElement && offsetTop)) return top
			return getTop(parentElement, top + offsetTop)
		}

		if (!photosBlock) return

		if ( hash === '#photos' ) {
			const top = getTop(photosBlock)
			window.scrollTo(0, top - 550)
		}
	}, [hash])

	const handler = useCallback(() => {
		function getTop(element: HTMLElement, top = 0): number {
			const { parentElement, offsetTop } = element
			if (!(parentElement && offsetTop)) return top
			return getTop(parentElement, top + offsetTop)
		}

		if (!container.current || !match?.photo || isLoading) return
		const scroll =
			window.pageYOffset + document.documentElement.clientHeight
		const containerBottom =
			container.current.scrollHeight + getTop(container.current)
		if (scroll > containerBottom - 300) {
			if (page * limit < match.photo.length) {
				setPage((state) => state + 1)
			}
		}
	}, [isLoading, container])

	useEffect(() => {
		if ( window?.innerWidth > 576 ) setMobile(false)
	}, [])

	useEffect(() => {
		if (match?.photo) {
			setState(match.photo.slice(0, page * limit))
		}
	}, [match, page])

	useEffect(() => {
		document.addEventListener("scroll", handler)
		return () => {
			document.removeEventListener("scroll", handler)
		}
	}, [handler])

	return (
		<Container className="pt-5" id="current-match-page">
			<Modal
				show={!!photo}
				onHide={() => setPhoto(undefined)}
				fullscreen={true}
			>
				<Modal.Header
					closeButton
					className="border-0"
					style={{ zIndex: 1080 }}
				/>
				<Modal.Body className="text-center w-100 p-0 position-absolute">
					<div className="d-flex vh-100 w-100">
						<img
							src={photo || ""}
							alt="fc"
							className="w-100"
							style={{
								objectFit: "scale-down",
							}}
						/>
					</div>
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
			{isLoading && (
				<Spinner
					animation="border"
					variant="secondary"
					className="mx-auto my-5"
				/>
			)}
			{!isLoading && match && (
				<Container>
					<h3 className="text-uppercase mb-4">
						{`Матч ${match.homeTeam.title} - ${match.guestTeam.title}`}
					</h3>
					{mobile ? (
						<IntroMobile
							date={match.date.toString()}
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
					) : (
						<Intro
							date={match.date.toString()}
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
					)}
					<h3 className="text-uppercase mt-5 mb-4">Видео</h3>
					{match.video && match.video.length > 0 ? (
						match.video.map((item, index) => (
							<MatchPlayer key={`video_${index}`} src={item} />
						))
					) : (
						<p className="bg-light text-center text-uppercase py-5">
							Скоро здесь появятся видео матча
						</p>
					)}
					<h3
						className="text-uppercase mt-5 mb-4"
						ref={photos}
					>
						Фото
					</h3>
					{state.length > 0 ? (
						<Row
							xs={1}
							md={2}
							xl={3}
							className="mb-5 g-4"
							ref={container}
						>
							{state.map((item, index) => (
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
				</Container>
			)}
		</Container>
	)
}

export default MatchPage
