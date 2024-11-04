import {Breadcrumb, BreadcrumbItem} from "reactstrap";
import {Link, useLocation} from "react-router-dom";
import {isHomePage, isPlacePage} from "utils/utils.ts";
import {RootState, useAppSelector} from "src/store/store.ts";


const Breadcrumbs = () => {

    const {selectedPlace} = useAppSelector((state:RootState) => state.places)

    const location = useLocation()

    return (
        <Breadcrumb className="fs-5">
			{isHomePage(location.pathname) &&
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
            {isPlacePage(location.pathname) &&
                <BreadcrumbItem active>
                    <Link to={location.pathname}>
                        { selectedPlace?.name }
                    </Link>
                </BreadcrumbItem>
            }
			<BreadcrumbItem />
        </Breadcrumb>
    );
};

export default Breadcrumbs