import {useNavigate} from "react-router-dom";
import {useMemo} from "react";
import {Button} from "reactstrap";
import {T_Place} from "modules/types.ts";
import CustomTable from "components/CustomTable/CustomTable.tsx";
import {deletePlace} from "store/slices/placesSlice.ts";
import {useAppDispatch} from "store/store.ts";

type Props = {
    places:T_Place[]
}

const PlacesTable = ({places}:Props) => {

    const navigate = useNavigate()

    const dispatch = useAppDispatch()

    const handleClick = (place_id) => {
        navigate(`/places/${place_id}`)
    }

    const openpRroductEditPage = (place_id) => {
        navigate(`/places/${place_id}/edit`)
    }

    const handleDeletePlace = async (place_id) => {
        dispatch(deletePlace(place_id))
    }

    const columns = useMemo(
        () => [
            {
                Header: "№",
                accessor: "id",
            },
            {
                Header: 'Название',
                accessor: 'name',
                Cell: ({ value }) => value
            },
            {
                Header: 'Площадь',
                accessor: 'square',
                Cell: ({ value }) => value
            },
            {
                Header: "Действие",
                accessor: "edit_button",
                Cell: ({ cell }) => (
                    <Button color="primary" onClick={() => openpRroductEditPage(cell.row.values.id)}>Редактировать</Button>
                )
            },
            {
                Header: "Удалить",
                accessor: "delete_button",
                Cell: ({ cell }) => (
                    <Button color="danger" onClick={() => handleDeletePlace(cell.row.values.id)}>Удалить</Button>
                )
            },
            {
                Header: "картинка",
                accessor: "image",
                Cell: ({value}) => <img src={value} width="140" height="64" />
            },
        ],
        []
    )

    if (!places.length) {
        return (
            <></>
        )
    }

    return (
        <CustomTable columns={columns} data={places} onClick={handleClick} />
    )
};

export default PlacesTable