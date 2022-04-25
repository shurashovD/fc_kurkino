import { FC, useRef, useState } from "react"
import { Button, Carousel } from "react-bootstrap"
import { IMatch } from "../../../shared"
import MatchCard from "../../components/MatchCard"

const MactchCarousel: FC<{matches: IMatch[], continous: boolean}> = ({ continous, matches }) => {
    const [index, setIndex] = useState(0)
    const formatterDate = useRef(
		Intl.DateTimeFormat("ru", {
			weekday: "short",
			day: "numeric",
			month: "long",
			hour: "numeric",
			minute: "numeric",
		})
	)

	const handler = (event: number) => {
		setIndex(event)
	}

	const prev = () => {
		if (matches.length > 0) {
			if (index === 0) {
				setIndex(matches.length - 1)
			} else {
				setIndex((state) => --state)
			}
		}
	}

	const next = () => {
		if (matches.length > 0) {
			if (index === matches.length - 1) {
				setIndex(0)
			} else {
				setIndex((state) => ++state)
			}
		}
	}
    return (
		<div>
			<Carousel
				className="d-sm-none"
				interval={null}
				indicators={false}
				activeIndex={index}
				onSelect={handler}
				controls={false}
			>
				{matches.map(
					({ _id, date, guestTeam, homeTeam, guestTeamScore, homeTeamScore, place }) => (
						<Carousel.Item key={`_${_id.toString()}`}>
							<MatchCard
								continous={continous}
								date={formatterDate.current.format(
									Date.parse(date.toString())
								)}
								guest={guestTeam.title}
								home={homeTeam.title}
								id={_id.toString()}
								guestLogo={guestTeam.logo}
								guestScore={guestTeamScore}
                                homeLogo={homeTeam.logo}
                                homeScore={homeTeamScore}
                                place={place}
							/>
						</Carousel.Item>
					)
				)}
			</Carousel>
			<div className="d-flex d-md-none justify-content-between m-3">
				<Button className="m-0 rounded-circle p-0" onClick={prev}>
					<div
						className="arrow-right"
						style={{
							transform: "rotate(180deg)",
						}}
					/>
				</Button>
				<Button className="m-0 rounded-circle p-0" onClick={next}>
					<div className="arrow-right" />
				</Button>
			</div>
		</div>
	)
}

export default MactchCarousel