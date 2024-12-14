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
import AccessDeniedPage from "pages/AccessDeniedPage/AccessDeniedPage.tsx";
import NotFoundPage from "pages/NotFoundPage/NotFoundPage.tsx";
import Header from "components/Header/Header.tsx";
import Breadcrumbs from "components/Breadcrumbs/Breadcrumbs.tsx";
import PlacesTablePage from "pages/PlacesTablePage/PlacesTablePage.tsx";
import PlaceEditPage from "pages/PlaceEditPage/PlaceEditPage.tsx";
import PlaceAddPage from "pages/PlaceAddPage/PlaceAddPage.tsx";

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
                        <Route path="/places-table/" element={<PlacesTablePage />} />
                        <Route path="/places/:id/" element={<PlacePage />} />
                        <Route path="/places/:id/edit" element={<PlaceEditPage />} />
                        <Route path="/places/add" element={<PlaceAddPage />} />
                        <Route path="/expeditions/" element={<ExpeditionsPage />} />
                        <Route path="/expeditions/:id/" element={<ExpeditionPage />} />
                        <Route path="/profile/" element={<ProfilePage />} />
                        <Route path="/403/" element={<AccessDeniedPage />} />
                        <Route path="/404/" element={<NotFoundPage />} />
                        <Route path='*' element={<NotFoundPage />} />
                    </Routes>
                </Row>
            </Container>
        </div>
    )
}

export default App
