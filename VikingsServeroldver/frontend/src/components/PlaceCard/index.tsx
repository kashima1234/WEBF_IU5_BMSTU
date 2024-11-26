import {Button, Card, CardBody, CardImg, CardText, CardTitle} from "reactstrap";
import mockImage from "assets/mock.png";
import {Link} from "react-router-dom";
import {T_Place} from "modules/types.ts";

interface PlaceCardProps {
    place: T_Place,
    isMock: boolean
}

const PlaceCard = ({place, isMock}: PlaceCardProps) => {
    return (
        <Card key={place.id} style={{width: '18rem', margin: "0 auto 50px" }}>
            <CardImg
                src={isMock ? mockImage as string : place.image}
                style={{"height": "200px"}}
            />
            <CardBody>
                <CardTitle tag="h5">
                    {place.name}
                </CardTitle>
                <CardText>
                    Площадь: {place.square}km².
                </CardText>
                <Link to={`/places/${place.id}`}>
                    <Button color="primary">
                        Открыть
                    </Button>
                </Link>
            </CardBody>
        </Card>
    );
};

export default PlaceCard