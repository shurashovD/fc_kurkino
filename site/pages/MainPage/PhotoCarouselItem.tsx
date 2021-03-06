import { FC, useCallback, useEffect, useState } from "react"
import { Placeholder } from "react-bootstrap"
import { useLazyStaticQuery } from "../../app/file.service"

interface IPhotoCarouselItemProps {
    src: string
}

const PhotoCarouselItem: FC<IPhotoCarouselItemProps> = ({ src }) => {
    const [ trigger, { data, isError, isLoading } ] = useLazyStaticQuery()
    const [height, setHeight] = useState(216)

	const container = useCallback((element: HTMLDivElement) => {
        const div = element?.closest<HTMLDivElement>("div.carousel")
		const calcHeight = 2257 * (div?.offsetWidth || 350) / 3385
		setHeight(Math.min(calcHeight, window.innerHeight - 20))
	}, [])

	useEffect(() => {
		const { abort } = trigger(src)
		return () => {
			abort()
		}
 	}, [trigger])

    return (
		<div
			className={`w-100 text-center ${isError && "bg-light"}`}
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
					width="auto"
					height={height}
					src={data}
					alt="game"
				/>
			)}
		</div>
	)
}

export default PhotoCarouselItem