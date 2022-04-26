import { FC } from "react"
import { Col, Container, Row } from "react-bootstrap"
import LogoComponent from "../../components/LogoComponent"

interface IIntroProps {
	home: string
	guest: string
	homeLogo?: string
	homeFrom?: string
	guestLogo?: string
	guestFrom?: string
	homeScore?: number
	guestScore?: number
	date: string
	place?: string
}

const IntroMobile: FC<IIntroProps> = (props) => {
	return (
        <Container className="shadow p-0">
            <p className="bg-light p-3 m-0 text-uppercase text-center">
                {props.date}
            </p>
            <div className="bg-primary px-3 py-5">
                <Row>
                    <Col xs={5} 
                        className="d-flex flex-column align-items-center pt-1"
                    >
                        <LogoComponent height={100} src={props.homeLogo} width={100} />
                        <h4 className="p-0 text-center text-uppercase m-0 mt-2">
                            {props.home}
                        </h4>
                        <p className="p-0 text-center text-white m-0 mt-auto">
                            {props.homeFrom}
                        </p>
                    </Col>
                    <Col xs={2}
                        className="d-flex flex-column justify-content-center align-items-center"
                    >
                        <span className="bg-dark ibm-medium fs-3 text-white text-center p-3 py-1 mb-3">
                            {`${props.homeScore?.toString() || "-"}:${
                                props.guestScore?.toString() || "-"
                            }`}
                        </span>
                    </Col>
                    <Col xs={5} 
                        className="d-flex flex-column align-items-center pt-1"
                    >
                        <LogoComponent height={100} src={props.guestLogo} width={100} />
                        <h4 className="p-0 text-center text-uppercase m-0 mt-2">
                            {props.guest}
                        </h4>
                        <p className="p-0 text-center text-white m-0 mt-auto">
                            {props.guestFrom}
                        </p>
                    </Col>
                </Row>
                <p className="text-secondary text-center mt-4">
                    {props.place}
                </p>
            </div>
        </Container>
	)
}

export default IntroMobile
