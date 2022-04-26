import { Col, Container, Image, Row } from "react-bootstrap"
import president from '../../img/president.png'

const AboutPage = () => {
    return (
		<Container id="about-page" fluid>
			<Container>
				<h3 className="mb-3 text-uppercase">Руководство</h3>
				<Row xs={1} md={2} lg={3} classname="m-0">
					<Col>
						<div className="position-relative p-0">
							<Image
								alt="president"
								src={president}
								fluid
							/>
							<p
								className="text-center text-uppercase bg-white bg-opacity-75 
                                position-absolute bottom-0 start-0 end-0 m-0 p-2 lh-sm"
							>
								<span className="ibm-bold fw-bold">
									Желага
									<br />
									игорь витальевич
								</span>
								<br />
								<span className="text-secondary">
									Президент
								</span>
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</Container>
	)
}

export default AboutPage