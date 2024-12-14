import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {ChangeEvent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchPlaces, updatePlaceName} from "store/slices/placesSlice.ts";
import PlaceCard from "components/PlaceCard/PlaceCard.tsx";
import Bin from "components/Bin/Bin.tsx";

const PlacesListPage = () => {

    const dispatch = useAppDispatch()

    const {places, place_name} = useAppSelector((state) => state.places)

    const {is_authenticated} = useAppSelector((state) => state.user)

    const {draft_expedition_id, places_count} = useAppSelector((state) => state.expeditions)

    const hasDraft = draft_expedition_id != null

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
                {is_authenticated &&
                    <Col className="d-flex flex-row justify-content-end" md="6">
                        <Bin isActive={hasDraft} draft_expedition_id={draft_expedition_id} places_count={places_count} />
                    </Col>
                }
            </Row>
            <Row className="mt-5 d-flex">
                {places?.map(place => (
                    <Col key={place.id} className="mb-5 d-flex justify-content-center" sm="12" md="6" lg="4">
                        <PlaceCard place={place} showAddBtn={is_authenticated} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PlacesListPage