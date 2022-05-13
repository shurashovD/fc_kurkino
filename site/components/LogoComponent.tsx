import { FC, useEffect } from "react"
import { Image, Placeholder } from "react-bootstrap"
import { useLazyStaticQuery } from "../app/file.service"
import noLogo from '../img/no-logo.svg'

interface ILogoComponentProps {
    height: number
    src?: string
    width: number
}

const LogoComponent: FC<ILogoComponentProps> = ({ height, width, src = '' }) => {
    const [trigger, { isFetching, isError, data }] = useLazyStaticQuery()

	useEffect(() => {
		const { abort } = trigger(src, true)

		return () => {
			abort()
		}
	}, [trigger])

    return (
		<div
			className="d-flex justify-content-center align-items-center bg-white m-0"
			style={{
				width: `${width}px`,
				height: `${height}px`
			}}
		>
			{isError && <Image alt="logo" src={noLogo} />}
			{isFetching && (
				<Placeholder as="div" animation="glow" className="h-100 w-100">
					<Placeholder sm={12} className="h-100 w-100" />
				</Placeholder>
			)}
			{data && <Image alt="logo" src={data} fluid />}
		</div>
	)
}

export default LogoComponent