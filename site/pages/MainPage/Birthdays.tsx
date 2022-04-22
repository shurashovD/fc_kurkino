import { useEffect, useState } from "react"
import { Button, Carousel, Container } from "react-bootstrap"
import { useBirthdaysQuery } from "../../app/mainPage.servie"
import BirthdayCarouselItem from "./BirthdayCarouselItem"
import BirthdayItem from "./BirthdayItem"

const Birthdays = () => {
    const { data, isError } = useBirthdaysQuery(undefined, { refetchOnMountOrArgChange: true })
    const [index, setIndex] = useState(0)
	const [mobile, setMobile] = useState(true)

    const prev = () => {
        if ( data && (data?.length > 0)) {
            if (index === 0) {
				setIndex(data.length - 1)
			} else {
				setIndex((state) => --state)
			}
        }
    }

    const next = () => {
        if ( data && (data?.length > 0)) {
            if ( index === (data.length - 1)) {
                setIndex(0)
            }
            else {
                setIndex(state => ++state)
            }
        }
    }

	useEffect(() => {
		if (window.innerWidth > 576) {
			setMobile(false)
		}
	}, [])

    return (
		<section id="main-birthdays">
			<Container fluid>
				<Container>
					<h3 className="text-uppercase mb-4">Дни рождения</h3>
					{(isError || data?.length === 0) && (
						<div
							style={{ minHeight: "50vh" }}
							className="bg-light d-flex"
						>
							<p className="m-auto text-center text-uppercase">
								Скоро здесь появятся ближайшие дни рождения
								футболистов и их тренеров
							</p>
						</div>
					)}
					<div className="d-none d-md-block pt-4">
						{!mobile && data?.map(
							({ _id, name, today, date, photo, post }) => (
								<BirthdayItem
									key={_id.toString()}
									name={name}
									date={date}
									src={photo}
									post={post}
									today={today}
								/>
							)
						)}
					</div>
					{mobile && data && (
						<div className="d-md-none">
							<Carousel
								activeIndex={index}
								controls={false}
								interval={null}
								indicators={false}
								onSelect={(num) => setIndex(num)}
							>
								{data.map(
									({
										_id,
										name,
										today,
										date,
										photo,
										post,
									}) => (
										<Carousel.Item
											key={`m_${_id.toString()}`}
										>
											<BirthdayCarouselItem
												date={date}
												name={name}
												post={post}
												src={photo}
												today={today}
											/>
										</Carousel.Item>
									)
								)}
							</Carousel>
						</div>
					)}
					{mobile && <div className="d-flex d-md-none justify-content-between m-3">
						<Button className="m-0 rounded-circle p-0" onClick={prev}>
							<div className="arrow-right" style={{
                                transform: 'rotate(180deg)'
                            }} />
						</Button>
						<Button className="m-0 rounded-circle p-0" onClick={next}>
							<div className="arrow-right" />
						</Button>
					</div>}
				</Container>
			</Container>
		</section>
	)
}

export default Birthdays