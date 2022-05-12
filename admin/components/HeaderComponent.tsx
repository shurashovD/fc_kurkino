import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const HeaderComponent = () => {
    return (
		<Navbar>
			<Container fluid>
				<Navbar.Toggle aria-controls="navbar" />
				<Navbar.Collapse id="navbar">
					<Nav>
						<NavLink to="/" className="btn btn-link">
							Главная
						</NavLink>
						<NavLink to="/teams" className="btn btn-link">
							Команды
						</NavLink>
						<NavLink to="/matches" className="btn btn-link">
							Матчи
						</NavLink>
						<NavLink to="/details" className="btn btn-link">
							Детали матчей
						</NavLink>
						<NavLink to="/squad" className="btn btn-link">
							Состав
						</NavLink>
						<NavLink to="/coach-squad" className="btn btn-link">
							Тренеры
						</NavLink>
						<NavLink to="/news" className="btn btn-link">
							Новости
						</NavLink>
						<a
							href="/admin/logout"
							className="btn btn-link ms-auto"
						>
							Выйти
						</a>
					</Nav>
				</Navbar.Collapse>
			</Container>
		</Navbar>
	)
}

export default HeaderComponent