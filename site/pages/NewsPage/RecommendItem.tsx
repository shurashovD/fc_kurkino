import { FC } from "react"
import { NavLink } from "react-router-dom"
import PhotoComponent from "../../components/PhotoComponent"

interface IItem {
    date: string
    id: string,
    photo?: string
    title: string
}

const RecommendItem: FC<IItem> = ({ date, id, photo, title }) => {
    return (
		<div className="bg-light mb-3">
			{photo && <PhotoComponent src={photo} />}
			<div
				className="d-flex align-items-stretch 
                w-100 bg-primary bg-opacity-50 m-0 p-2 px-lg-4 photo-link"
			>
				<div>
					<span className="vstack h-100 justify-content-between">
						<span className="invisible">ФК Куркино</span>
						<span className="text-white text-uppercase">
							{title}
						</span>
						<span className="text-uppercase text-success">
							{date}
						</span>
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

export default RecommendItem