import { ChangeEvent, useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap'
import { IMatchPayload } from '../../../shared'
import { useCreateMatchMutation } from '../../app/match.service'
import { useGetTeamsQuery } from '../../app/team.service'
import { useAppDispatch } from '../../app/hooks'
import { alertSuccess } from '../../app/alertState'

const initialState: IMatchPayload = {
	date: '',
	guestTeam: "",
	homeTeam: "",
	place: "",
}

const Footer = () => {
    const [state, setState] = useState(initialState)
    const { data: teams, isLoading: teamsLoading } = useGetTeamsQuery(null, {
		refetchOnMountOrArgChange: true,
	})
    const [createMatch, { isLoading, isSuccess }] = useCreateMatchMutation()
    const dispatch = useAppDispatch()

    const selectHandler = (event: ChangeEvent<HTMLSelectElement>) => {
        setState(state => ({
            ...state, [event.target.name]: event.target.value
        }))
    }

    const dateHandler = (event: ChangeEvent<HTMLInputElement>) => {
		setState((state) => ({ ...state, date: event.target.value }))
    }

    const placeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setState(state => ({ ...state, place: event.target.value }))
    }

    const createHandler = () => {
        createMatch(state)
    }

    useEffect(() => {
		if (isSuccess) {
			dispatch(alertSuccess("Матч успешно создан"))
			setState(initialState)
		}
	}, [isSuccess, initialState])

    return (
		<tr>
			<td>
				<Form.Select
					className="w-100"
					disabled={teamsLoading}
					onChange={selectHandler}
					name="homeTeam"
					value={state.homeTeam}
				>
					<option value="">-- Команда дома --</option>
					{teams
						?.filter(
							({ _id }) => _id.toString() !== state.guestTeam
						)
						.map(({ _id, title, city }) => (
							<option
								key={`homeTeam_${_id}`}
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
					disabled={teamsLoading}
					onChange={selectHandler}
					name="guestTeam"
					value={state.guestTeam}
				>
					<option value="">-- Команда на выезде --</option>
					{teams
						?.filter(({ _id }) => _id.toString() !== state.homeTeam)
						.map(({ _id, title, city }) => (
							<option
								key={`guestTeam_${_id}`}
								value={_id.toString()}
							>
								{title} {city && <>(г. {city})</>}
							</option>
						))}
				</Form.Select>
			</td>
			<td>
				<Form.Control
					className="w-100"
					type="datetime-local"
					value={state.date.toString()}
					onChange={dateHandler}
				/>
			</td>
			<td colSpan={2}>
				<Form.Control
					className="w-100"
					placeholder="Комментарий (место, лига ... )"
					name="place"
					value={state.place}
					onChange={placeHandler}
				/>
			</td>
			<td>
				{isLoading ? (
					<Spinner animation="border" variant="primary" />
				) : (
					<Button
						onClick={createHandler}
						disabled={
							state.guestTeam === "" || state.homeTeam === ""
						}
					>
						Сохранить
					</Button>
				)}
			</td>
		</tr>
	)
}

export default Footer