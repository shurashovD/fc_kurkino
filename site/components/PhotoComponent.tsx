import { FC } from "react";
import { Image, Placeholder } from "react-bootstrap";
import { useStaticQuery } from '../app/file.service'

interface IPhotoComponentProps {
    src?: string
}

const PhotoComponent: FC<IPhotoComponentProps> = ({ src = '' }) => {
    const {data, isLoading, isError} = useStaticQuery(src, { refetchOnMountOrArgChange: true })

    return (
		<div
			className={`${isError && "bg-light"} h-100 d-flex justify-content-end align-items-stretch`}
			style={{ minHeight: '200px' }}
		>
			{isLoading && (
				<Placeholder as="div" animation="glow" className="h-100 w-100">
					<Placeholder xs={12} className="h-100 m-0 p-5 w-100" />
				</Placeholder>
			)}
			{data && !isError && (
				<Image fluid
					src={data}
				/>
			)}
		</div>
	)
}

export default PhotoComponent