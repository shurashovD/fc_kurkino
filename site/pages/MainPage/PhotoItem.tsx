import { FC, useCallback, useState } from "react"
import { Image, Placeholder } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useStaticQuery } from "../../app/file.service"

interface IPhotoItemProps {
    id: string
    src: string
    title: string
}

const PhotoItem: FC<IPhotoItemProps> = ({ id, src, title }) => {
    const { data, isLoading, isError } = useStaticQuery(src, { refetchOnMountOrArgChange: true })
    const [height, setHeight] = useState(216)

    const container = useCallback((element: HTMLDivElement) => {
        setHeight((208 * (element?.offsetWidth || 0)) / 370)
    }, [])

    return (
		<div
			className={`position-relative overflow-hidden ${
				isError && "bg-light"
			}`}
			ref={container}
			style={{ height: `${height}px` }}
		>
			{isLoading && (
				<Placeholder as="div" animation="glow" className="h-100">
					<Placeholder xs={12} className="h-100 m-0 p-0" />
				</Placeholder>
			)}
			{data && (
				<Image fluid
					src={data}
					style={{ objectFit: "cover" }}
					height={height}
				/>
			)}
			<NavLink
				to={`/match/${id}`}
				className="position-absolute bottom-0 start-0 end-0 bg-primary bg-opacity-50 m-0 p-2 p-lg-3 text-uppercase text-white photo-link"
			>
				{title}
			</NavLink>
		</div>
	)
}

export default PhotoItem