import { FC, useState } from "react"
import { Button, Carousel, Container } from "react-bootstrap"
import { ITeamPage } from "../../../shared"
import Item from "./Item"

const FootballerCarousel: FC<{footballers: ITeamPage['footballers']}> = ({footballers}) => {
    const [index, setIndex] = useState(0)

	const prev = () => {
		if (footballers.length > 0) {
			if (index === 0) {
				setIndex(footballers.length - 1)
			} else {
				setIndex((state) => --state)
			}
		}
	}

	const next = () => {
		if (footballers.length > 0) {
			if (index === footballers.length - 1) {
				setIndex(0)
			} else {
				setIndex((state) => ++state)
			}
		}
	}

    return (
		<Container>
			<Carousel
				activeIndex={index}
				controls={false}
				interval={null}
				indicators={false}
				onSelect={(num) => setIndex(num)}
			>
				{footballers.map((item) => (
					<Carousel.Item key={`m_${item.id}`}>
						<Item
							name={item.name}
							photo={item.photo}
							number={item.number?.toString()}
							description={item.description}
						/>
					</Carousel.Item>
				))}
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
		</Container>
	)
}

export default FootballerCarousel