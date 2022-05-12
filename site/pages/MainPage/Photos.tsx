import { useState } from "react"
import { Carousel, Container } from "react-bootstrap"
import { usePhotosQuery } from "../../app/mainPage.service"
import PhotoCarouselItem from "./PhotoCarouselItem"

const Photos = () => {
    const { data, isError } = usePhotosQuery(undefined, { refetchOnMountOrArgChange: true })
    const [index, setIndex] = useState(0)

    const handler = (event: number) => {
        setIndex(event)
    }

    return (
		<section id="main-photos">
			<Container fluid>
				<Container>
					<h3 className="text-uppercase mb-4">Фото клуба</h3>
					{(isError || data?.length === 0) && (
						<div
							style={{ minHeight: "50vh" }}
							className="bg-light d-flex"
						>
							<p className="m-auto text-center text-uppercase">
								Скоро здесь появятся фотографии клуба
							</p>
						</div>
					)}
					<Carousel
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
				</Container>
			</Container>
		</section>
	)
}

export default Photos