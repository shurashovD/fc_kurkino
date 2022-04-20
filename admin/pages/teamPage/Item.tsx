import { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react"
import { Button, Form, Image, Spinner } from 'react-bootstrap'
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch } from "../../app/hooks"
import { logoViewShow } from "../../app/logoViewState"
import { useDeleteMutation, useUploadLogoMutation } from "../../app/team.service"

interface IItem {
    id: string
    title: string
    city?: string
	logo?: string
    handler: (event: MouseEvent<HTMLButtonElement>) => void
}

const Item: FC<IItem> = ({ id, title, city, handler, logo }) => {
    const [remove, { isLoading, isSuccess }] = useDeleteMutation()
	const [uploadLogo, { isLoading: logoLoading, isSuccess: logoSuccess }] = useUploadLogoMutation()
    const dispatch = useAppDispatch()

    const rmHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const id = event.currentTarget.dataset.id
        if ( id ) {
            remove(id)
        }
    }

	const fileHandler = (event: ChangeEvent<HTMLInputElement>) => {
		const logo = event.target.files?.[0]
		if ( logo ) {
			const body = new FormData()
			body.append('logo', logo)
			uploadLogo({ body, id })
		}
	}

	const logoHandler = () => {
		if ( logo && id ) {
			dispatch(logoViewShow({ src: logo, id }))
		}
	}

    useEffect(() => {
        if ( isSuccess ) {
            dispatch(alertSuccess('Команда успешно удалена'))
        }
    }, [isSuccess])

	useEffect(() => {
		if ( logoSuccess ) {
			dispatch(alertSuccess('Логотип успешно загружен'))
		}
	}, [logoSuccess])

    return (
		<tr className="text-center align-middle" key={id}>
			<td>
				{logo && <Button className="p-0 m-0" variant="link" onClick={logoHandler}>
					<Image width="50" alt="logo" src={logo} />
				</Button> }
			</td>
			<td>{title}</td>
			<td>{city}</td>
			<td className="text-center">
				<Button
					size="sm"
					onClick={handler}
					data-id={id}
					disabled={isLoading || logoLoading}
				>
					Изменить
				</Button>
			</td>
			<td className="text-center">
				{logoLoading ? (
					<Spinner animation="border" size="sm" variant="primary" />
				) : (
					<Form.Label className="p-0 m-0">
						<span className="btn btn-link p-1 fs-6 m-0">
							Сменить лого
						</span>
						<input
							type="file"
							style={{ width: 0, height: 0 }}
							accept="image/*"
							onChange={fileHandler}
							disabled={isLoading || logoLoading}
						/>
					</Form.Label>
				)}
			</td>
			<td className="text-center">
				{isLoading ? (
					<Spinner animation="border" size="sm" variant="danger" />
				) : (
					<Button
						variant="link"
						className="text-danger"
						size="sm"
						data-id={id}
						onClick={rmHandler}
						disabled={isLoading || logoLoading}
					>
						Удалить команду
					</Button>
				)}
			</td>
		</tr>
	)
}

export default Item