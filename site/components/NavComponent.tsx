import { forwardRef, useEffect, useState } from "react"
import { Button, ButtonProps, CloseButton, Col, Container, Dropdown, Nav, Navbar, Offcanvas, Row} from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import Logo from "./../img/logo.svg"

interface ICustomToggle extends ButtonProps {
	color: string
}

function getPageTitle(location: string): string {
	switch (location) {
		case "/news":
			return "Новости"
		case "/playbill":
			return "Матчи"
		case "/team-squad":
			return "Состав команды"
		case "/coach-squad":
			return "Тренерский штаб"
		case "/photo":
			return "Галерея матчей"
		case "/about":
			return "О клубе"
		case "/contacts":
			return "Контакты"
		default:
			return "ФК Куркино"
	}
}

const CustomToggle = forwardRef<HTMLButtonElement, ICustomToggle>(
	({ children, onClick, color = 'white' }, ref) => (
		<Button ref={ref} onClick={onClick} variant="link" className={`text-${color} text-uppercase p-0 m-0 pb-1`}>
			{children}
		</Button>
	)
)

const NavComponent = () => {
	const {pathname, hash} = useLocation()
	const [show, setShow] = useState(false)
    const [bgOpacity, setBgOpacity] = useState(true)
	const [sticky, setSticky] = useState(false)

	useEffect(() => {
		if ( pathname === '/' ) {
			setSticky(false)
			setBgOpacity(true)
		}
		else {
			setSticky(true)
			setBgOpacity(false)
		}

		document.title = getPageTitle(pathname)
		window.scrollTo(0, 0)
	}, [pathname, hash])

    return (
		<Navbar
			expand="lg"
			className={`
				${bgOpacity && "bg-opacity-50"} 
				${sticky ? "sticky-top" : "position-absolute top-0 start-0 end-0"} 
				m-0 bg-dark p-0
			`}
			style={{ zIndex: "1000" }}
		>
			<Container className="p-0">
				<Row className="w-100 m-0 p-0">
					<Col xs={2}>
						<img
							alt="logo"
							src={Logo}
							width="98"
							className="d-md-none"
							id="header-logo"
						/>
						<img
							alt="logo"
							src={Logo}
							width="120"
							className="d-none d-md-block m-0"
							id="header-logo"
						/>
					</Col>
					<Col xs={6} lg={10} xl={8}>
						<Navbar.Collapse className="h-100 d-none d-lg-block p-0">
							<Nav className="w-100 justify-content-lg-between m-0">
								<NavLink
									to="/"
									className={`n-link mx-lg-3 text-uppercase text-${
										pathname === "/" ? "success" : "white"
									}`}
								>
									Главная
								</NavLink>
								<NavLink
									to="/news"
									className={`n-link mx-lg-3 text-uppercase text-${
										pathname === "/news"
											? "success"
											: "white"
									}`}
								>
									Новости
								</NavLink>
								<NavLink
									to="/playbill"
									className={`n-link mx-lg-3 text-uppercase text-${
										pathname === "/playbill"
											? "success"
											: "white"
									}`}
								>
									Матчи
								</NavLink>
								<Dropdown className="p-0 m-0">
									<Dropdown.Toggle
										as={CustomToggle}
										color={
											pathname === "/team-squad" ||
											pathname === "/coach-squad"
												? "success"
												: "white"
										}
									>
										Команда
									</Dropdown.Toggle>
									<Dropdown.Menu className="p-0 rounded-0 shadow-sm">
										<Dropdown.Item
											className={`bg-${
												pathname === "/team-squad"
													? "success"
													: "white"
											}`}
										>
											<NavLink
												to="/team-squad"
												className="mx-lg-3 text-dark"
											>
												Состав команды
											</NavLink>
										</Dropdown.Item>
										<Dropdown.Item
											className={`bg-${
												pathname === "/coach-squad"
													? "success"
													: "white"
											}`}
										>
											<NavLink
												to="/coach-squad"
												className="mx-lg-3 text-dark"
											>
												Тренерский штаб
											</NavLink>
										</Dropdown.Item>
									</Dropdown.Menu>
								</Dropdown>
								<NavLink
									to="/photo"
									className={`n-link mx-lg-3 text-uppercase text-${
										pathname === "/photo"
											? "success"
											: "white"
									}`}
								>
									Фото
								</NavLink>
								<NavLink
									to="/about"
									className={`n-link mx-lg-3 text-uppercase text-${
										pathname === "/about"
											? "success"
											: "white"
									}`}
								>
									О клубе
								</NavLink>
								<NavLink
									to="/contacts"
									className={`n-link mx-lg-3 text-uppercase text-${
										pathname === "/contacts"
											? "success"
											: "white"
									}`}
								>
									Контакты
								</NavLink>
							</Nav>
						</Navbar.Collapse>
					</Col>
					<Col xs={2} md={0} className="d-flex d-md-none">
						<Navbar.Toggle
							onClick={() => setShow(true)}
							className="m-auto"
						>
							<svg
								width="40"
								height="31"
								viewBox="0 0 40 31"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<line
									y1="2"
									x2="40"
									y2="2"
									stroke="white"
									strokeWidth="4"
								/>
								<line
									y1="15.3333"
									x2="40"
									y2="15.3333"
									stroke="white"
									strokeWidth="4"
								/>
								<line
									y1="28.6667"
									x2="40"
									y2="28.6667"
									stroke="white"
									strokeWidth="4"
								/>
							</svg>
						</Navbar.Toggle>
					</Col>
				</Row>
				<Navbar.Offcanvas
					id="offcanvasNavbar"
					aria-labelledby="offcanvasNavbarLabel"
					placement="end"
					className="bg-dark w-100 d-lg-none"
					show={show}
				>
					<Offcanvas.Header className="p-5 px-4 justify-content-end">
						<CloseButton
							variant="white"
							onClick={() => setShow(false)}
						/>
					</Offcanvas.Header>
					<Offcanvas.Body>
						<p className="text-center text-uppercase">
							<NavLink
								to="/"
								className={`mx-lg-3 text-${
									pathname === "/" ? "success" : "white"
								}`}
								onClick={() => setShow(false)}
							>
								Главная
							</NavLink>
						</p>
						<p className="text-center text-uppercase">
							<NavLink
								to="/news"
								className={`mx-lg-3 text-${
									pathname === "/news" ? "success" : "white"
								}`}
								onClick={() => setShow(false)}
							>
								Новости
							</NavLink>
						</p>
						<p className="text-center text-uppercase">
							<NavLink
								to="/playbill"
								className={`mx-lg-3 text-${
									pathname === "/playbill"
										? "success"
										: "white"
								}`}
								onClick={() => setShow(false)}
							>
								Матчи
							</NavLink>
						</p>
						<p className="text-center text-uppercase">
							<NavLink
								to="/team-squad"
								className={`mx-lg-3 text-${
									pathname === "/team-squad"
										? "success"
										: "white"
								}`}
								onClick={() => setShow(false)}
							>
								Состав команды
							</NavLink>
						</p>
						<p className="text-center text-uppercase">
							<NavLink
								to="/coach-squad"
								className={`mx-lg-3 text-${
									pathname === "/coach-squad"
										? "success"
										: "white"
								}`}
								onClick={() => setShow(false)}
							>
								Тренерский штаб
							</NavLink>
						</p>
						<p className="text-center text-uppercase">
							<NavLink
								to="/photo"
								className={`mx-lg-3 text-${
									pathname === "/photo" ? "success" : "white"
								}`}
								onClick={() => setShow(false)}
							>
								Фото
							</NavLink>
						</p>
						<p className="text-center text-uppercase">
							<NavLink
								to="/about"
								className={`mx-lg-3 text-${
									pathname === "/about" ? "success" : "white"
								}`}
								onClick={() => setShow(false)}
							>
								О клубе
							</NavLink>
						</p>
						<p className="text-center text-uppercase">
							<NavLink
								to="/contacts"
								className={`mx-lg-3 text-${
									pathname === "/contacts"
										? "success"
										: "white"
								}`}
								onClick={() => setShow(false)}
							>
								Контакты
							</NavLink>
						</p>
					</Offcanvas.Body>
				</Navbar.Offcanvas>
			</Container>
		</Navbar>
	)
}

export default NavComponent