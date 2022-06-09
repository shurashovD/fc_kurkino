import { useRef, useState } from "react"
import { Container, Table } from "react-bootstrap"
import { useGetNewsQuery } from "../../app/newsService"
import PhotoModal from "./PhotoModal"
import EditedItem from "./EditedItem"
import Footer from "./Footer"
import Item from "./Item"
import TextModal from "./TextModal"
import VideoModal from "./VideoModal"

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

const NewsPage = () => {
    const { data: news } = useGetNewsQuery(undefined, { refetchOnMountOrArgChange: true })
    const [photoId, setPhotoId] = useState<string | undefined>()
	const [videoId, setVideoId] = useState<string | undefined>()
	const [textId, setTextId] = useState<string | undefined>()
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
			<PhotoModal
				id={photoId || ""}
				show={
					!!news?.find(({ _id }) => _id.toString() === photoId)?.photo
				}
				src={
					news?.find(({ _id }) => _id.toString() === photoId)
						?.photo || ""
				}
				dismissHandler={() => setPhotoId(undefined)}
			/>
			<TextModal
				dismissHandler={() => setTextId(undefined)}
				id={textId || ''}
				show={!!textId}
				text={news?.find(({ _id }) => _id?.toString() === textId?.toString())?.text || ''}
			/>
			<VideoModal
				id={videoId || ""}
				show={
					!!news?.find(({ _id }) => _id.toString() === videoId)?.video
				}
				src={
					news?.find(({ _id }) => _id.toString() === videoId)
						?.video || ""
				}
				dismissHandler={() => setVideoId(undefined)}
			/>
			<Table>
				<thead>
					<tr className="align-middle text-center">
						<th>#</th>
						<th>Новость</th>
						<th>Дата</th>
						<th>Текст</th>
						<th>Видео</th>
						<th>Действие</th>
						<th>Действие</th>
					</tr>
				</thead>
				<tbody>
					{news?.map(({ _id, date, title, photo, video }) => {
						const id = _id.toString()
						if (id === editedId) {
							return (
								<EditedItem
									key={id}
									id={id}
									cancelHandler={() => setEditedId(undefined)}
									date={dateValue(date.toString())}
									title={title}
									src={photo}
								/>
							)
						}
						return (
							<Item
								key={id}
								id={id}
								date={formatter.current.format(
									Date.parse(date.toString())
								)}
								title={title}
								hasVideo={!!video}
								editedHandler={(id) => setEditedId(id)}
								showPhotoHandler={(id) => setPhotoId(id)}
								showTextHandler={(id) => setTextId(id)}
								showVideoHandler={(id) => setVideoId(id)}
								src={photo}
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

export default NewsPage