import { useEffect, useRef, useState } from "react"
import { Button, Col, Container, Placeholder, Row } from "react-bootstrap"
import { useMatchesQuery } from "../../app/mainPage.service"
import MatchCard from "../../components/MatchCard"

const Matches = () => {
	const { data: matches, isLoading, isError, isSuccess } = useMatchesQuery(undefined, { refetchOnMountOrArgChange: true })
	const formatter = useRef(
		new Intl.DateTimeFormat("ru", {
			month: "long",
			day: "numeric",
			weekday: "short",
			hour: "numeric",
			minute: "numeric",
		})
	)
	const carousel = useRef<HTMLDivElement | null>(null)
	const [number, setNumber] = useState(0)
	const [nextDisable, setNextDisable] = useState(false)
	const [cols, setCols] = useState(1)

	const prevHandler = () => {
		if ( !carousel.current || (number === 0) ) {
			return
		}
		setNumber(state => state - 1)
		/*const scroll = carousel.current.querySelector('div')?.offsetWidth || 0

		carousel.current.scrollLeft -= scroll*/
	}

	const nextHandler = () => {
		if (!carousel.current || (number >= (matches?.length || 0 - 1))) {
			return
		}
		setNumber(state => state + 1)
		/*const scroll = carousel.current.querySelector("div")?.offsetWidth || 0

		carousel.current.scrollLeft += scroll*/
	}

	useEffect(() => {
		if ( isSuccess ) {
			const index = matches?.findIndex(({ date }) => Date.now() < Date.parse(date.toString()))
			if ( index && index > 0 ) {
				setNumber(index - 1)
			}
		}
	}, [isSuccess])

	useEffect(() => {
		if (!carousel.current) {
			return
		}		
		const children = carousel.current.querySelectorAll<HTMLDivElement>("div.match-carousel-item")
		if ( children?.length === 0 ) {
			return
		}
		const left = Array.from(children)
			.slice(0, number)
			.reduce(
				(sum, { offsetWidth }) =>
					sum + offsetWidth,
				0
			)
		carousel.current.scrollTo({ left, top: 0, behavior: 'smooth' })
		setNextDisable(
			carousel.current.scrollWidth <=
				left + carousel.current.offsetWidth
		)
	}, [number])

	useEffect(() => {
		if (window.innerWidth >= 576) setCols(2)
		if (window.innerWidth >= 768) setCols(3)
		if (window.innerWidth >= 992) setCols(4)
	}, [])

    return (
		<section id="main-matches">
			<Container fluid className="p-0">
				<Container>
					<h3 className="text-uppercase mb-4">Расписание матчей</h3>
				</Container>
				{!isLoading && (!matches || matches?.length === 0) && (
					<div
						style={{ minHeight: "50vh" }}
						className="bg-light d-flex container"
					>
						<p className="m-auto text-center text-uppercase">
							Скоро здесь появятся матчи сезона
						</p>
					</div>
				)}
				{isLoading && (
					<Row
						xs={1}
						sm={2}
						md={3}
						xl={4}
						style={{ minHeight: "50vh" }}
					>
						{new Array(cols).fill(true).map((item, index) => (
							<Col key={index}>
								<Placeholder
									as="div"
									animation="glow"
									className="h-100"
								>
									<Placeholder xs={12} className="h-100" />
								</Placeholder>
							</Col>
						))}
					</Row>
				)}
				{matches && matches?.length > 0 && (
					<div className="position-relative">
						<div id="match-carousel-container" ref={carousel}>
							{matches.map((item) => (
								<div
									className="col-10 col-md-5 col-lg-4 col-xl-3 p-2 p-md-3 p-xl-4 
										d-flex justify-content-center align-items-stretch match-carousel-item"
									key={item._id.toString()}
								>
									<MatchCard
										id={item._id.toString()}
										home={item.homeTeam.title}
										guest={item.guestTeam.title}
										homeLogo={item.homeTeam.logo}
										guestLogo={item.guestTeam.logo}
										homeScore={item.homeTeamScore}
										guestScore={item.guestTeamScore}
										date={formatter.current.format(
											new Date(
												Date.parse(item.date.toString())
											)
										)}
										place={item.place}
										continous={
											Date.now() >
											Date.parse(item.date.toString())
										}
									/>
								</div>
							))}
						</div>
						<Container className="d-none d-sm-flex position-absolute top-50 start-50 translate-middle">
							<div className="col-11 d-flex justify-content-between mx-auto">
								<Button
									onClick={prevHandler}
									disabled={number <= 0}
									className="rounded-circle p-0"
									style={{
										opacity: "0.7",
									}}
								>
									<div
										className="arrow-right"
										style={{ transform: "rotate(180deg)" }}
									/>
								</Button>
								<Button
									onClick={nextHandler}
									disabled={nextDisable}
									className="rounded-circle p-0 bg-opacity-10"
									style={{
										opacity: "0.7",
									}}
								>
									<div className="arrow-right" />
								</Button>
							</div>
						</Container>
						<Container className="d-flex d-sm-none justify-content-between">
							<Button
								onClick={prevHandler}
								disabled={number <= 0}
								variant="link"
								className="p-0 d-flex align-items-center"
							>
								<div
									className={`arrow-right-${
										number <= 0 ? "secondary" : "primary"
									}`}
									style={{ transform: "rotate(180deg)" }}
								/>
								<span
									className={`text-${
										number <= 0 ? "secondary" : "primary"
									}`}
								>
									Прошедший
								</span>
							</Button>
							<Button
								onClick={nextHandler}
								disabled={nextDisable}
								variant="link"
								className="p-0 d-flex align-items-center"
							>
								<span
									className={`text-${
										nextDisable ? "secondary" : "primary"
									}`}
								>
									Будущий
								</span>
								<div
									className={`arrow-right-${
										nextDisable ? "secondary" : "primary"
									}`}
								/>
							</Button>
						</Container>
					</div>
				)}
			</Container>
		</section>
	)
}

export default Matches