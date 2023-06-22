import {Link, NavLink, Navigate, Outlet} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faBell, faFileText, faHome, faImage, faImages, faList, faMapLocationDot, faMessage, faSignOutAlt, faTags, faTh, faUsers, faVideo, faWallet} from "@fortawesome/free-solid-svg-icons";
import {useAuth} from "../../context/AuthContext";
import "../../Admin.css";

const AdminLayout = () => {
    const {admin, setAdmin, isLoggedIn, setIsLoggedIn} = useAuth();

    const logout = () => {
        setIsLoggedIn(false);
        setAdmin({
            id: 0,
            role: null,
            status: false,
        });
        localStorage.removeItem("adACto");
    };

    if (admin.status === false || !isLoggedIn) {
        return <Navigate to={"/admin/login"} />;
    }

    return (
        <>
            <div className="wrapper">
                <div className="iq-sidebar sidebar-default">
                    <div className="iq-sidebar-logo d-flex align-items-center justify-content-between">
                        <NavLink to={"/"} className="header-logo">
                            <h5 className="logo-title light-logo ml-3 text-green">ARZAN TM</h5>
                        </NavLink>
                        <div className="iq-menu-bt-sidebar ml-0">
                            <FontAwesomeIcon className="wrapper-menu" icon={faBars} />
                        </div>
                    </div>
                    <div className="data-scrollbar" data-scroll="1">
                        <nav className="iq-sidebar-menu">
                            <ul id="iq-sidebar-toggle" className="iq-menu">
                                <li>
                                    <NavLink to={"/admin"} className="svg-icon" end>
                                        <FontAwesomeIcon icon={faHome} />
                                        <span className="ml-4">Esasy Sahypa</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"users"} className="svg-icon">
                                        <FontAwesomeIcon icon={faUsers} />
                                        <span className="ml-4">Ulanyjylar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"categories"} className="svg-icon">
                                        <FontAwesomeIcon icon={faList} />
                                        <span className="ml-4">Kategoriýalar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"subcategories"} className="svg-icon">
                                        <FontAwesomeIcon icon={faTh} />
                                        <span className="ml-4">Sub kategoriýalar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"banners"} className="svg-icon">
                                        <FontAwesomeIcon icon={faImages} />
                                        <span className="ml-4">Bannerler</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"photos"} className="svg-icon">
                                        <FontAwesomeIcon icon={faImage} />
                                        <span className="ml-4">Suratlar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"videos"} className="svg-icon">
                                        <FontAwesomeIcon icon={faVideo} />
                                        <span className="ml-4">Wideolar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"video_categories"} className="svg-icon">
                                        <FontAwesomeIcon icon={faVideo} />
                                        <span className="ml-4">Wideo kategoriýalary</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"posts"} className="svg-icon">
                                        <FontAwesomeIcon icon={faTags} />
                                        <span className="ml-4">Arzanladyşlar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"welayats"} className="svg-icon">
                                        <FontAwesomeIcon icon={faMapLocationDot} />
                                        <span className="ml-4">Welayatlar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"payments"} className="svg-icon">
                                        <FontAwesomeIcon icon={faWallet} />
                                        <span className="ml-4">Tölegler</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"notifications"} className="svg-icon">
                                        <FontAwesomeIcon icon={faBell} />
                                        <span className="ml-4">Bildirişler</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"pages"} className="svg-icon">
                                        <FontAwesomeIcon icon={faFileText} />
                                        <span className="ml-4">Sahypalar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"comments"} className="svg-icon">
                                        <FontAwesomeIcon icon={faMessage} />
                                        <span className="ml-4">Teswirler</span>
                                    </NavLink>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="iq-top-navbar" style={{minHeight: "0"}}>
                    <div className="iq-navbar-custom">
                        <nav className="navbar navbar-light py-3 justify-content-end">
                            <div className="d-flex align-items-center">
                                <button
                                    className="btn btn-outline-green"
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                                    Log out
                                </button>
                            </div>
                        </nav>
                    </div>
                </div>
                <div className="content-page">
                    <Outlet />
                </div>
            </div>
            <footer className="iq-footer">
                <div className="container-fluid">
                    <div className="card border-0 mb-2">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <span className="mr-1">2023 ©</span>
                                    <Link to={"/"}>Arzan TM</Link>.
                                </div>
                                <div className="col-lg-6 text-right">
                                    <span>
                                        Powered by{" "}
                                        <a href="https://it.net.tm/" target="_blank" rel="noreferrer">
                                            Sanly Çözgüt HJ
                                        </a>
                                        .
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default AdminLayout;
