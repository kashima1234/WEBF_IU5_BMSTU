import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deleteDraftExpedition,
    fetchExpedition,
    removeExpedition,
    sendDraftExpedition,
    triggerUpdateMM,
    updateExpedition
} from "store/slices/expeditionsSlice.ts";
import PlaceCard from "components/PlaceCard";
import {Button, Col, Form, Row} from "reactstrap";
import {E_ExpeditionStatus, T_Place} from "src/utils/types.ts";
import CustomInput from "components/CustomInput";
import CustomDatePicker from "components/CustomDatePicker";

export const ExpeditionPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const navigate = useNavigate()

    const isAuthenticated = useAppSelector((state) => state.user?.is_authenticated)

    const expedition = useAppSelector((state) => state.expeditions.expedition)

    const [viking, setViking] = useState<string>(expedition?.viking)
    const [date, setDate] = useState<string>(expedition?.date)

    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/403/")
        }
    }, [isAuthenticated]);

    useEffect(() => {
        dispatch(fetchExpedition(id))
        return () => dispatch(removeExpedition())
    }, []);

    useEffect(() => {
        setViking(expedition?.viking)
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
                <CustomInput label="Название" placeholder="Введите имя викинга" value={viking} setValue={setViking} disabled={!isDraft}/>
                {isCompleted && <CustomDatePicker label="Дата похода" value={date} disabled={true}/>}
            </Row>
            <Row>
                {expedition.places.length > 0 ? expedition.places.map((place:T_Place) => (
                    <Col md="4" key={place.id} className="d-flex justify-content-center mb-5">
                        <PlaceCard place={place} showRemoveBtn={isDraft} showMM={true} editMM={isDraft} value={place.order}/>
                    </Col>
                )) :
                    <h3 className="text-center">Города еще не добавлены</h3>
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