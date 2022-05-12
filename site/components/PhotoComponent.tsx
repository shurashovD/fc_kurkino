import { FC, useEffect } from "react";
import { Spinner } from "react-bootstrap";
import { useLazyStaticQuery } from '../app/file.service'

interface IPhotoComponentProps {
    src?: string
}

const PhotoComponent: FC<IPhotoComponentProps> = ({ src = '' }) => {
    const [trigger, { isFetching, isError, data }] = useLazyStaticQuery()

	useEffect(() => {
		const { abort } = trigger(src, true)

		return () => {
			abort()
		}
	}, [trigger])

    return (
		<div
			className="bg-light h-100 d-flex justify-content-center align-items-stretch"
			style={{ minHeight: "300px" }}
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
					className="w-100"
					src={data}
					alt="game"
					style={{ objectFit: "cover" }}
				/>
			)}
		</div>
	)
}

export default PhotoComponent