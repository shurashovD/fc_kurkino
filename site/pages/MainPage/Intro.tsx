import { useEffect, useState } from "react"
import { Image, Placeholder } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useLazyUploadQuery } from "../../app/file.service"
import { useAppSelector } from "../../app/hooks"

const Intro = () => {
	const [mobile, setMobile] = useState(true)
	const [trigger, {isFetching, data: src, isError}] = useLazyUploadQuery()
    const [height, setHeight] = useState<number | string>('auto')
	const news = useAppSelector(state => state.newsSlice)

    useEffect(() => {
		const mobile = window?.innerWidth < 768
		setMobile(mobile)
		let abort: () => void | undefined

		if (mobile) {
			abort = trigger("intro-mobile.png", true).abort
		} else {
			abort = trigger("intro.png", true).abort
		}

		if (!mobile && window?.innerWidth / window?.innerHeight > 1.5) {
			setHeight(window?.innerHeight)
		}

		return () => {
			if (typeof abort === "function") {
				abort()
			}
		}
	}, [trigger])

    return (
		<section className="w-100 m-0 p-0">
			{(mobile && (isFetching || isError)) ||
			(!mobile && (isFetching || isError)) ? (
				<Placeholder as="div" animation="wave">
					<Placeholder
						xs={12}
						className="m-0 min-vh-100 placeholder-intro"
						id="intro-placeholder"
					/>
				</Placeholder>
			) : (
				<div className="position-relative bg-dark">
					<Image
						alt="intro"
						src={src}
						height={height}
						width="100%"
					/>
					{news.link && news.title && news.date && (
						<div
							className="position-absolute bottom-0 bg-primary bg-opacity-75 p-3 px-4 m-0 d-none d-lg-block"
							style={{ left: "62%" }}
						>
							<p className="text-dark mb-2">Последние новости:</p>
							<div className="d-flex align-items-stretch">
								<div>
									<span>
										<span className="text-white text-uppercase">
											Матч от {news.date}
										</span>
										<br />
										<span className="text-uppercase text-success">
											{news.title}
										</span>
									</span>
								</div>
								<div>
									<NavLink to={news.link}>
										<div className="arrow-right border rounded-circle ms-3" />
									</NavLink>
								</div>
							</div>
						</div>
					)}
				</div>
			)}
		</section>
	)
}

export default Intro