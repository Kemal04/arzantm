import { faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const Banners = () => {

    const [banners, loading, error] = useFetch("v1/banner", "banners");

    if (error) {
        toast.error(error.message);
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                            <div>
                                <h3 className="mb-3">Bannerler</h3>
                            </div>
                            <Link to="/admin/banner-create" className="btn btn-primary add-list">
                                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                                Banner goş
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="row">
                                {
                                    banners?.map((banner, index) => (
                                        banner.type === "App" &&
                                        <div key={index} className="col-xl-3 col-sm-6 col-md-6">
                                            <div className="card">
                                                <img src={banner.banner_img} className="card-img-top" alt="#" />
                                                <div className="card-body">
                                                    <h4 className="card-title">{banner.title}</h4>
                                                    <p className="card-text">{banner.note}</p>
                                                    <ul className="list-unstyled">
                                                        <li><b>Url</b> - <Link to={banner.url} target="_blank" rel="noreferrer">{banner.url}</Link></li>
                                                        <li><b>Priority</b> - {banner.priority}</li>
                                                        <li><b>Start date</b> - {banner.start_date}</li>
                                                        <li><b>End date</b> - {banner.end_date}</li>
                                                        <li><b>Type</b> - {banner.type}</li>
                                                        <li><b>Welayat</b> - {banner.welayat}</li>
                                                    </ul>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        <Link to="banners" className="btn btn-warning btn-sm">
                                                            <FontAwesomeIcon icon={faPen} className="" /> Üýtget
                                                        </Link>
                                                        <button className="btn btn-danger btn-sm">
                                                            <FontAwesomeIcon icon={faTrash} className="" /> Poz
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Banners