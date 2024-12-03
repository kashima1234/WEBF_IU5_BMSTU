import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchPlace, removeSelectedPlace} from "store/slices/placesSlice.ts";


export const PlacePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const selectedPlace = useAppSelector((state) => state.places.selectedPlace)

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
                    <img
                        alt=""
                        src={selectedPlace.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{selectedPlace.name}</h1>
                    <p className="fs-5">Площадь: {selectedPlace.square}km²</p>
                    <p className="fs-5">Описание: {selectedPlace.description}</p>
                </Col>
            </Row>
        </Container>
    );
};