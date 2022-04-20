import ReactPlayer from "react-player"
import { useAppSelector } from "../../app/hooks"

const Player = () => {
    const { src } = useAppSelector(state => state.player)

    return (
        <ReactPlayer
            url={src}
            controls={true}
        />
    )
}

export default Player