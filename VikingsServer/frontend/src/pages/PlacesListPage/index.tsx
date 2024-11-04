// @ts-nocheck
import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import PlaceCard from "components/PlaceCard";
import {ChangeEvent, useEffect} from "react";
import * as React from "react";
import {useAppDispatch, useAppSelector} from "src/store/store.ts";
import {fetchPlaces, updatePlaceName} from "src/store/slices/placesSlice.ts";

const PlacesListPage = () => {

    const dispatch = useAppDispatch()

    const {places, place_name, isMock} = useAppSelector((state) => state.places)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updatePlaceName(e.target.value))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        dispatch(fetchPlaces())
    }

    useEffect(() => {
        dispatch(fetchPlaces())
    }, []);

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
                                <Button color="primary" className="w-100">Поиск</Button>
                            </Col>
                        </Row>
                    </Form>
                </Col>
            </Row>
            <Row>
                {places?.map(place => (
                    <Col key={place.id} sm="12" md="6" lg="4">
                        <PlaceCard place={place} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PlacesListPage