import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import "./styles.css"
import HomePage from "pages/HomePage/HomePage.tsx";
import LoginPage from "pages/LoginPage/LoginPage.tsx";
import RegisterPage from "pages/RegisterPage/RegisterPage.tsx";
import PlacesListPage from "pages/PlacesListPage/PlacesListPage.tsx";
import PlacePage from "pages/PlacePage/PlacePage.tsx";
import ExpeditionsPage from "pages/ExpeditionsPage/ExpeditionsPage.tsx";
import ExpeditionPage from "pages/ExpeditionPage/ExpeditionPage.tsx";
import ProfilePage from "pages/ProfilePage/ProfilePage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";

function App() {
    return (
        <div>
            <Header />
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login/" element={<LoginPage />} />
                        <Route path="/register/" element={<RegisterPage />} />
                        <Route path="/places/" element={<PlacesListPage />} />
                        <Route path="/places/:id/" element={<PlacePage />} />
                        <Route path="/expeditions/" element={<ExpeditionsPage />} />
                        <Route path="/expeditions/:id/" element={<ExpeditionPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
