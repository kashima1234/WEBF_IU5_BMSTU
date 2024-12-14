import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {fetchPlace, removeSelectedPlace} from "store/slices/placesSlice.ts";

const PlacePage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {place} = useAppSelector((state) => state.places)

    useEffect(() => {
        dispatch(fetchPlace(id))
        return () => dispatch(removeSelectedPlace())
    }, []);

    if (!place) {
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
                        src={place.image}
                        className="w-100"
                    />
                </Col>
                <Col md="6">
                    <h1 className="mb-3">{place.name}</h1>
                    <p className="fs-5">Площадь: {place.square}km².</p>
                    <p className="fs-5">Описание: {place.description}</p>
                </Col>
            </Row>
        </Container>
    );
};

export default PlacePage