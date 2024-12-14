import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftExpedition,
    fetchExpedition,
    removeExpedition, sendDraftExpedition,
    triggerUpdateMM,
    updateExpedition
} from "store/slices/expeditionsSlice.ts";
import {Button, Col, Form, Row} from "reactstrap";
import {E_ExpeditionStatus, T_Place} from "modules/types.ts";
import PlaceCard from "components/PlaceCard/PlaceCard.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import {formatDate} from "utils/utils.ts";

const ExpeditionPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const {is_authenticated} = useAppSelector((state) => state.user)

    const expedition = useAppSelector((state) => state.expeditions.expedition)

    const [viking, setVikinng] = useState<string>(expedition?.viking)

    const [date, setDate] = useState<string>(expedition?.date)

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/")
        }
    }, [is_authenticated]);

    useEffect(() => {
        is_authenticated && dispatch(fetchExpedition(id))
        return () => dispatch(removeExpedition())
    }, []);

    useEffect(() => {
        setVikinng(expedition?.viking)
        setDate(expedition?.date)
    }, [expedition]);

    const sendExpedition = async (e) => {
        e.preventDefault()

        await saveExpedition()

        await dispatch(sendDraftExpedition())

        navigate("/expeditions")
    }

    const saveExpedition = async (e?) => {
        e?.preventDefault()

        const data = {
            viking
        }

        await dispatch(updateExpedition(data))
        await dispatch(triggerUpdateMM())
        await dispatch(triggerUpdateMM())
    }

    const deleteExpedition = async () => {
        await dispatch(deleteDraftExpedition())
        navigate("/places")
    }

    if (!expedition) {
        return (
            <div>

            </div>
        )
    }

    const isDraft = expedition.status == E_ExpeditionStatus.Draft
    const isCompleted = expedition.status == E_ExpeditionStatus.Completed

    return (
        <Form onSubmit={sendExpedition} className="pb-5">
            <h2 className="mb-5">{isDraft ? "Черновой поход" : `Поход №${id}` }</h2>
            <Row className="mb-5 fs-5 w-25">
                <CustomInput label="Возглавлял" placeholder="Введите имя" value={viking} setValue={setVikinng} disabled={!isDraft}/>
                {isCompleted && <CustomInput label="Дата" value={formatDate(date, {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })} disabled={true}/>}
            </Row>
            <Row>
                {expedition.places.length > 0 ? expedition.places.map((place:T_Place) => (
                    <Row key={place.id} className="d-flex justify-content-center mb-5">
                        <PlaceCard place={place} showRemoveBtn={isDraft} editMM={isDraft} />
                    </Row>
                )) :
                    <h3 className="text-center">Города не добавлены</h3>
                }
            </Row>
            {isDraft &&
                <Row className="mt-5">
                    <Col className="d-flex gap-5 justify-content-center">
                        <Button color="success" className="fs-4" onClick={saveExpedition}>Сохранить</Button>
                        <Button color="primary" className="fs-4" type="submit">Отправить</Button>
                        <Button color="danger" className="fs-4" onClick={deleteExpedition}>Удалить</Button>
                    </Col>
                </Row>
            }
        </Form>
    );
};

export default ExpeditionPage