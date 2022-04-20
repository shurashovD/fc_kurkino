import { useState } from "react"
import { Button, CloseButton, Col, Container, Nav, Navbar, Offcanvas, Row} from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import Logo from "./../img/logo.png"

const NavComponent = () => {
    const { pathname } = useLocation()
	const [show, setShow] = useState(false)
    const [bgDark, setBgDark] = useState(false)
	const [sticky, setSticky] = useState(false)

    return (
		<Navbar expand="lg" className={`
			${bgDark && 'bg-dark'} 
			${sticky ? "sticky-top" : "position-absolute top-0 start-0 end-0"} m-0
		`} style={{ zIndex: '1000' }}>
			<Container className="p-0">
				<Row className="w-100 m-0 p-0">
					<Col xs={2}>
						<Navbar.Brand>
							<NavLink to="/">
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
									width="131"
									className="d-none d-md-block"
									id="header-logo"
								/>
							</NavLink>
						</Navbar.Brand>
					</Col>
					<Col xs={7} sm={8}>
						<Navbar.Collapse className="h-100 d-none d-lg-block">
							<Nav className="w-100 justify-content-lg-between">
								<NavLink
									to="/about"
									className={`mx-lg-3 text-uppercase text-${
										pathname === "/about"
											? "success"
											: "white"
									}`}
								>
									О клубе
								</NavLink>
								<NavLink
									to="/matches"
									className={`mx-lg-3 text-uppercase text-${
										pathname === "/matches"
											? "success"
											: "white"
									}`}
								>
									Матчи
								</NavLink>
								<NavLink
									to="/team-squad"
									className={`mx-lg-3 text-uppercase text-${
										pathname === "/team-squad"
											? "success"
											: "white"
									}`}
								>
									Состав команды
								</NavLink>
								<NavLink
									to="/coach-squad"
									className={`mx-lg-3 text-uppercase text-${
										pathname === "/coach-squad"
											? "success"
											: "white"
									}`}
								>
									Тренерский штаб
								</NavLink>
								<NavLink
									to="/contacts"
									className={`mx-lg-3 text-uppercase text-${
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
					<Col xs={2} className="d-flex">
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
					className="bg-dark w-100"
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
								to="/matches"
								className={`mx-lg-3 text-${
									pathname === "/matches"
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