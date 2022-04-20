import { Container } from "react-bootstrap"
import Intro from "./Intro"
import Matches from "./Matches"
import Photos from "./Photos"

const MainPage = () => {
    return (
        <Container fluid className="p-0">
            <Intro />
            <Matches />
            <Photos />
        </Container>
    )
}

export default MainPage