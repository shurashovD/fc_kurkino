import { useEffect } from "react"
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { useNavigate, useParams } from "react-router-dom"
import { useGetArticleQuery, useGetLastArticlesQuery } from "../../app/article.service"
import Item from "./Item"
import RecommendItem from "./RecommendItem"

const ArticlePage = () => {
	const navigate = useNavigate()
    const { id } = useParams()
    const { data, isLoading } = useGetArticleQuery(id || '', { refetchOnMountOrArgChange: true })
    const { data: recommend } = useGetLastArticlesQuery(id || '', { refetchOnMountOrArgChange: true })

	return (
		<Container className="pt-5" id="article-page">
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
			<p className="mb-2 text-primary text-uppercase">
				{data?.date.toString()}
			</p>
			<h3 className="text-uppercase mb-4">{data?.title}</h3>
			<Row className="align-items-start">
				<Col xs={12} lg={9}>
					{data?.photo && (
						<img className="w-100 mb-4" src={data?.photo} />
					)}
					{data?.text &&
						data.text.split("\n").map((item) => <p>{item}</p>)}
				</Col>
				<Col xs={12} lg={3} className="d-flex flex-column justify-content-start">
					<h3 className="text-uppercase mb-4">Другие новости</h3>
					{recommend?.map((item) => (
						<RecommendItem
							key={item._id.toString()}
							id={item._id.toString()}
							title={item.title}
							date={item.date.toString()}
							photo={item.photo}
						/>
					))}
				</Col>
			</Row>
			{isLoading && (
				<div className="text-center p-5">
					<Spinner animation="border" variant="secondary" />
				</div>
			)}
		</Container>
	)
}

export default ArticlePage
