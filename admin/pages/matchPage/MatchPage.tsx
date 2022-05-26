import { MouseEvent, useState } from "react"
import { Table } from "react-bootstrap"
import { useFetchMatchQuery } from "../../app/match.service"
import EditedMatch from "./EditedMatch"
import Footer from "./Footer"
import MatchItem from "./MatchItem"

const dateValue = (dateStr: string) => {
	const [date, time = '00:00'] = dateStr.split(' ')
	const [dd, MM, yy] = date.split('.')
	const yyyy = `20${yy.substring(0, 2)}`
	const value = `${yyyy}-${MM}-${dd}T${time}`
	return value
}

const MatchPage = () => {
    const { data: matches } = useFetchMatchQuery(undefined, { refetchOnMountOrArgChange: true })
    const [editedMatchId, setEditedMatchId] = useState<string|undefined>()

    const setEditedMatchIdHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.id
        if ( id ) {
            setEditedMatchId(id)
        }
    }

    const resetEditedMatchId = () => {
        setEditedMatchId(undefined)
    }

    return (
		<Table hover>
			<thead>
				<tr className="align-middle text-center">
					<th>Команда дома</th>
					<th>Команда на выезде</th>
					<th>Дата</th>
					<th>Место</th>
					<th>Действие</th>
					<th>Действие</th>
				</tr>
			</thead>
			<tbody>
                {
                    matches?.map(({_id, date, guestTeam, homeTeam, place}) => {
                        if ( _id.toString() === editedMatchId ) {
                            return (
								<EditedMatch
									key={_id.toString()}
									id={_id.toString()}
									date={dateValue(date.toString())}
									guest={guestTeam._id.toString()}
									handler={resetEditedMatchId}
									home={homeTeam._id.toString()}
									place={place}
								/>
							)
                        }
                        else {
                            return <MatchItem
                                key={_id.toString()}
                                date={date.toString()}
                                guest={guestTeam.title}
                                handler={setEditedMatchIdHandler}
                                home={homeTeam.title}
                                id={_id.toString()}
                                place={place}
                            />
                        }
                    })
                }
            </tbody>
			<tfoot>
				<Footer />
			</tfoot>
		</Table>
	)
}

export default MatchPage