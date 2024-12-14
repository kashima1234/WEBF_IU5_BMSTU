import {useNavigate, useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Col, Container, Row} from "reactstrap";
import {useAppDispatch, useAppSelector} from "store/store.ts";
import {
    deletePlace,
    fetchPlace,
    removeSelectedPlace,
    updatePlace,
    updatePlaceImage
} from "store/slices/placesSlice.ts";
import UploadButton from "components/UploadButton/UploadButton.tsx";
import CustomInput from "components/CustomInput/CustomInput.tsx";
import CustomTextarea from "components/CustomTextarea/CustomTextarea.tsx";

const PlaceEditPage = () => {
    const { id } = useParams<{id: string}>();

    const dispatch = useAppDispatch()

    const {place} = useAppSelector((state) => state.places)

    const {is_superuser} = useAppSelector((state) => state.user)

    const [name, setName] = useState<string>(place?.name)

    const [description, setDescription] = useState<string>(place?.description)

    const [square, setSquare] = useState<number>(place?.square)

    useEffect(() => {
        if (!is_superuser) {
            navigate("/403/")
        }
    }, [is_superuser]);

    const navigate = useNavigate()

    const [imgFile, setImgFile] = useState<File>()
    const [imgURL, setImgURL] = useState<string>(place?.image)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const file = e.target?.files[0]
            setImgFile(file)
            setImgURL(URL.createObjectURL(file))
        }
    }

    const savePlace = async() => {
        if (imgFile) {
            const form_data = new FormData()
            form_data.append('image', imgFile, imgFile.name)
            await dispatch(updatePlaceImage({
                place_id: place.id,
                data: form_data
            }))
        }

        const data = {
            name,
            description,
            square
        }

        await dispatch(updatePlace({
            place_id: place.id,
            data
        }))

        navigate("/places-table/")
    }

    useEffect(() => {
        dispatch(fetchPlace(id))
        return () => dispatch(removeSelectedPlace())
    }, []);

    useEffect(() => {
        setName(place?.name)
        setDescription(place?.description)
        setSquare(place?.square)
        setImgURL(place?.image)
    }, [place]);

    const handleDeletePlace = async () => {
        await dispatch(deletePlace(id))
        navigate("/places-table/")
    }

    if (!place) {
        return (
            <div>

            </div>
        )
    }

    return (
        <Container>
            <Row>
                <Col md={6}>
                    <img src={imgURL} alt="" className="w-100"/>
                    <Container className="mt-3 d-flex justify-content-center">
                        <UploadButton handleFileChange={handleFileChange} />
                    </Container>
                </Col>
                <Col md={6}>
                    <CustomInput label="Название" placeholder="Введите название" value={name} setValue={setName}/>
                    <CustomTextarea label="Описание" placeholder="Введите описание" value={description} setValue={setDescription}/>
                    <CustomInput label="Площадь" placeholder="Введите цену" value={square} setValue={setSquare}/>
                    <Col className="d-flex justify-content-center gap-5 mt-5">
                        <Button color="success" className="fs-4" onClick={savePlace}>Сохранить</Button>
                        <Button color="danger" className="fs-4" onClick={handleDeletePlace}>Удалить</Button>
                    </Col>
                </Col>
            </Row>
        </Container>
    );
};

export default PlaceEditPage