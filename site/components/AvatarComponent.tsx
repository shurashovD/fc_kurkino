import { FC, useCallback, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { useLazyStaticQuery } from '../app/file.service'

interface IPhotoComponentProps {
    src?: string
}

const AvatarComponent: FC<IPhotoComponentProps> = ({ src = '' }) => {
    const [trigger, { isFetching, isError, data }] = useLazyStaticQuery()
	const [height, setHeight] = useState(0)
	const [width, setWidth] = useState(0)

	const container = useCallback((container: HTMLDivElement) => {
		if ( !container ) return
		const height = Math.round(4 * container.offsetWidth / 3)
		setHeight(height)
		setWidth(container.offsetWidth)
	}, [])

	useEffect(() => {
		const { abort } = trigger(src, true)

		return () => {
			abort()
		}
	}, [trigger])

    return (
		<div
			className="bg-light h-100 d-flex justify-content-center align-items-stretch"
			style={{ minHeight: `${height}px`, height: `${height}px` }}
			ref={container}
		>
			{isFetching && (
				<div className="m-auto text-center">
					<Spinner
						variant="secondary"
						animation="border"
					/>
				</div>
			)}
			{data && !isError && (
				<img
					width={width}
					height={height}
					src={data}
					alt="game"
				/>
			)}
		</div>
	)
}

export default AvatarComponent