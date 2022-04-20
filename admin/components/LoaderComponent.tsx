import { Container, Spinner } from "react-bootstrap"

const LoaderComponent = () => {
    return (
        <Container fluid className="position-fixed top-0 bottom-0 start-0 end-0 bg-light bg-opacity-50 d-flex" style={{ zIndex: 1080 }}>
            <Spinner animation="border" variant="primary" className="m-auto" />
        </Container>
    )
}

export default LoaderComponent