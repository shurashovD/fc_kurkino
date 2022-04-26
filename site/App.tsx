import { Container } from "react-bootstrap"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AboutPage from "./pages/AboutPage/AboutPage"
import CoachesPage from "./pages/CoachesPage/CoachesPage"
import NavComponent from "./components/NavComponent"
import ContactsPage from "./pages/ContactsPage/ContactsPage"
import MainPage from "./pages/MainPage/MainPage"
import MatchPage from "./pages/MatchPage/MatchPage"
import PlaybillPage from "./pages/PlaybillPage/PlaybillPage"
import TeamPage from "./pages/TeamPage/TeamPage"
import Footer from "./components/Footer"
import store from './app/store'
import { Provider } from "react-redux"

const App = () => {
	return (
		<Provider store={store}>
			<Container
				fluid
				className="p-0 min-vh-100 d-flex flex-column justify-content-start align-items-stretch"
			>
				<NavComponent />
				<Routes>
					<Route path="/" element={<MainPage />} />
					<Route path="/playbill" element={<PlaybillPage />} />
					<Route path="/match/:id" element={<MatchPage />} />
					<Route path="/coach-squad" element={<CoachesPage />} />
					<Route path="/team-squad" element={<TeamPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/contacts" element={<ContactsPage />} />
				</Routes>
				<Footer />
			</Container>
		</Provider>
	)
}

export default App
