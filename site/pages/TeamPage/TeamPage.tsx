import { MouseEvent, useEffect, useState } from "react"
import { Button, Carousel, Col, Container, Row } from "react-bootstrap"
import { useTeamQuery } from "../../app/teamPage.service"
import FootballerCarousel from "./FootballerCarousel"
import Item from "./Item"

const TeamPage = () => {
    const { data } = useTeamQuery(undefined, { refetchOnMountOrArgChange: true })
    const [tabIndex, setTabIndex] = useState(0)
	const [mobile, setMobile] = useState(true)

    const tabHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const { index } = event.currentTarget.dataset
        if ((typeof index !== 'undefined') && !isNaN(parseInt(index))) {
			setTabIndex(parseInt(index))
		}
    }

    useEffect(() => {
        if (window.innerWidth > 576) setMobile(false)
    }, [])

    return (
		<Container fluid className="min-vh-100 px-0" id="team-page">
			{data && (
				<Container>
					<Row className="justify-content-center justify-content-sm-start">
						<Col xs={"auto"} md={3} lg={2}>
							<Button
								variant="link"
								className={`${tabIndex === 0 && "fw-bold"} 
                                        text-uppercase`}
								data-index={0}
								onClick={tabHandler}
							>
								Все
							</Button>
						</Col>
						{data.map(({ role }, index) => (
							<Col
								xs={"auto"}
								md={3}
								lg={2}
								key={`tab_${index + 1}`}
							>
								<Button
									variant="link"
									className={`${
										tabIndex === index + 1 && "fw-bold"
									} 
                                        text-uppercase`}
									data-index={index + 1}
									onClick={tabHandler}
								>
									{role}
								</Button>
							</Col>
						))}
					</Row>
					<hr />
				</Container>
			)}
			{data && (
				<Container>
					{data
						.slice(
							tabIndex === 0 ? 0 : tabIndex - 1,
							tabIndex === 0 ? undefined : tabIndex
						)
						.map(({ role, footballers }, index) => (
							<Container key={`team_${index}`}>
								<h3 className="mt-5 mb-1 text-uppercase">
									{role}
								</h3>
								{mobile ? (
									<FootballerCarousel
										footballers={footballers}
									/>
								) : (
									<Row md={2} xl={3} className="g-4 mb-5">
										{footballers.map(
											({
												id,
												name,
												number,
												description,
												photo,
											}) => (
												<Col key={id}>
													<Item
														name={name}
														photo={photo}
														number={number?.toString()}
														description={
															description
														}
													/>
												</Col>
											)
										)}
									</Row>
								)}
							</Container>
						))}
				</Container>
			)}
		</Container>
	)
}

export default TeamPage