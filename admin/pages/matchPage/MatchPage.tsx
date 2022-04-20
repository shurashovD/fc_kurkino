import { MouseEvent, useState } from "react"
import { Table } from "react-bootstrap"
import { useFetchMatchQuery } from "../../app/match.service"
import EditedMatch from "./EditedMatch"
import Footer from "./Footer"
import MatchItem from "./MatchItem"

const dateValue = (dateStr: string) => {
    const date = new Date(Date.parse(dateStr))
	const Y = date.getFullYear().toString()
	let M = (date.getMonth() + 1).toString()
	if (M.length === 1) {
		M = "0" + M
	}
	let D = date.getDate().toString()
	if (D.length === 1) {
		D = "0" + D
	}
	let H = date.getHours().toString()
	if (H.length === 1) {
		H = "0" + H
	}
	let Min = date.getMinutes().toString()
	if (Min.length === 1) {
		Min = "0" + Min
	}
	const value = `${Y}-${M}-${D}T${H}:${Min}`
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