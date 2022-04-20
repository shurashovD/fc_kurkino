import { MouseEvent, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { useGetTeamsQuery } from "../../app/team.service"
import EditedItem from "./EditedItem"
import Footer from "./Footer"
import Item from "./Item"
import LogoView from "./LogoView"

const TeamPage = () => {
	const [editedId, setEditedId] = useState<string | undefined>()
    const { data } = useGetTeamsQuery(null, { refetchOnMountOrArgChange: true })

    const resetEditedId = () => {
		setEditedId(undefined)
	}

	const editCB = (event: MouseEvent<HTMLButtonElement>) => {
		const id = event.currentTarget.dataset.id
		setEditedId(id)
	}

    return (
		<Container>
			<LogoView />
			<Table hover>
				<thead>
					<tr className="text-center">
						<th>#</th>
						<th>Название</th>
						<th>Город</th>
						<th>Действие</th>
						<th>Действие</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{data?.map(({ _id, title, city, logo }) => {
						if (_id.toString() === editedId) {
							return (
								<EditedItem
									key={_id.toString()}
									id={_id.toString()}
									title={title}
									city={city}
									callback={resetEditedId}
								/>
							)
						}
						return (
							<Item
								key={_id.toString()}
								id={_id.toString()}
								title={title}
								city={city}
								handler={editCB}
								logo={logo}
							/>
						)
					})}
				</tbody>
				<tfoot>
					<Footer />
				</tfoot>
			</Table>
		</Container>
	)
}

export default TeamPage