import { useCallback, useEffect, useRef, useState } from "react"
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { IMatchPhoto } from "../../../shared"
import { useGetAlbomsQuery } from "../../app/photos.service"
import Item from "./Item"

const limit = 2

const PhotosPage = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [state, setState] = useState<IMatchPhoto[]>([])
    const { data, isLoading, isFetching } = useGetAlbomsQuery({ limit, page }, { refetchOnMountOrArgChange: true })
	const container = useRef<HTMLDivElement | null>(null)
	const [photo, setPhoto] = useState<string | undefined>()

    const handler = useCallback(() => {
		function getTop(element: HTMLElement, top = 0): number {
			const { parentElement, offsetTop } = element
			if (!(parentElement && offsetTop)) return top
			return getTop(parentElement, top + offsetTop)
		}

		if (!container.current || isLoading || isFetching) return
		const scroll = window.pageYOffset + document.documentElement.clientHeight
		const containerBottom = container.current.scrollHeight + getTop(container.current)
		if (scroll > containerBottom + 50) {
			if (data?.length && page * limit < data.length) {
				setPage((state) => state + 1)
			}
		}
	}, [isFetching, isLoading, container])

    useEffect(() => {
        if ( data?.data ) {
			const filterData = data.data.filter(({ _id }) => state.every(item => item._id.toString() !== _id.toString()))
            setState((state) => state.concat(filterData))
        }
    }, [data])

    useEffect(() => {     
        document.addEventListener('scroll', handler)
        return () => {
            document.removeEventListener('scroll', handler)
        }
    }, [handler])

    return (
		<Container className="pt-5" id="photo-page" ref={container}>
			<Modal
				show={!!photo}
				onHide={() => setPhoto(undefined)}
				fullscreen={true}
			>
				<Modal.Header closeButton className="border-0" style={{ zIndex: 1080 }} />
				<Modal.Body className="text-center w-100 p-0 position-absolute">
					<div className="d-flex vh-100 w-100">
						<img
							src={photo || ""}
							alt="fc"
							className="w-100"
							style={{
								objectFit: "scale-down",
							}}
						/>
					</div>
				</Modal.Body>
			</Modal>
			<Button
				variant="link"
				className="text-secondary mb-5 d-flex align-items-center"
				onClick={() => navigate(-1)}
			>
				<div
					className="arrow-right-secondary mt-1"
					style={{ transform: "rotate(180deg)" }}
				/>
				<span className="text-uppercase">назад</span>
			</Button>
			<h3 className="text-uppercase mb-4">Галерея матчей</h3>
			<Row xs={1} lg={2} className="g-4">
				{state.map((item, index) => (
					<Col key={`new_${index}`}>
						<Item
							date={item.date?.toString() || ""}
							id={item._id.toString()}
							handler={(photo) => setPhoto(photo)}
							title={item.title}
							photo={item.photo || ""}
						/>
					</Col>
				))}
			</Row>
			{(isFetching || isLoading) && (
				<div className="text-center p-5">
					<Spinner animation="border" variant="secondary" />
				</div>
			)}
		</Container>
	)
}

export default PhotosPage