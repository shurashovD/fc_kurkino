import { FC } from "react";
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import TeamPage from "./pages/teamPage/TeamPage";
import { Container } from "react-bootstrap";
import HeaderComponent from "./components/HeaderComponent";
import MainPage from "./pages/mainPage/MainPage";
import AlertComponent from "./components/AlertComponent";
import MatchPage from "./pages/matchPage/MatchPage";
import MatchDetailPage from "./pages/matchDetailsPage/MatchDetailPage";
import MatchPhotoPage from "./pages/matchPhotoPage/MatchPhotoPage";
import MatchVideoPage from "./pages/matchVideoPage/MatchVideoPage";
import SquadPage from "./pages/squadPage/SquadPage";
import CoachPage from "./pages/coachPage/CoachPage";
import NewsPage from "./pages/newsPage/NewsPage";

const App: FC = () => {
    return (
		<BrowserRouter>
			<AlertComponent />
			<header>
				<HeaderComponent />
			</header>
			<main>
				<Container className="py-5">
					<Routes>
						<Route path="/" element={<MainPage />} />
						<Route path="/teams" element={<TeamPage />} />
						<Route path="/matches" element={<MatchPage />} />
						<Route path="/details" element={<MatchDetailPage />} />
						<Route path="/squad" element={<SquadPage />} />
						<Route path="/coach-squad" element={<CoachPage />} />
						<Route path="/news" element={<NewsPage />} />
						<Route
							path="/match-photos/:id"
							element={<MatchPhotoPage />}
						/>
						<Route
							path="/match-videos/:id"
							element={<MatchVideoPage />}
						/>
						<Route path="*" element={<Navigate to="/" />} />
					</Routes>
				</Container>
			</main>
		</BrowserRouter>
	)
}

export default App