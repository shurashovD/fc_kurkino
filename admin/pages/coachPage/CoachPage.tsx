import { useRef, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { useFetchCoachesQuery } from "../../app/coach.service"
import AvatarModal from "./AvatarModal"
import EditedItem from "./EditedItem"
import Footer from "./Footer"
import Item from "./Item"

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
	const value = `${Y}-${M}-${D}`
    
    return value
}

const CoachPage = () => {
    const { data: coaches } = useFetchCoachesQuery(undefined, { refetchOnMountOrArgChange: true })
    const [avatarId, setAvatarId] = useState<string | undefined>()
    const [editedId, setEditedId] = useState<string | undefined>()
    const formatter = useRef(
		new Intl.DateTimeFormat("ru", {
			year: "numeric",
			month: "long",
			day: "numeric",
		})
	)

    return (
		<Container fluid>
			<AvatarModal
				id={avatarId || ""}
				show={
					!!coaches?.find(({ _id }) => _id.toString() === avatarId)
						?.avatar
				}
				src={
					coaches?.find(({ _id }) => _id.toString() === avatarId)
						?.avatar || ""
				}
				dismissHandler={() => setAvatarId(undefined)}
			/>
			<Table>
				<thead>
					<tr className="align-middle text-center">
						<th>#</th>
						<th>Имя</th>
						<th>Амплуа</th>
						<th>Дата рождения</th>
						<th>Действие</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{coaches?.map(
						({ _id, name, avatar, post, birthday }) => {
							const id = _id.toString()
							if (id === editedId) {
								return (
									<EditedItem
										key={id}
										id={id}
										birthday={
											birthday
												? dateValue(
														birthday?.toString()
												  )
												: ""
										}
										cancelHandler={() =>
											setEditedId(undefined)
										}
										name={name}
										post={post}
										src={avatar}
									/>
								)
							}
							return (
								<Item
									key={id}
									id={id}
									birthday={
										!!birthday
											? formatter.current.format(
													new Date(
														Date.parse(
															birthday.toString()
														)
													)
											  )
											: ""
									}
									editedHandler={(id) => setEditedId(id)}
									name={name}
									post={post}
									src={avatar}
									showAvatarHandler={(id) => setAvatarId(id)}
								/>
							)
						}
					)}
				</tbody>
				<tfoot>
					<Footer />
				</tfoot>
			</Table>
		</Container>
	)
}

export default CoachPage