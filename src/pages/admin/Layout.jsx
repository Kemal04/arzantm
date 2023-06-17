import { Link, NavLink, Outlet } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faBell, faFileText, faHome, faImage, faImages, faList, faMapLocationDot, faMessage, faTags, faTh, faUsers, faVideo, faWallet } from "@fortawesome/free-solid-svg-icons";
import "../../Admin.css";

const AdminLayout = () => {
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
                    {/* kemal */}
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
                                    <NavLink to={"banners"} className="svg-icon">
                                        <FontAwesomeIcon icon={faImages} />
                                        <span className="ml-4">Bannerler</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"gallery/photos"} className="svg-icon">
                                        <FontAwesomeIcon icon={faImage} />
                                        <span className="ml-4">Suratlar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"gallery/videos"} className="svg-icon">
                                        <FontAwesomeIcon icon={faVideo} />
                                        <span className="ml-4">Wideolar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"posts"} className="svg-icon">
                                        <FontAwesomeIcon icon={faTags} />
                                        <span className="ml-4">Arzanladyşlar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"categories"} className="svg-icon">
                                        <FontAwesomeIcon icon={faList} />
                                        <span className="ml-4">Kategoriýalar</span>
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={"sub-categories"} className="svg-icon">
                                        <FontAwesomeIcon icon={faTh} />
                                        <span className="ml-4">Sub kategoriýalar</span>
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
                <div className="iq-top-navbar">
                    <div className="iq-navbar-custom">
                        <nav className="navbar navbar-expand-lg navbar-light p-0">
                            <div className="d-flex align-items-center">
                                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-label="Toggle navigation">
                                    <i className="ri-menu-3-line"></i>
                                </button>
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <ul className="navbar-nav ml-auto navbar-list align-items-center">
                                        <li className="nav-item nav-icon dropdown caption-content">
                                            <a href="#" className="search-toggle dropdown-toggle" id="dropdownMenuButton4" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                {/* <img src="../assets/images/user/1.png" className="img-fluid rounded" alt="user" /> */}
                                            </a>
                                            <div className="iq-sub-dropdown dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                <div className="card shadow-none m-0">
                                                    <div className="card-body p-0 text-center">
                                                        <div className="media-body profile-detail text-center">
                                                            {/* <img src="../assets/images/page-img/profile-bg.jpg" alt="profile-bg" className="rounded-top img-fluid mb-4" /> */}
                                                            {/* <img src="../assets/images/user/1.png" alt="profile-img" className="rounded profile-img img-fluid avatar-70" /> */}
                                                        </div>
                                                        <div className="p-3">
                                                            <h5 className="mb-1">JoanDuo@property.com</h5>
                                                            <p className="mb-0">Since 10 march, 2020</p>
                                                            <div className="d-flex align-items-center justify-content-center mt-3">
                                                                <a href="https://templates.iqonic.design/posdash/html/app/user-profile.html" className="btn border mr-2">
                                                                    Profile
                                                                </a>
                                                                <a href="auth-sign-in.html" className="btn border">
                                                                    Sign Out
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
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
                    <div className="card">
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
