import {Button, Card, CardBody, CardText, CardTitle, Col, Row} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {T_Place} from "modules/types.ts";
import {
    removePlaceFromDraftExpedition,
    updatePlaceValue
} from "store/slices/expeditionsSlice.ts";
import {useEffect, useState} from "react";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {addPlaceToExpedition, fetchPlaces} from "store/slices/placesSlice.ts";

type Props = {
    place: T_Place,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    editMM?: boolean
}

const PlaceCard = ({place, showAddBtn=false, showRemoveBtn=false, editMM=false}:Props) => {

    const dispatch = useAppDispatch()

    const {is_superuser} = useAppSelector((state) => state.user)

    const {save_mm} = useAppSelector(state => state.expeditions)

    const [local_order, setLocal_order] = useState(place.order)

    const location = useLocation()

    const isExpeditionPage = location.pathname.includes("expeditions")

    const handeAddToDraftExpedition = async () => {
        await dispatch(addPlaceToExpedition(place.id))
        await dispatch(fetchPlaces())
    }

    const handleRemoveFromDraftExpedition = async () => {
        await dispatch(removePlaceFromDraftExpedition(place.id))
    }

    useEffect(() => {
        save_mm && updateValue()
    }, [save_mm]);

    const updateValue = async () => {
        dispatch(updatePlaceValue({
            place_id: place.id,
            order: local_order
        }))
    }

    if (isExpeditionPage) {
        return (
            <Card key={place.id}>
                <Row>
                    <Col>
                        <img
                            alt=""
                            src={place.image}
                            style={{"width": "100%"}}
                        />
                    </Col>
                    <Col md={8}>
                        <CardBody>
                            <CardTitle tag="h5">
                                {place.name}
                            </CardTitle>
                            <CardText>
                                Площадь: {place.square}km².
                            </CardText>
                            <CustomInput label="Порядковый номер" type="number" value={local_order} setValue={setLocal_order} disabled={!editMM || is_superuser} className={"w-25"}/>
                            <Col className="d-flex gap-5">
                                <Link to={`/places/${place.id}`}>
                                    <Button color="primary" type="button">
                                        Открыть
                                    </Button>
                                </Link>
                                {showRemoveBtn &&
                                    <Button color="danger" onClick={handleRemoveFromDraftExpedition}>
                                        Удалить
                                    </Button>
                                }
                            </Col>
                        </CardBody>
                    </Col>
                </Row>
            </Card>
        );
    }

    return (
        <Card key={place.id} style={{width: '18rem' }}>
            <img
                alt=""
                src={place.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {place.name}
                </CardTitle>
                <CardText>
                    Площадь: {place.square}km².
                </CardText>
                <Col className="d-flex justify-content-between">
                    <Link to={`/places/${place.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {!is_superuser && showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftExpedition}>
                            Добавить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};

export default PlaceCard