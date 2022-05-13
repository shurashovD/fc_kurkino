import { FC } from "react"
import { NavLink } from "react-router-dom"
import PhotoComponent from "../../components/PhotoComponent"

interface IItem {
    date: string
    id: string,
    photo?: string
    title: string
}

const Item: FC<IItem> = ({ date, id, photo, title }) => {
    return (
		<div className="position-relative h-100 bg-light">
			<PhotoComponent src={photo} />
			<div
				className="d-flex align-items-stretch 
                position-absolute bottom-0 start-0 end-0 bg-primary bg-opacity-50 m-0 p-2 px-lg-4 photo-link"
			>
				<div>
					<span className="vstack h-100 justify-content-between">
						<span className="invisible">ФК Куркино</span>
						<span className="text-white text-uppercase">
							{title}
						</span>
						<small className="text-uppercase text-success">
							{date}
						</small>
					</span>
				</div>
				<div className="ms-auto py-3">
					<NavLink to={`/news/${id}`}>
						<div className="arrow-right border rounded-circle ms-3" />
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Item