import { FC, useCallback, useState } from "react"
import { Placeholder } from "react-bootstrap"
import { useStaticQuery } from "../../app/file.service"

interface IPhotoCarouselItemProps {
    src: string
}

const PhotoCarouselItem: FC<IPhotoCarouselItemProps> = ({ src }) => {
    const { data, isError, isLoading } = useStaticQuery(src, { refetchOnMountOrArgChange: true })
    const [height, setHeight] = useState(216)

	const container = useCallback((element: HTMLDivElement) => {
        const div = element?.closest<HTMLDivElement>("div.carousel")
		setHeight((208 * (div?.offsetWidth || 350)) / 370)
	}, [])

    return (
		<div
			className={`w-100 overflow-hidden ${
				isError && "bg-light"
			}`}
			style={{ height: `${height}px` }}
            ref={container}
		>
			{isLoading && (
				<Placeholder as="div" animation="glow" className="h-100">
					<Placeholder xs={12} className="h-100 m-0 p-0" />
				</Placeholder>
			)}
			{data && (
				<img
					className="d-block w-100"
					src={data}
					alt="game"
					height={height}
				/>
			)}
		</div>
	)
}

export default PhotoCarouselItem