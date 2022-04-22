import { FC, useCallback, useRef, useState } from "react"
import { Col, Placeholder, Row } from "react-bootstrap"
import { useStaticQuery } from "../../app/file.service"

interface IBirthdayItemProps {
    date: string
    name: string
    post: string
    src: string
    today: boolean
}

const BirthdayItem: FC<IBirthdayItemProps> = ({ date, name, post, src, today }) => {
    const {data, isLoading, isError} = useStaticQuery(src)
    const [photoSize, setPhotoSize] = useState(0)
    const photoCol = useCallback((col: HTMLDivElement) => {
        setPhotoSize((col?.offsetWidth || 10) - 10)
    }, [])
    const formatter = useRef(
        Intl.DateTimeFormat('ru', {
            day: 'numeric',
            month: 'long'
        })
    )

    return (
		<Row className="m-0 p-0 mb-4">
			<Col
				md={12}
				lg={today ? 10 : 8}
				className={`m-0 mx-auto p-0 py-3 birthday-item-row-${
					today ? "primary" : "secondary"
				}`}
			>
				<Row className="m-0 p-0">
					<Col
						md={5}
						className="m-0 p-0 px-2 px-lg-3 d-flex position-relative"
					>
						<p
							className={`m-auto p-2 px-3 text-center text-uppercase 
                                text-${today ? "success" : "white"} bg-${
								today ? "primary" : "secondary"
							} border border-white w-100`}
							style={{ zIndex: "1" }}
						>
							{today ? (
								<>Сегодня день рождения отмечает</>
							) : (
								<>
									День рождения{" "}
									{formatter.current.format(Date.parse(date))}
								</>
							)}
						</p>
						<div
							className={`position-absolute w-100 start-50 bg-${
								today ? "white" : "secondary"
							} m-0 top-50 translate-middle`}
							style={{ zIndex: "0", padding: '2.5px' }}
						/>
					</Col>
					<Col md={2} ref={photoCol} className="p-0">
						<div
							className={`rounded-circle m-0 p-0 bg-${
								data ? "white" : "none"
							} w-100 overflow-hidden`}
							style={{
								width: `${photoSize}px`,
								height: `${photoSize}px`,
								border: `5px solid ${
									today ? "white" : "#9D9D9D"
								}`,
								zIndex: 1080,
							}}
						>
							{data && (
								<img
									alt="photo"
									src={data}
									width={photoSize}
									style={{ zIndex: 1080 }}
								/>
							)}
							{isLoading && (
								<Placeholder
									as="div"
									animation="glow"
									style={{
										width: `${photoSize}px`,
										height: `${photoSize}px`,
									}}
								>
									<Placeholder
										sm={12}
										style={{
											width: `${photoSize}px`,
											height: `${photoSize}px`,
										}}
									/>
								</Placeholder>
							)}
						</div>
					</Col>
					<Col
						md={5}
						className="m-0 p-0 px-2 px-lg-3 d-flex flex-column justify-content-center align-items-center position-relative"
					>
						<p
							className={`m-0 p-0 pb-1 text-uppercase text-${
								today ? "white" : "secondary"
							} 
                                ibm-bold d-flex justify-content-center align-items-end fs-4 text-center`}
							style={{ height: "50%" }}
						>
							{name}
						</p>
						<p
							className={`m-0 p-0 pt-1 text-uppercase text-${
								today ? "white" : "secondary"
							} text-center`}
							style={{ height: "50%" }}
						>
							{post}
						</p>
						<div
							className={`position-absolute w-100 start-50 bg-${
								today ? "white" : "secondary"
							} m-0 top-50 translate-middle`}
							style={{ zIndex: "0", padding: '2.5px' }}
						/>
					</Col>
				</Row>
			</Col>
		</Row>
	)
}

export default BirthdayItem