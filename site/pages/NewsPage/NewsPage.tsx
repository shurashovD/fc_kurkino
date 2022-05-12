import { useCallback, useEffect, useRef, useState } from "react"
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { INews } from "../../../shared"
import { useGetNewsQuery } from "../../app/news.service"
import Item from "./Item"

const limit = 2

const NewsPage = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [news, setNews] = useState<INews[]>([])
    const { data, isLoading, isFetching } = useGetNewsQuery({ limit, page })
	const container = useRef<HTMLDivElement | null>(null)

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
            setNews(state => state.concat(data.data))
        }
    }, [data])

    useEffect(() => {     
        document.addEventListener('scroll', handler)
        return () => {
            document.removeEventListener('scroll', handler)
        }
    }, [handler])

    return (
		<Container className="pt-5" id="news-page" ref={container}>
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
			<h3 className="text-uppercase mb-4">Новости клуба</h3>
			<Row xs={1} lg={2} className="g-4">
				{news.map((item, index) => (
					<Col key={`new_${index}`}>
						<Item
							date={item.date.toString()}
							id={item._id.toString()}
							title={item.title}
							photo={item.photo}
						/>
					</Col>
				))}
			</Row>
			{(isFetching || isLoading) && (
				<div className="text-center p-5">
					<Spinner
						animation="border"
						variant="secondary"
					/>
				</div>
			)}
		</Container>
	)
}

export default NewsPage