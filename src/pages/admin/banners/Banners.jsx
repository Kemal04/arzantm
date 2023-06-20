import {Link} from "react-router-dom";
import {toast} from "react-hot-toast";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGlobe, faMobileAlt, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../../hooks/useFetch";

const Banners = () => {
    const page = 1;
    const type = 1;
    const location = 1;
    const [banners, loading, error] = useFetch(`admin/banner?type=${type}&location=${location}&page=${page}`, "banners");

    if (error) {
        toast.error(error.message);
    }

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
                    <div className="col-xl-10">
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button style={{borderTopRightRadius: "0", borderEndEndRadius: "0", fontWeight: "500"}} className="text-dark nav-link active px-5 bg-light" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                    <FontAwesomeIcon icon={faMobileAlt} className="me-2" />
                                    App Banner
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button style={{borderTopLeftRadius: "0", borderBottomLeftRadius: "0", fontWeight: "500"}} className="text-dark nav-link px-5 bg-light" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                    <FontAwesomeIcon icon={faGlobe} className="me-2" />
                                    Web Banner
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="col-xl-2 mb-4">
                        <select className="form-control" id="validationDefault04" required>
                            <option defaultValue>Welayats</option>
                            <option value="Ashgabat">Ashgabat</option>
                            <option value="Ahal">Ahal</option>
                            <option value="Mary">Mary</option>
                            <option value="Lebap">Lebap</option>
                            <option value="Dashoguz">Dashoguz</option>
                            <option value="Balkan">Balkan</option>
                        </select>
                    </div>
                    <div className="col-lg-12">
                        {loading ? (
                            <div>Loading...</div>
                        ) : (
                            <div className="row">
                                {banners?.map(
                                    (banner, index) =>
                                        banner.type === "App" && (
                                            <div key={index} className="col-xl-3 col-sm-6 col-md-6">
                                                <div className="card">
                                                    <img src={banner.banner_img} className="card-img-top" alt="#" />
                                                    <div className="card-body">
                                                        <h4 className="card-title">{banner.title}</h4>
                                                        <p className="card-text">{banner.note}</p>
                                                        <ul className="list-unstyled">
                                                            <li>
                                                                <b>Url</b> -{" "}
                                                                <Link to={banner.url} target="_blank" rel="noreferrer">
                                                                    {banner.url}
                                                                </Link>
                                                            </li>
                                                            <li>
                                                                <b>Priority</b> - {banner.priority}
                                                            </li>
                                                            <li>
                                                                <b>Start date</b> - {banner.start_date}
                                                            </li>
                                                            <li>
                                                                <b>End date</b> - {banner.end_date}
                                                            </li>
                                                            <li>
                                                                <b>Type</b> - {banner.type}
                                                            </li>
                                                            <li>
                                                                <b>Welayat</b> - {banner.welayat}
                                                            </li>
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
                                        )
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Banners;
