import { FC, MouseEvent, useEffect } from "react"
import { Button, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { useRemoveMatchMutation } from "../../app/match.service"

interface IMatchItem {
    id: string
    home: string
    guest: string
    date: string
    place?: string
    handler: (event: MouseEvent<HTMLButtonElement>) => void 
}

const MatchItem: FC<IMatchItem> = ({ id, date, guest, home, place, handler }) => {
    const [remove, { isLoading, isSuccess }] = useRemoveMatchMutation()
    const dispatch = useAppDispatch()
    
    const rmHandler = () => {
        remove(id)
    }

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Матч успешно удалён'))
        }
    }, [isSuccess])

    return (
		<tr className="align-middle text-center">
			<td>{home}</td>
			<td>{guest}</td>
			<td>{date}</td>
			<td>{place}</td>
			<td>
				<Button size="sm" onClick={handler} data-id={id}>
					Изменить
				</Button>
			</td>
			<td>
				{isLoading ? (
					<Spinner animation="border" size="sm" variant="danger" />
				) : (
					<Button
						variant="link"
						className="text-danger"
						size="sm"
						onClick={rmHandler}
					>
						Удалить матч...
					</Button>
				)}
			</td>
		</tr>
	)
}

export default MatchItem