import { FC } from 'react'
import AvatarComponent from '../../components/AvatarComponent'

interface IItemProps {
    name: string
    number?: string
    description?: string
    photo?: string
}

const Item: FC<IItemProps> = ({ description, name, number, photo }) => {
    return (
		<div className="position-relative h-100 shadow-sm d-flex flex-column justify-content-end">
			<AvatarComponent src={photo} />
			<div className="d-flex justify-content-center align-items-center bg-dark bg-opacity-75 position-absolute bottom-0 start-0 end-0 m-0">
				<span
					className="p-0 m-0 mt-2 pe-1 fyodor-bold text-primary"
					style={{ fontSize: "80px", lineHeight: "80px" }}
				>
					{number}
				</span>
				<div
					className={`d-flex flex-column justify-content-center my-2 
                        align-items-${number ? "start" : "center"}`
                    }
				>
					<span
						className={`text-white text-uppercase fs-5 w-100 lh-1 ibm-bold 
                        text-${number ? "start" : "center"}`}
						style={{ letterSpacing: '-2.5%' }}
					>
						{name}
					</span>
					<span
						className={`text-primary w-100 
                            text-${number ? "start" : "center"}`}
					>
						{description}
					</span>
				</div>
			</div>
		</div>
	)
}

export default Item