import { Container, Table } from 'react-bootstrap'
import MatchScoresModal from './MatchScoresModal'
import { useFetchMatchQuery } from '../../app/match.service'
import Item from './Item'

const MatchDetailPage = () => {
    const { data: matches } = useFetchMatchQuery(undefined, { refetchOnMountOrArgChange: true })

    return (
		<Container>
			<MatchScoresModal />
			<Table>
				<thead>
					<tr className="align-middle text-center">
						<th className="text-start">Матч</th>
						<th>Дата</th>
						<th>Счет</th>
						<th>Фото</th>
						<th>Видео</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{matches?.map(
						({
							_id,
							date,
							homeTeam,
							guestTeam,
							homeTeamScore,
							guestTeamScore,
							photo,
							video,
						}) => (
							<Item
								key={_id.toString()}
								id={_id.toString()}
                                date={date.toString()}
								home={homeTeam.title}
								guest={guestTeam.title}
								guestScores={guestTeamScore}
								homeScores={homeTeamScore}
								photos={photo?.length}
								videos={video?.length}
							/>
						)
					)}
				</tbody>
			</Table>
		</Container>
	)
}

export default MatchDetailPage