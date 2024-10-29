import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import {T_Place} from "src/modules/types.ts";
import PlaceCard from "components/PlaceCard";
import {PlaceMocks} from "src/modules/mocks.ts";
import {FormEvent, useEffect} from "react";
import * as React from "react";

type PlacesListPageProps = {
    places: T_Place[],
    setPlaces: React.Dispatch<React.SetStateAction<T_Place[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    placeName: string,
    setPlaceName: React.Dispatch<React.SetStateAction<string>>
}

const PlacesListPage = ({places, setPlaces, isMock, setIsMock, placeName, setPlaceName}:PlacesListPageProps) => {

    const fetchData = async () => {
        try {
            const response = await fetch(`/api/places/?place_name=${placeName.toLowerCase()}`,{ signal: AbortSignal.timeout(1000) })
            const data = await response.json()
            setPlaces(data.places)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    const createMocks = () => {
        setIsMock(true)
        setPlaces(PlaceMocks.filter(place => place.name.toLowerCase().includes(placeName.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        if (isMock) {
            createMocks()
        } else {
            await fetchData()
        }
    }

    useEffect(() => {
        fetchData()
    }, []);

    return (
        <Container>
            <Row className="mb-5">
                <Col md="6">
                    <Form onSubmit={handleSubmit}>
                        <Row>
                            <Col md="8">
                                <Input value={placeName} onChange={(e) => setPlaceName(e.target.value)} placeholder="Поиск..."></Input>
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
                    <Col key={place.id} xs="4">
                        <PlaceCard place={place} isMock={isMock} />
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default PlacesListPage