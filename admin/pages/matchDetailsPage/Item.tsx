import { FC, useEffect } from "react"
import { Button, Spinner } from "react-bootstrap"
import { useResetScoresMutation } from "../../app/match.service"
import { useAppDispatch } from '../../app/hooks'
import { alertSuccess } from "../../app/alertState"
import { showMatchScoresModal } from "../../app/matchScoresModalState"
import { NavLink } from "react-router-dom"

interface IItemProps {
	id: string
	date: string
	home: string
	guest: string
	homeScores?: number
	guestScores?: number
	photos?: number
	videos?: number
}

const Item: FC<IItemProps> = ({
	date,
	guest,
	home,
	id,
	guestScores,
	homeScores,
	photos,
	videos,
}) => {
	const [reset, { isLoading, isSuccess }] = useResetScoresMutation()
    const dispatch = useAppDispatch()

	const resetHandler = () => {
        reset(id)
    }

    const scoreHandler = () => {
        dispatch(showMatchScoresModal({ id, guest, guestScores, home, homeScores }))
    }

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Счет матча успешно сброшен'))
        }
    }, [isSuccess])

	return (
		<tr className="align-middle">
			<td>
				<span className="fw-bold">{home}</span> -{" "}
				<span className="fw-bold">{guest}</span>
			</td>
			<td className="text-center">{date}</td>
			<td className="text-center">
				<Button variant="link" onClick={scoreHandler}>
					{homeScores?.toString() || "-"} :{" "}
					{guestScores?.toString() || "-"}
				</Button>
			</td>
			<td className="text-center">
				<NavLink to={`/match-photos/${id}`}>
					{photos || "не загружено"}
				</NavLink>
			</td>
			<td className="text-center">
				<NavLink to={`/match-videos/${id}`}>
					{videos || "не загружено"}
				</NavLink>
			</td>
			<td className="text-center">
				{isLoading ? (
					<Spinner variant="warning" size="sm" animation="border" />
				) : (
					<Button
						variant="warning"
						disabled={!guestScores && !homeScores}
						onClick={resetHandler}
						size="sm"
					>
						Сбросить счет
					</Button>
				)}
			</td>
		</tr>
	)
}

export default Item