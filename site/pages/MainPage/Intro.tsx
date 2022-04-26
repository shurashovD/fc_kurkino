import { useEffect, useState } from "react"
import { Image, Placeholder } from "react-bootstrap"
import { NavLink } from "react-router-dom"
import { useUploadQuery } from "../../app/file.service"

const Intro = () => {
	const [mobile, setMobile] = useState(true)
    const { data: src, isLoading, isError, refetch } = useUploadQuery("intro.png", { skip: mobile })
    const {
		data: srcMobile, isLoading: mobileLoading, isError: mobileError, refetch: mobileRefetch
	} = useUploadQuery("intro-mobile.png", { skip: !mobile })
    const [height, setHeight] = useState<number | string>('auto')

    useEffect(() => {
        const { innerWidth, innerHeight } = window
        const mobile = innerWidth < 768
        setMobile(mobile)

		if ( mobile ) {
			mobileRefetch()
		}
		else {
			refetch()
		}
        
        if (!mobile && (innerWidth / innerHeight > 1.5)) {
			setHeight(innerHeight)
		}
    }, [])

    return (
		<section className="w-100 m-0 p-0">
			{(mobile && (mobileLoading || mobileError)) ||
			(!mobile && (isLoading || isError)) ? (
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
						src={mobile ? srcMobile : src}
						height={height}
						width="100%"
					/>
					<div
						className="position-absolute bottom-0 bg-primary bg-opacity-75 p-3 px-4 m-0 d-none d-lg-none"
						style={{ left: "62%" }}
					>
						<p className="text-dark mb-2">Последние новости:</p>
						<div className="d-flex align-items-stretch">
							<div>
								<span>
									<span className="text-white text-uppercase">
										Матч от 13.04.2022
									</span>
									<br />
									<span className="text-uppercase text-success">
										Куркино - Урал
									</span>
								</span>
							</div>
							<div>
								<NavLink to="/">
									<div className="arrow-right border rounded-circle ms-3" />
								</NavLink>
							</div>
						</div>
					</div>
				</div>
			)}
		</section>
	)
}

export default Intro