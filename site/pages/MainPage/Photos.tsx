import { useEffect, useState } from "react"
import { Carousel, Col, Container, Row } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { usePhotosQuery } from "../../app/mainPage.servie"
import PhotoCarouselItem from "./PhotoCarouselItem"
import PhotoItem from "./PhotoItem"

const Photos = () => {
    const { data, isSuccess, isError } = usePhotosQuery(undefined, { refetchOnMountOrArgChange: true })
    const [title, setTitle] = useState('')
    const [index, setIndex] = useState(0)
	const [mobile, setMobile] = useState(true)

    const handler = (event: number) => {
        setIndex(event)
        setTitle(data?.[event].title || "")
    }

    useEffect(() => {
        if (isSuccess && data?.[0].title) {
            setTitle(data[0].title)
        }
    }, [isSuccess])

	useEffect(() => {
		if ( window.innerWidth > 576 ) {
			setMobile(false)
		}
	}, [])

    return (
		<section id="main-photos">
			<Container fluid>
				<Container>
					<h3 className="text-uppercase mb-4">галерея матчей</h3>
					{(isError || data?.length === 0) && (
						<div
							style={{ minHeight: "50vh" }}
							className="bg-light d-flex"
						>
							<p className="m-auto text-center text-uppercase">
								Скоро здесь появятся фотографии сезона
							</p>
						</div>
					)}
					{!mobile && data && (
						<Row
							sm={1}
							md={2}
							lg={3}
							className="g-4 d-none d-sm-flex"
						>
							{data?.map(({ _id, photo, title }, index) => (
								<Col key={`photo_${index}`}>
									<PhotoItem
										id={_id.toString()}
										src={photo}
										title={title}
									/>
								</Col>
							))}
						</Row>
					)}
					{mobile && (
						<Carousel
							className="d-sm-none"
							interval={null}
							indicators={false}
							activeIndex={index}
							onSelect={handler}
						>
							{data?.map(({ photo }, index) => (
								<Carousel.Item key={`m_photo_${index}`}>
									<PhotoCarouselItem src={photo} />
								</Carousel.Item>
							))}
						</Carousel>
					)}
					{mobile && (
						<p className="bg-primary text-white text-uppercase p-2 d-sm-none w-100">
							<NavLink to="/" className="text-white">
								{title}
							</NavLink>
						</p>
					)}
				</Container>
			</Container>
		</section>
	)
}

export default Photos