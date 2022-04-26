import { FC } from 'react'
import PhotoComponent from '../../components/PhotoComponent'

interface IItemProps {
    name: string
    number?: string
    description?: string
    photo?: string
}

const Item: FC<IItemProps> = ({ description, name, number, photo }) => {
    return (
        <div className="position-relative h-100 shadow-sm">
            <PhotoComponent src={photo} />
            <div className="d-flex justify-content-center align-items-stretch bg-dark bg-opacity-25 position-absolute bottom-0 start-0 end-0 m-0">
                <span className="p-0 m-0 d-flex justify-content-center align-items-center fs-4 fyodor-bold">{number}</span>
                <div className={`d-flex flex-column justify-content-${number ? "start" : "center"} align-items-start`}>
                    <span className="text-white text-uppercase fs-5 text-center w-100">{name}</span>
                    <span className="text-primary text-center w-100">{description}</span>
                </div>
            </div>
        </div>
    )
}

export default Item