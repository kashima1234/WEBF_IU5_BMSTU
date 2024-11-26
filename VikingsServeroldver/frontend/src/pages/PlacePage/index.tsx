import * as React from 'react';
import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {CardImg, Col, Container, Row} from "reactstrap";
import mockImage from "assets/mock.png";
import {T_Place} from "modules/types.ts";
import {PlaceMocks} from "modules/mocks.ts";

type Props = {
    selectedPlace: T_Place | null,
    setSelectedPlace: React.Dispatch<React.SetStateAction<T_Place | null>>,
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const PlacePage = ({selectedPlace, setSelectedPlace, isMock, setIsMock}: Props) => {
    const { id } = useParams<{id: string}>();

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/places/${id}`)
            const data = await response.json()
            setSelectedPlace(data)
        } catch {
            createMock()
        }
    }

    const createMock = () => {
        setIsMock(true)
        setSelectedPlace(PlaceMocks.find(place => place?.id == parseInt(id as string)) as T_Place)
    }

    useEffect(() => {
        if (!isMock) {
            fetchData()
        } else {
            createMock()
        }

        return () => setSelectedPlace(null)
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