import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {formatDate} from "src/utils/utils.ts";
import {T_Expedition} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";

const ExpeditionsTable = ({expeditions}:{expeditions:T_Expedition[]}) => {
    const navigate = useNavigate()

    const handleClick = (expedition_id) => {
        navigate(`/expeditions/${expedition_id}`)
    }

    const STATUSES = {
        1: "Введен",
        2: "В работе",
        3: "Завершен",
        4: "Отменён",
        5: "Удалён"
    }

    const columns = useMemo(
        () => [
            {
                Header: '№',
                accessor: 'id',
            },
            {
                Header: 'Статус',
                accessor: 'status',
                Cell: ({ value }) => STATUSES[value]
            },
            {
                Header: 'Дата',
                accessor: 'date',
                Cell: ({ value }) => formatDate(value, {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                })
            },
            {
                Header: 'Дата создания',
                accessor: 'date_created',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата формирования',
                accessor: 'date_formation',
                Cell: ({ value }) => formatDate(value)
            },
            {
                Header: 'Дата завершения',
                accessor: 'date_complete',
                Cell: ({ value }) => formatDate(value)
            }
        ],
        []
    )

    return (
        <CustomTable columns={columns} data={expeditions} onClick={handleClick}/>
    )
};

export default ExpeditionsTable