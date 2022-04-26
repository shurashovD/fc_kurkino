import { Button, Container } from "react-bootstrap"
import Birthdays from "./Birthdays"
import Intro from "./Intro"
import Matches from "./Matches"
import Photos from "./Photos"

const MainPage = () => {
	const handler = () => {
		window.scrollTo(0, 0)
	}
	
    return (
		<Container fluid className="p-0">
			<Intro />
			<Matches />
			<Photos />
			<Birthdays />
			<div className="d-none d-lg-flex position-fixed bottom-0 start-0 end-0 m-5 justify-content-end">
				<Button
					variant="link"
					onClick={handler}
				>
					<svg
						width="54"
						height="54"
						viewBox="0 0 54 54"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							fillRule="evenodd"
							clipRule="evenodd"
							d="M51.4286 2.57143H2.57143V51.4286H51.4286V2.57143ZM0 0V54H54V0H0ZM39.5324 34.2828C39.0606 34.8135 38.248 34.8613 37.7172 34.3895L27 24.8631L16.2827 34.3895C15.752 34.8613 14.9394 34.8135 14.4676 34.2828C13.9958 33.752 14.0437 32.9394 14.5744 32.4676L26.1458 22.1819C26.6329 21.7489 27.367 21.7489 27.8542 22.1819L39.4256 32.4676C39.9563 32.9394 40.0041 33.752 39.5324 34.2828Z"
							fill="#009640"
						/>
					</svg>
				</Button>
			</div>
		</Container>
	)
}

export default MainPage