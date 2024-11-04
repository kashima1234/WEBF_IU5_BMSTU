// @ts-nocheck
import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {fetchPlace, removeSelectedPlace} from "src/store/slices/placesSlice.ts";
import {useAppDispatch, useAppSelector} from "src/store/store.ts";


const PlacePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {selectedPlace, isMock} = useAppSelector((state) => state.places)

    useEffect(() => {
        dispatch(fetchPlace(id))
        return () => dispatch(removeSelectedPlace())
    }, []);

    if (!selectedPlace) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md="6">
                    <CardImg src={isMock ? mockImage as string : selectedPlace.image} className="mb-3" />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedPlace.name}</h1>
                    <p className="fs-5">Площадь: {selectedPlace.square}km².</p>
                    <p className="fs-5">Описание: {selectedPlace.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PlacePage