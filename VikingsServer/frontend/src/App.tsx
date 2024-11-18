import Header from "components/Header";
import Breadcrumbs from "components/Breadcrumbs";
import PlacePage from "pages/PlacePage";
import PlacesListPage from "pages/PlacesListPage";
import {Route, Routes} from "react-router-dom";
import {Container, Row} from "reactstrap";
import HomePage from "pages/HomePage";
import {useState} from "react";
import {T_Place} from "modules/types.ts";

function App() {

    const [places, setPlaces] = useState<T_Place[]>([])

    const [selectedPlace, setSelectedPlace] = useState<T_Place | null>(null)

    const [isMock, setIsMock] = useState(false);

    return (
        <>
            <Header/>
            <Container className="pt-4">
                <Row className="mb-3">
                    <Breadcrumbs selectedPlace={selectedPlace}/>
                </Row>
                <Row>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/places/" element={<PlacesListPage places={places} setPlaces={setPlaces} isMock={isMock} setIsMock={setIsMock} />} />
                        <Route path="/places/:id" element={<PlacePage selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} isMock={isMock} setIsMock={setIsMock} />} />
                    </Routes>
                </Row>
            </Container>
        </>
    )
}

export default App
