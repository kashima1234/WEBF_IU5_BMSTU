import {useAppSelector} from "store/store.ts";
import {Card, Col, Row} from "reactstrap";
import ExpeditionCard from "components/ExpeditionCard/ExpeditionCard.tsx";
import {T_Expedition} from "modules/types.ts";
import "./ExpeditionTable.css"

type Props = {
    expeditions:T_Expedition[]
}

const ExpeditionsTable = ({expeditions}:Props) => {

    const {is_superuser} = useAppSelector((state) => state.user)

    return (
        <div className="mb-5">
            <div className="mb-2" style={{fontWeight: "bold"}}>
                <Card style={{padding: "10px"}}>
                    <Row>
                        <Col md={1}>
                            №
                        </Col>
                        <Col md={1}>
                            Статус
                        </Col>
                        <Col md={1}>
                            Участник
                        </Col>
                        {/* <Col>
                            Дата создания
                        </Col> */}
                        <Col>
                            Дата формирования
                        </Col>
                        <Col>
                           Возглавлял
                        </Col>
                        {!is_superuser &&
                            <Col>
                                Действие
                            </Col>
                        }
                        {is_superuser &&
                            <>
                                <Col>
                                    Пользователь
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                                <Col>
                                    Действие
                                </Col>
                            </>
                        }
                    </Row>
                </Card>
            </div>
            <div className="d-flex flex-column gap-2">
                {expeditions.map((expedition, index) => (
                    <ExpeditionCard expedition={expedition} index={index} key={index}/>
                ))}
            </div>
        </div>
    )
};

export default ExpeditionsTable