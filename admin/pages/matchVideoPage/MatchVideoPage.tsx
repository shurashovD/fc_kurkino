import { Col, Container, Row, Table } from "react-bootstrap"
import { useParams } from "react-router-dom"
import { useGetMatchByIdQuery } from "../../app/match.service"
import Footer from "./Footer"
import Item from "./Item"
import Player from "./Player"

const MatchVideoPage = () => {
	const { id } = useParams()
	const { data: match } = useGetMatchByIdQuery(id || "", {
		refetchOnMountOrArgChange: true,
	})

	return (
		<Container>
			<h3 className="mb-3">
				Видео матча <b>{match?.homeTeam?.title}</b>
				<span className="mx-2">&mdash;</span>
				<b>{match?.guestTeam?.title}</b>
			</h3>
			{ match && <Row>
					<Col sm={12} md={5} className="pe-md-4">
						<Table>
							<thead>
								<tr className="align-middle text-center">
									<th>Имя файла</th>
									<th>Действие</th>
								</tr>
							</thead>
							<tbody>
								{match?.video?.map((src, index) => (
									<Item
										key={`video_${index}`}
										id={id || ""}
										src={src}
									/>
								))}
							</tbody>
							<tfoot>
								<Footer id={id || ""} prefix={match.homeTeam.title + '-' + match.guestTeam.title} />
							</tfoot>
						</Table>
					</Col>
					<Col sm={12} md={7} className="ps-md-4">
						<Player />
					</Col>
				</Row>
			}
		</Container>
	)
}

export default MatchVideoPage