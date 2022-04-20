import { FC, useEffect } from "react"
import { Button, Spinner } from "react-bootstrap"
import { alertSuccess } from "../../app/alertState"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { useRemoveVideosMutation } from "../../app/match.service"
import { resetPalyer, setSrc } from "../../app/playerState"

interface IItemProps {
    id: string
    src: string
}

const Item: FC<IItemProps> = ({ id, src }) => {
    const { src: playerSrc } = useAppSelector(state => state.player)
    const [remove, { isLoading, isSuccess }] = useRemoveVideosMutation()
    const dispatch = useAppDispatch()

    const handler = () => {
        dispatch(setSrc(src))
    }

    const rmHandler = () => {
        remove({ body: { files: [src] }, id })
    }

    useEffect(() => {
        if (isSuccess) {
            dispatch(alertSuccess('Видео успешно удалено'))
        }
    }, [isSuccess])

    useEffect(() => {
        return () => {
            dispatch(resetPalyer())
        }
    }, [])

    return (
		<tr className="align-middle">
			<td>
				<Button variant="link" onClick={handler} disabled={ src === playerSrc }>
                    {src.split("/").pop()}
                </Button>
			</td>
			<td className="text-center">
				{isLoading ? (
					<Spinner variant="danger" size="sm" animation="border" />
				) : (
					<Button
						variant="link"
						size="sm"
						className="text-danger"
						onClick={rmHandler}
					>
						Удалить видео...
					</Button>
				)}
			</td>
		</tr>
	)
}

export default Item