import { FC, useCallback, useState } from "react"
import { Container } from "react-bootstrap"
import Player from 'react-player'

interface IMatchPlayer {
    src: string
}

const MatchPlayer: FC<IMatchPlayer> = ({ src }) => {
    const [width, setWidth] = useState(320)

    const container = useCallback((div: HTMLDivElement) => {
        setWidth(div?.offsetWidth || 320)
    }, [])

    return <Container className="position-relative mb-3 p-0" ref={container}>
        <Player
            controls={true}
            width={width}
            url={src}
        />
    </Container>
}

export default MatchPlayer