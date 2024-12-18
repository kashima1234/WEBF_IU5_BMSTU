import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {T_Place} from "modules/types.ts";

interface Props {
    selectedPlace: T_Place | null
}

const Breadcrumbs = ({ selectedPlace }: Props) => {

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{location.pathname == "/" &&
				<BreadcrumbItem>
					<Link to="/">
						Главная
					</Link>
				</BreadcrumbItem>
			}
			{location.pathname.includes("/places") &&
                <BreadcrumbItem active>
                    <Link to="/places">
						Города
                    </Link>
                </BreadcrumbItem>
			}
            {selectedPlace &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedPlace.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs