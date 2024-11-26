import {Button, Col, Container, Form, Input, Row} from "reactstrap";
import PlaceCard from "components/PlaceCard";
import {ChangeEvent, FormEvent, useEffect} from "react";
import * as React from "react";
import {useAppSelector} from "src/store/store.ts";
import {updatePlaceName} from "src/store/slices/placesSlice.ts";
import {T_Place} from "modules/types.ts";
import {PlaceMocks} from "modules/mocks.ts";
import {useDispatch} from "react-redux";

type Props = {
    places: T_Place[],
    setPlaces: React.Dispatch<React.SetStateAction<T_Place[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
}

const PlacesListPage = ({places, setPlaces, isMock, setIsMock}:Props) => {

    const dispatch = useDispatch()

    const {place_name} = useAppSelector((state) => state.places)

    const handleChange = (e:ChangeEvent<HTMLInputElement>) => {
        dispatch(updatePlaceName(e.target.value))
    }

    const createMocks = () => {
        setIsMock(true)
        setPlaces(PlaceMocks.filter(place => place.name.toLowerCase().includes(place_name.toLowerCase())))
    }

    const handleSubmit = async (e:FormEvent) => {
        e.preventDefault()
        await fetchPlaces()
    }

    const fetchPlaces = async () => {
        try {
            const response = await fetch(`/api/places/?place_name=${place_name.toLowerCase()}`)
            const data = await response.json()
            setPlaces(data.places)
            setIsMock(false)
        } catch {
            createMocks()
        }
    }

    useEffect(() => {
        fetchPlaces()
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
                                <Button color="primary" className="w-100 search-btn">Поиск</Button>
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
