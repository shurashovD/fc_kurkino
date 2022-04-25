import { useEffect, useRef, useState } from "react"
import { Container } from "react-bootstrap"
import { useFuturesQuery } from "../../app/matchPage.service"
import MactchCarousel from "./MatchCarousel"
import MatchRow from "./MatchRow"

const Futures = () => {
    const { data } = useFuturesQuery(undefined, {
		refetchOnMountOrArgChange: true,
	})
	const formatter = useRef(
		Intl.DateTimeFormat("ru", {
			month: "long",
		})
	)
    const formatterDate = useRef(
		Intl.DateTimeFormat("ru", {
			weekday: "short",
			day: "numeric",
			month: "long",
			hour: "numeric",
			minute: "numeric",
		})
	)
	const [mobile, setMobile] = useState(true)

    useEffect(() => {
		if (window.innerWidth > 576) {
			setMobile(false)
		}
	}, [])

	return (
		<Container>
			{data &&
				data.map(({ matches, month }) => (
					<Container key={`month_${month}`}>
						<h3 className="mt-5 mb-4 text-uppercase">
							{formatter.current.format(
								new Date(`1970-${month}-01`)
							)}
						</h3>
						{!mobile &&
							matches.map((item) => (
								<MatchRow
									key={item._id.toString()}
									id={item._id.toString()}
									continous={false}
									date={formatterDate.current.format(
										Date.parse(item.date.toString())
									)}
									guest={item.guestTeam.title}
									home={item.homeTeam.title}
									guestFrom={item.guestTeam.city}
									guestScore={item.guestTeamScore}
									homeFrom={item.homeTeam.city}
									homeScores={item.homeTeamScore}
									homeLogo={item.homeTeam.logo}
									guestLogo={item.guestTeam.logo}
									place={item.place}
								/>
							))}
						{mobile && (
							<MactchCarousel
								continous={false}
								matches={matches}
							/>
						)}
					</Container>
				))}
		</Container>
	)
}

export default Futures