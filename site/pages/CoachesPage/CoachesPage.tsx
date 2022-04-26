import { Col, Container, Row } from "react-bootstrap"
import { useSquadQuery } from "../../app/coachPage.service"
import PhotoComponent from "../../components/PhotoComponent"

const CoachesPage = () => {
    const { data } = useSquadQuery(undefined, { refetchOnMountOrArgChange: true })

    return (
		<Container id="coaches-page" fluid>
			{data && (
				<Container>
					<h3 className="mb-3 text-uppercase">Тренерский штаб</h3>
					<Row xs={1} md={2} lg={3} className="g-4">
                        {
                            data.map((item) => (
                                <Col key={item._id.toString()}>
                                    <div className="position-relative bg-light h-100"
                                        style={{ minHeight: '200px' }}
                                    >
                                        <PhotoComponent
                                            src={item.avatar}
                                        />
                                        <p
                                            className="position-absolute bottom-0 start-0 end-0 bg-white bg-opacity-75 
                                                text-center m-0 p-2 d-flex flex-column align-items-center"
                                        >
                                            <span className="text-center text-uppercase ibm-bold">
                                                {
                                                    item.name.trimStart().split(' ').map((str, index) => (
                                                        <span key={`${item._id.toString()}_${index}_name`}>
                                                            <span>{str}</span>
                                                            {(index === 0) ? <br/> : <span>{" "}</span>}
                                                        </span>
                                                    ))
                                                }
                                            </span>
                                            <span className="text-center text-secondary text-uppercase">
                                                {item.post}
                                            </span>
                                        </p>
                                    </div>
                                </Col>
                            ))
                        }
                    </Row>
				</Container>
			)}
		</Container>
	)
}

export default CoachesPage