import { FC } from "react"
import { Button } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import PhotoComponent from "../../components/PhotoComponent"

interface IItem {
    date: string
    id: string,
	handler: (photo: string) => void
    photo: string
    title: string
}

const Item: FC<IItem> = ({ date, id, handler, photo, title }) => {
	const clickHandler = () => {
		handler(photo)
	}

    return (
		<div className="position-relative h-100">
			<Button
				disabled={!photo}
				variant="link"
				className="m-0 p-0 rounded-0 w-100"
				onClick={clickHandler}
			>
				{photo && <PhotoComponent src={photo} />}
			</Button>
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
						<span className="text-uppercase text-success">
							{date}
						</span>
					</span>
				</div>
				<div className="ms-auto py-3">
					<NavLink to={`/match/${id}`}>
						<div className="arrow-right border rounded-circle ms-3" />
					</NavLink>
				</div>
			</div>
		</div>
	)
}

export default Item