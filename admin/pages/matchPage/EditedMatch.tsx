import { ChangeEvent, FC, useEffect, useState } from "react"
import { Button, Form, Spinner } from "react-bootstrap"
import { IMatchPayload, ITeam } from "../../../shared"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { useUpdateMatchMutation } from "../../app/match.service"
import { useGetTeamsQuery } from "../../app/team.service"

interface IEditedMatch {
	id: string
	home: string
	guest: string
	date: string
	place?: string
	handler: () => void
}

const EditedMatch: FC<IEditedMatch> = ({ date, guest, id, handler, home, place }) => {
    const [state, setState] = useState<IMatchPayload>({ date, guestTeam: guest, homeTeam: home, place })
    const { data: teams, isLoading: teamsLoading } = useGetTeamsQuery(null, { refetchOnMountOrArgChange: true })
    const [update, { isLoading, isSuccess }] = useUpdateMatchMutation()
    const dispatch = useAppDispatch()

    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
		setState((state) => ({
			...state,
			[event.target.name]: event.target.value,
		}))
	}

    const dateHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setState((state) => ({ ...state, date: event.target.value }))
	}

    const placeHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setState((state) => ({ ...state, place: event.target.value }))
	}

    const saveHandler = () => {
        update({ id, body: state })
    }

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Информация о матче успешно изменена'))
            handler()
        }
    }, [isSuccess])

	return (
		<tr className="text-center align-middle">
			<td>
				<Form.Select
					className="w-100"
					onChange={selectHandler}
					name="homeTeam"
                    disabled={teamsLoading || isLoading}
					value={state.homeTeam}
				>
					<option value="">-- Команда дома --</option>
					{teams
						?.filter(
							({ _id }) => _id.toString() !== state.guestTeam
						)
						.map(({ _id, title, city }) => (
							<option
								key={`homeTeam_e_${_id}`}
								value={_id.toString()}
							>
								{title} {city && <>(г. {city})</>}
							</option>
						))}
				</Form.Select>
			</td>
			<td>
				<Form.Select
					className="w-100"
					onChange={selectHandler}
					name="guestTeam"
                    disabled={teamsLoading || isLoading}
					value={state.guestTeam}
				>
					<option value="">-- Команда на выезде --</option>
					{teams
						?.filter(({ _id }) => _id.toString() !== state.homeTeam)
						.map(({ _id, title, city }) => (
							<option
								key={`guestTeam_e_${_id}`}
								value={_id.toString()}
							>
								{title} {city && <>(г. {city})</>}
							</option>
						))}
				</Form.Select>
			</td>
			<td>
				<Form.Control
					type="datetime-local"
					value={state.date.toString()}
					onChange={dateHandler}
				/>
			</td>
			<td>
				<Form.Control value={state.place} onChange={placeHandler} />
			</td>
			<td>
				{isLoading ? (
					<Spinner animation="border" size="sm" variant="primary" />
				) : (
					<Button
						size="sm"
						onClick={saveHandler}
						disabled={isLoading || teamsLoading || state.guestTeam === '' || state.homeTeam === ''}
					>
						Сохранить
					</Button>
				)}
			</td>
			<td>
				<Button
					size="sm"
					onClick={handler}
					variant="secondary"
					disabled={isLoading}
				>
					Отмена
				</Button>
			</td>
		</tr>
	)
}

export default EditedMatch