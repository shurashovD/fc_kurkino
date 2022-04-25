import { ChangeEvent, FC, useEffect, useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { useVideosMutation } from "../../app/match.service"

interface IFooterProps {
    id: string
}

const Footer: FC<IFooterProps> = ({ id }) => {
	const [link, setLink] = useState('')
    const [upload, { isLoading, isSuccess }] = useVideosMutation()
    const dispatch = useAppDispatch()

    useEffect(() => {
		if (isSuccess) {
			dispatch(alertSuccess("Видео успешно добавлено"))
		}
	}, [isSuccess])

    return (
		<tr className="align-middle">
			<td>
				<Form.Control
					className="w-100"
					placeholder="Ссылка на YOUTUBE"
					onChange={(event: ChangeEvent<HTMLInputElement>) =>
						setLink(event.target.value)
					}
				/>
			</td>
			<td className="text-center">
				{isLoading ? (
					<Spinner animation="border" size="sm" variant="primary" />
				) : (
					<Button
						disabled={link === ""}
						onClick={() => upload({ body: { link }, id })}
					>
						Добавить
					</Button>
				)}
			</td>
		</tr>
	)
}

export default Footer