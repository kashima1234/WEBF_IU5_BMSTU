import {Button, Card, CardBody, CardText, CardTitle, Col} from "reactstrap";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {addPlaceToExpedition, fetchPlaces} from "store/slices/placesSlice.ts";
import {T_Place} from "utils/types.ts";
import {removePlaceFromDraftExpedition, updatePlaceValue} from "store/slices/expeditionsSlice.ts";
import CustomInput from "components/CustomInput";
import {useEffect, useState} from "react";

type Props = {
    place: T_Place,
    showAddBtn?: boolean,
    showRemoveBtn?: boolean,
    showMM?: boolean,
    editMM?: boolean
}

export const PlaceCard = ({place, showAddBtn = false, showRemoveBtn = false, showMM=false, editMM = false}:Props) => {

    const dispatch = useAppDispatch()

    const {save_mm} = useAppSelector(state => state.expeditions)

    const [local_order, setLocal_order] = useState(place.order)

    const handeAddToDraftExpedition = async () => {
        await dispatch(addPlaceToExpedition(place.id))
        await dispatch(fetchPlaces())
    }

    const handleRemoveFromDraftExpedition = async () => {
        await dispatch(removePlaceFromDraftExpedition(place.id))
    }

    useEffect(() => {
        dispatch(updatePlaceValue({
            place_id: place.id,
            order: local_order
        }))
    }, [save_mm]);

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
                    Площадь: {place.square}km²
                </CardText>
                {showMM && <CustomInput label="Порядковый номер" type="number" value={local_order} setValue={setLocal_order} disabled={!editMM} />}
                <Col className="d-flex justify-content-between">
                    <Link to={`/places/${place.id}`}>
                        <Button color="primary" type="button">
                            Открыть
                        </Button>
                    </Link>
                    {showAddBtn &&
                        <Button color="secondary" onClick={handeAddToDraftExpedition}>
                            Добавить
                        </Button>
                    }
                    {showRemoveBtn &&
                        <Button color="danger" onClick={handleRemoveFromDraftExpedition}>
                            Удалить
                        </Button>
                    }
                </Col>
            </CardBody>
        </Card>
    );
};