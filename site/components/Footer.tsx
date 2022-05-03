import { Button, Col, Container, Image, Row } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import Logo from '../img/logo.svg'

const Footer = () => {
    return (
		<Container fluid className="bg-dark m-0 mt-auto p-3 pt-5">
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
						<NavLink
							to="/about"
							className="text-secondary footer-link mb-1"
						>
							О клубе
						</NavLink>
						<NavLink
							to="/playbill"
							className="text-secondary footer-link mb-1"
						>
							Матчи
						</NavLink>
						<NavLink
							to="/team-squad"
							className="text-secondary footer-link mb-1"
						>
							Состав команды
						</NavLink>
						<NavLink
							to="/coach-squad"
							className="text-secondary footer-link mb-1"
						>
							Тренерский штаб
						</NavLink>
						<NavLink
							to="/contacts"
							className="text-secondary footer-link mb-1"
						>
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
							href="tel:+79160107979"
							className="text-secondary footer-link w-100 mb-1"
						>
							Телефон: +7 916 010-79-79
						</a>
						<a
							href="mailto:fckurkino@gmail.com"
							className="text-secondary footer-link w-100 mb-1"
						>
							E-mail: fckurkino@gmail.com
						</a>
					</Col>
					<Col xs={12} md={4}>
						<p className="text-uppercase text-primary text-center mt-5 mt-md-0 mb-3">
							Хочешь в команду ФК Куркино?
						</p>
						<div className="hstack">
							<a
								href="https://wa.me/79035656116?text=%D0%9F%D1%80%D0%B8%D0%B2%D0%B5%D1%82!%20%F0%9F%91%8B%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%B2%20%D0%BA%D0%BE%D0%BC%D0%B0%D0%BD%D0%B4%D1%83%20%D0%A4%D0%9A%20%D0%9A%D1%83%D1%80%D0%BA%D0%B8%D0%BD%D0%BE.%20"
								target="_blank"
								className="btn btn-outline-success mx-auto rounded-0 px-5 py-3"
							>
								Хочу в команду
							</a>
						</div>
					</Col>
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
					<Col xs={12} md={3} className="d-flex">
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