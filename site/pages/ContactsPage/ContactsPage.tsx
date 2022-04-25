import { Container } from "react-bootstrap"

const ContactsPage = () => {
    return (
		<Container id="contacts-page" fluid>
			<Container>
				<h3 className="mb-3 text-uppercase">Контакты</h3>
				<p className="mb-3">
					<span className="noto-semi-bold">Телефон: </span>
					<a href="tel:+79160107979" className="text-dark">
						8-916-010-79-79
					</a>
				</p>
				<p className="mb-5">
					<span className="noto-semi-bold">E-mail: </span>
					<a href="mailtol:fckurkino@gmail.com" className="text-dark">
						fckurkino@gmail.com
					</a>
				</p>
				<h3 className="mt-5 mb-3 text-uppercase">Реквизиты</h3>
				<p className="mb-3">
					<span className="noto-semi-bold">Президент</span>
					<br />
					<span>Желага Игорь Витальевич на основании Устава</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">
						Полное наименование:{" "}
					</span>
					<span>АНО "ФУТБОЛЬНЫЙ КЛУБ КУРКИНО"</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">Юридический адрес: </span>
					<span>
						141402, Московская область г. Химки, улица Ленинградская
						29, офис 9/913/2
					</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">ОГРН</span>
					<br />
					<span>1215000110258</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">ИНН/КПП</span>
					<br />
					<span>5047257762/504701001</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">
						Банковские реквизиты:
					</span>
					<br />
					<span>ПАО Сбербанк России г. Москва</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">БИК</span>
					<br />
					<span>044525225</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">Расчётный счет</span>
					<br />
					<span>40703810340000009152</span>
				</p>
				<p className="mb-3">
					<span className="noto-semi-bold">
						Корреспондентский счет
					</span>
					<br />
					<span>30101810400000000225</span>
				</p>
			</Container>
		</Container>
	)
}

export default ContactsPage