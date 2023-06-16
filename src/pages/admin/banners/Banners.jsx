import {faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {toast} from "react-toastify";
import useFetch from "../../../hooks/useFetch";

const Banners = () => {
    const [banners, loading, error] = useFetch("v1/banners", "banners");

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
                            <a href="page-add-users.html" className="btn btn-primary add-list">
                                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                                Banner goş
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        {loading ? (
                            <tbody>Loading...</tbody>
                        ) : (
                            <div className="row">
                                {banners?.map((banner, index) => (
                                    <div key={index} className="col-sm-6 col-md-6 col-lg-3">
                                        <div className="card">
                                            <img src="../assets/images/page-img/07.jpg" className="card-img-top" alt="#" />
                                            <div className="card-body">
                                                <h4 className="card-title">Card title</h4>
                                                <p className="card-text">It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
                                                <a href="ui-cards.html#" className="btn btn-error">
                                                    <FontAwesomeIcon icon={faTrash} className="mr-5" /> Poz
                                                </a>
                                                <a href="ui-cards.html#" className="btn btn-primary">
                                                    <FontAwesomeIcon icon={faPen} className="mr-5" /> Üýtget
                                                </a>
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
    );
};

export default Banners;
