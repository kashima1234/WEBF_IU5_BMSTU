import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import PlacePage from "pages/PlacePage";
import PlacesListPage from "pages/PlacesListPage";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";

function App() {
    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs />
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/places/" element={<PlacesListPage />} />
                        <Route path="/places/:id" element={<PlacePage />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
