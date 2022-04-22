import { FC, useRef } from "react"
import { Placeholder } from "react-bootstrap"
import { useStaticQuery } from "../../app/file.service"

interface IBirthdayItemProps {
    date: string
    name: string
    post: string
    src: string
    today: boolean
}

const BirthdayCarouselItem: FC<IBirthdayItemProps> = ({date, name, post, src, today}) => {
    const { data, isLoading } = useStaticQuery(src)
	const formatter = useRef(
		Intl.DateTimeFormat("ru", {
			day: "numeric",
			month: "long",
		})
	)

    return (
		<div
			className={`text-center position-relative birthday-plate-${
				today ? "primary" : "secondary"
			} m-0 p-0 py-4`}
		>
			<p
				className={`text-center mx-3 mb-4 p-2 text-center 
                text-${today ? "success" : "white"} text-uppercase 
                bg-${today ? "priamry" : "secondary"} 
                border border-${today ? "white" : "secondary"}
            `}
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
			<div className="d-flex mb-4">
				<div className="w-100 border position-relative">
					<div
						className={`position-absolute w-100 start-50 bg-${
							today ? "white" : "secondary"
						} m-0 p-1 top-50 translate-middle`}
						style={{ zIndex: "0" }}
					/>
				</div>
				<div
					className={`rounded-circle m-0 p-0 w-100 overflow-hidden 
                    bg-${data ? "white" : "none"}`}
					style={{
						width: "200px",
						maxWidth: "200px",
						minWidth: "200px",
						height: "200px",
						border: `5px solid ${today ? "white" : "#9D9D9D"}`,
						zIndex: 1080,
					}}
				>
					{data && (
						<img
							alt="photo"
							src={data}
							width="200"
							style={{ zIndex: 1080 }}
						/>
					)}
					{isLoading && (
						<Placeholder
							as="div"
							animation="glow"
							style={{
								width: "200px",
								height: "200px",
							}}
						>
							<Placeholder
								sm={12}
								style={{
									width: "200px",
									height: "200px",
								}}
							/>
						</Placeholder>
					)}
				</div>
				<div className="w-100 border position-relative">
					<div
						className={`position-absolute w-100 start-50 bg-${
							today ? "white" : "secondary"
						} m-0 p-1 top-50 translate-middle`}
						style={{ zIndex: "0" }}
					/>
				</div>
			</div>
			<p
				className={`ibm-bold text-uppercase text-center fs-4 mx-3
                text-${today ? "white" : "secondary"}
            `}
			>
				{name}
			</p>
			<p
				className={`text-uppercase text-center mx-3
                    text-${today ? "white" : "secondary"}
                `}
			>
				{post}
			</p>
		</div>
	)
}

export default BirthdayCarouselItem