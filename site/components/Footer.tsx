import { Col, Container, Image, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Logo from '../img/logo.svg'

const Footer = () => {
    return (
		<Container fluid className="bg-dark m-0 p-3 pt-5">
			<Container>
				<Row>
					<Col xs={12} md={2} className="text-center mb-5 mb-md-0">
						<Image
							width="121"
							src={Logo}
							alt="logo"
							className="mx-auto"
						/>
					</Col>
					<Col
						xs={6}
						md={3}
						className="text-white d-flex flex-column"
					>
						<p className="text-uppercase m-0">Меню:</p>
						<NavLink to="/" className="text-secondary footer-link mb-1">
							О клубе
						</NavLink>
						<NavLink to="/" className="text-secondary footer-link mb-1">
							Матчи
						</NavLink>
						<NavLink to="/" className="text-secondary footer-link mb-1">
							Состав команды
						</NavLink>
						<NavLink to="/" className="text-secondary footer-link mb-1">
							Тренерский штаб
						</NavLink>
						<NavLink to="/" className="text-secondary footer-link mb-1">
							Контакты
						</NavLink>
					</Col>
					<Col
						xs={6}
						md={3}
						className="text-white d-flex flex-column"
					>
						<p className="text-uppercase m-0">Контакты:</p>
						<a
							href="tel:+79021215126"
							className="text-secondary footer-link w-100 mb-1"
						>
							Телефон: +7(902)12-15-126
						</a>
						<a
							href="mailto:fc-kurkino.mail.ru"
							className="text-secondary footer-link w-100 mb-1"
						>
							E-mail: fc-kurkino.mail.ru
						</a>
					</Col>
					<Col xs={12} md={4}></Col>
				</Row>
				<Row className="mt-5">
					<Col xs={0} md={3}></Col>
					<Col xs={12} md={6}>
						<p className="text-secondary text-center m-0 p-0">
							© 2022 “ФК Куркино”.
						</p>
						<p className="text-secondary text-center m-0 p-0">
							При использовании материалов сайта ссылка
							обязательна.
						</p>
					</Col>
					<Col
						xs={12}
						md={3}
						className="d-flex"
					>
						<a
							href="https://www.behance.net/natali_shurashova"
							className="text-secondary footer-link mt-auto text-center text-md-start mx-auto mx-md-0"
						>
							Сайт разработан “Pazzl”
						</a>
					</Col>
				</Row>
			</Container>
		</Container>
	)
}

export default Footer