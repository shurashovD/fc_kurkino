import { ChangeEvent, MouseEvent, useEffect } from "react"
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap"
import { useParams } from "react-router-dom"
import {
	useGetMatchByIdQuery,
	usePhotosMutation,
	useRemovePhotosMutation,
} from "../../app/match.service"
import LoaderComponent from "../../components/LoaderComponent"
import { useAppDispatch } from '../../app/hooks'
import { alertError, alertSuccess } from "../../app/alertState"

const MatchPhotoPage = () => {
    const {id} = useParams()
    const { data: match, isLoading } = useGetMatchByIdQuery(id || '', { refetchOnMountOrArgChange: true })
    const [upload, { isLoading: photoLoading, isSuccess: photoSuccess }] = usePhotosMutation()
	const [remove, { isLoading: rmLoading, isSuccess: rmSuccess }] = useRemovePhotosMutation()
    const dispatch = useAppDispatch()

    const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const { files } = event.target
		if ( files && files?.length > 10 ) {
			dispatch(alertError('За один раз можно загрузить не более 10 фото'))
			return
		}
        if ( id && files && files?.length > 0 ) {
            const body = new FormData()
            for ( const i in files ) {
                const file = files[i]
                body.append("photos", file)
            }
            upload({ body, id })
        }
    }

	const rmHandler = (event: MouseEvent<HTMLButtonElement>) => {
		const { src } = event.currentTarget.dataset
		if ( id && src ) {
			remove({ body: {files: [src]}, id })
		}
	}

    useEffect(() => {
        if ( photoSuccess ) {
            dispatch(alertSuccess('Фотографии успешно загружены'))
        }
    }, [photoSuccess])

	useEffect(() => {
		if ( rmSuccess ) {
			dispatch(alertSuccess('Фотография успешно удалена'))
		}
	}, [rmSuccess])

    return (
		<Container>
			{(isLoading || photoLoading || rmLoading) && <LoaderComponent />}
			<h3 className="mb-3">
				Фотографии матча <b>{match?.homeTeam?.title}</b>
				<span className="mx-2">&mdash;</span>
				<b>{match?.guestTeam?.title}</b>
			</h3>
			<Row xs={1} md={2} lg={4} className="g-4">
				{match?.photo?.map((src) => (
					<Col>
						<Card>
							<Card.Img src={src} />
							<Card.Body>
								<Button
									variant="link"
									className="text-danger"
									size="sm"
									data-src={src}
									onClick={rmHandler}
								>
									Удалить фото...
								</Button>
							</Card.Body>
						</Card>
					</Col>
				))}
				<Col>
					<Card>
						<Card.Body>
							<Form.Label>
								<span className="btn btn-outline-primary">
									Добавить фото...
								</span>
								<input
									type="file"
									style={{ width: 0, height: 0 }}
									onChange={fileHandler}
									multiple
									maxLength={10}
									accept="image/*"
								/>
							</Form.Label>
						</Card.Body>
					</Card>
				</Col>
			</Row>
		</Container>
	)
}

export default MatchPhotoPage