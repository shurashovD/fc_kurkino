import { MouseEvent, useCallback, useEffect, useRef, useState } from "react"
import { Button, Col, Container, Row, Spinner } from "react-bootstrap"
import { ITeamPage } from "../../../shared"
import { useTeamQuery } from "../../app/teamPage.service"
import Item from "./Item"

const limit = 1

const TeamPage = () => {
	const [state, setState] = useState<ITeamPage[]>([])
	const [page, setPage] = useState(1)
    const { data, isFetching } = useTeamQuery(undefined, { refetchOnMountOrArgChange: true })
    const [tabIndex, setTabIndex] = useState(0)
	const container = useRef<HTMLDivElement | null>(null)

    const tabHandler = (event: MouseEvent<HTMLButtonElement>) => {
        const { index } = event.currentTarget.dataset
        if ((typeof index !== 'undefined') && !isNaN(parseInt(index))) {
			setPage(1)
			setTabIndex(parseInt(index))
		}
    }

	const handler = useCallback(() => {
		function getTop(element: HTMLElement, top = 0): number {
			const { parentElement, offsetTop } = element
			if (!(parentElement && offsetTop)) return top
			return getTop(parentElement, top + offsetTop)
		}

		if (!container.current || !data || isFetching) return
		const scroll =
			window.pageYOffset + document.documentElement.clientHeight
		const containerBottom =
			container.current.scrollHeight + getTop(container.current)
		if (scroll > containerBottom - 100) {
			const total = data
				.slice(
					tabIndex === 0 ? 0 : tabIndex - 1,
					tabIndex === 0 ? undefined : tabIndex
				)
				.reduce((total, item) => total + item.footballers.length, 0)
			if (page * limit < total) {
				setPage((state) => state + 1)
			}
		}
	}, [isFetching, container, tabIndex])

	useEffect(() => {
		document.addEventListener("scroll", handler)
		return () => {
			document.removeEventListener("scroll", handler)
		}
	}, [handler])

	useEffect(() => {
		if (data) {
			const state = data.slice(
				tabIndex === 0 ? 0 : tabIndex - 1,
				tabIndex === 0 ? undefined : tabIndex
			)
				.reduce((arr: any, item) => {
					const { role } = item
					return arr.concat(
						item.footballers.map((footballer) => ({
							...footballer,
							role,
						}))
					)
				}, [])
				.slice(0, page * limit)
				.reduce((arr: ITeamPage[], item: any) => {
					const { role } = item
					const index = arr.findIndex(item => role === item.role)
					if ( index === -1 ) {
						arr.push({
							role,
							footballers: [{
								id: item.id,
								name: item.name,
								description: item.description,
								number: item.number,
								photo: item.photo
							}]
						})
					}
					else {
						arr[index].footballers.push({
							id: item.id,
							name: item.name,
							description: item.description,
							number: item.number,
							photo: item.photo,
						})
					}
					return arr
				}, [])
			setState(state)
		}
	}, [tabIndex, page, data])

    return (
		<Container fluid className="px-0" id="team-page" ref={container}>
			{data && (
				<Container>
					<Row className="justify-content-center justify-content-sm-start">
						<Col xs={"auto"} md={3} lg={2}>
							<Button
								variant="link"
								className={`${tabIndex === 0 && "fw-bold"} 
                                        text-uppercase`}
								data-index={0}
								onClick={tabHandler}
							>
								Все
							</Button>
						</Col>
						{data.map(({ role }, index) => (
							<Col
								xs={"auto"}
								md={3}
								lg={2}
								key={`tab_${index + 1}`}
							>
								<Button
									variant="link"
									className={`${
										tabIndex === index + 1 && "fw-bold"
									} 
                                        text-uppercase`}
									data-index={index + 1}
									onClick={tabHandler}
								>
									{role}
								</Button>
							</Col>
						))}
					</Row>
					<hr />
				</Container>
			)}
			<Container>
				{state.map(({ role, footballers }, index) => (
					<Container key={`team_${index}`}>
						<h3 className="mt-5 mb-4 text-uppercase">
							{role}
						</h3>
						<Row xs={1} md={2} xl={3} className="g-5 mb-5">
							{footballers.map(
								({
									id,
									name,
									number,
									description,
									photo,
								}) => (
									<Col key={id}>
										<Item
											name={name}
											photo={photo}
											number={number?.toString()}
											description={description}
										/>
									</Col>
								)
							)}
						</Row>
					</Container>
				))}
			</Container>
			{ isFetching && (
				<div className="text-center p-5">
					<Spinner animation="border" variant="light" />
				</div>
			) }
		</Container>
	)
}

export default TeamPage