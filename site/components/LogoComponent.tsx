import { FC } from "react"
import { Image, Placeholder } from "react-bootstrap"
import { useStaticQuery } from "../app/file.service"
import noLogo from '../img/no-logo.svg'

interface ILogoComponentProps {
    height: number
    src?: string
    width: number
}

const LogoComponent: FC<ILogoComponentProps> = ({ height, width, src }) => {
    const {data, isLoading, isError} = useStaticQuery(src || '')

    return (
		<div
			className="d-flex justify-content-center align-items-center bg-white m-0 border"
			style={{
				width: `${width.toString()}px`,
				height: `${height.toString()}px`,
				objectFit: 'contain'
			}}
		>
			{isError && <Image alt="logo" src={noLogo} />}
			{isLoading && (
				<Placeholder as="div" animation="glow" className="h-100 w-100">
					<Placeholder sm={12} className="h-100 w-100" />
				</Placeholder>
			)}
			{data && <Image alt="logo" src={data} fluid />}
		</div>
	)
}

export default LogoComponent