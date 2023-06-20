import {Link} from "react-router-dom";
import {toast} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faMobileAlt, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";
import {useEffect} from "react";
import useFetch from "../../../hooks/useFetch";

const Banners = () => {
    const [urlParams, setUrlParams] = useState({
        platform: 2,
        location: 1,
        page: 1,
    });
    const [banners, setBanners] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const [locations, error_location] = useFetch("api/v1/location/list", "data");
    const [pages, error_page] = useFetch("api/v1/page/list", "data");

    if (error_location) {
        toast.error(error_location);
    } else if (error_page) {
        toast.error(error_page);
    }

    const fetchData = async (data) => {
        setIsLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_FETCH_ACTIVE}admin/banner?` + new URLSearchParams(data), {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("adACto")}`,
            },
        });

        if (!response.ok) {
            setIsLoading(false);
            return null;
        }
        const resData = await response.json();
        console.log(resData);
        setBanners(resData.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData(urlParams);
    }, [urlParams]);

    useEffect(() => {
        console.log(urlParams);
    }, [urlParams]);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log(id);
        const response = await fetch(`${import.meta.env.VITE_API_FETCH_ACTIVE}admin/banner/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adACto")}`,
            },
        });

        const resData = await response.json();
        console.log(resData);
        if (resData.status === false) {
            console.log("1");
            return null;
        } else if (resData.status === true) {
            console.log("2");
            // toast.success(resData.message);
            fetchData();
        } else {
            console.log("3");
            // toast.error(resData.message);
            return null;
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                            <h3 className="mb-3">Bannerler</h3>
                            <Link to="/admin/banner-create" className="btn btn-primary add-list">
                                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                                Banner goş
                            </Link>
                        </div>
                    </div>
                    <div className="col-xl-8">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button
                                    style={{borderTopRightRadius: "0", borderEndEndRadius: "0", fontWeight: "500"}}
                                    className="text-dark nav-link active px-5 bg-light"
                                    id="pills-home-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-home"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-home"
                                    aria-selected="true"
                                    onClick={() => {
                                        setUrlParams({
                                            ...urlParams,
                                            platform: 2,
                                        });
                                    }}
                                >
                                    <FontAwesomeIcon icon={faMobileAlt} className="me-2" />
                                    App Banner
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button
                                    style={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0", fontWeight: "500"}}
                                    className="text-dark nav-link px-5 bg-light"
                                    id="pills-profile-tab"
                                    data-bs-toggle="pill"
                                    data-bs-target="#pills-profile"
                                    type="button"
                                    role="tab"
                                    aria-controls="pills-profile"
                                    aria-selected="false"
                                    onClick={() => {
                                        setUrlParams({
                                            ...urlParams,
                                            platform: 1,
                                        });
                                    }}
                                >
                                    <FontAwesomeIcon icon={faGlobe} className="me-2" />
                                    Web Banner
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-2 mb-4">
                        <select
                            className="form-control"
                            name="page_id"
                            id="page_id"
                            value={urlParams.page}
                            onChange={(e) => {
                                setUrlParams({
                                    ...urlParams,
                                    page: e.target.value,
                                });
                            }}
                        >
                            {pages?.map((page, index) => (
                                <option key={index} value={page.id}>
                                    {page.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-xl-2 mb-4">
                        <select
                            className="form-control"
                            name="location_id"
                            id="location_id"
                            value={urlParams.location}
                            onChange={(e) => {
                                setUrlParams({
                                    ...urlParams,
                                    location: e.target.value,
                                });
                            }}
                        >
                            {locations?.map((location, index) => (
                                <option key={index} value={location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="col-lg-12">
                            <div className="row">
                                {banners?.map((banner, index) => (
                                    <div key={index} className="col-xl-3 col-sm-6 col-md-6">
                                        <div className="card">
                                            <img src={banner.image} className="card-img-top" alt="Banner img" />
                                            <div className="card-body">
                                                <h4 className="card-title">{banner.title}</h4>
                                                <p className="card-text" dangerouslySetInnerHTML={{__html: banner.description}}></p>
                                                <ul className="list-unstyled">
                                                    <li>
                                                        <b>Url</b> -
                                                        <Link to={banner.url} target="_blank" rel="noreferrer">
                                                            {banner.url}
                                                        </Link>
                                                    </li>
                                                    {/* <li>
                                                        <b>Priority</b> - {banner.priority}
                                                    </li> */}
                                                    <li>
                                                        <b>Start date</b> - {banner.start_date.slice(0, 10)}
                                                    </li>
                                                    <li>
                                                        <b>End date</b> - {banner.end_date.slice(0, 10)}
                                                    </li>
                                                    {/* <li>
                                                        <b>Type</b> - {banner.type}
                                                    </li> */}
                                                    <li>
                                                        <b>Welayat</b> - {banner.location_ids.map((id) => locations.find((el) => el.id == id).name)}
                                                    </li>
                                                    <li>
                                                        <b>Pages</b> - {banner.page_ids.map((id) => pages.find((el) => el.id == id).name)}
                                                    </li>
                                                </ul>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <Link to="banners" className="btn btn-warning btn-sm">
                                                        <FontAwesomeIcon icon={faPen} className="" /> Üýtget
                                                    </Link>
                                                    <button className="btn btn-danger btn-sm" onClick={(e) => handleDelete(e, banner.id)}>
                                                        <FontAwesomeIcon icon={faTrash} className="" /> Poz
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Banners;
