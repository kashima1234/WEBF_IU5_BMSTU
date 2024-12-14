import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchPlaces, updatePlaceName} from "store/slices/placesSlice.ts";
import {Link, useNavigate} from "react-router-dom";
import PlacesTable from "components/PlacesTable/PlacesTable.tsx";

const PlacesTablePage = () => {

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated, is_superuser} = useAppSelector((state) => state.user)

    const {places, place_name} = useAppSelector((state) => state.places)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updatePlaceName(e.target.value))
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchPlaces())
    }

    useEffect(() => {
        dispatch(fetchPlaces())
    }, [])

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_authenticated, is_superuser]);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col xs="8">
                                <Input value={place_name} onChange={handleChange} placeholder="Поиск..."></Input>
                            </Col>
                            <Col>
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
                <Col className="d-flex flex-row justify-content-end" md="6">
                    <Link to="/places/add">
                        <Button color="primary">Новый город</Button>
                    </Link>
                </Col>
            </Row>
            <Row className="mt-5 d-flex">
                {places.length > 0 ? <PlacesTable places={places} fetchPlaces={fetchPlaces}/> : <h3 className="text-center mt-5">Города не найдены</h3>}
            </Row>
        </Container>
    );
};

export default PlacesTablePage