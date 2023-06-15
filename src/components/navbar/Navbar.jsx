import { useContext, useState } from 'react'
import { ThemeContext } from '../../context/ThemeContext';
import { Link, NavLink } from 'react-router-dom';

import logo from '../../assets/logo/logo.svg'
import location from '../../assets/icons/location.svg'
import search from '../../assets/icons/search.svg'
import globus from '../../assets/icons/globus.svg'
import bell from '../../assets/icons/bell.svg'
import logo_circle from '../../assets/icons/logo-circle.svg'
import user from '../../assets/icons/user.svg'
import user_bold from '../../assets/icons/user-bold.svg'
import user_tick from '../../assets/icons/user-bold-tick.svg'
import key from '../../assets/icons/key.svg'
import not_see from '../../assets/icons/not-see.svg'
import phone_img from '../../assets/icons/phone-bold.svg'

import profile from '../../assets/icons/mikki.png'
import haryt100 from '../../assets/cards/offical/circle/100haryt.png'

import wallet from '../../assets/icons/wallet.svg'
import plus from '../../assets/icons/plus.svg'
import news from '../../assets/icons/news.svg'
import foot from '../../assets/icons/foot.svg'
import service from '../../assets/icons/service.svg'
import selected from '../../assets/icons/selected.svg'
import logout_img from '../../assets/icons/logout.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {

    const { darkMode } = useContext(ThemeContext)

    //REGISTER
    const [name, setName] = useState("")
    const [phone, setPhone] = useState("")
    const [pass, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    const registerUser = async (e) => {
        e.preventDefault();
    }

    //LOGIN
    const [login_phone, setLogin_phone] = useState("")
    const [login_pass, setLogin_Password] = useState("")

    const loginUser = async (e) => {
        e.preventDefault();
    }

    //LOGOUT
    const handleLogout = () => {

    };

    //CHECK SMS
    const checkSMS = async (e) => {
        e.preventDefault();

    }

    const [isVisible1, setVisible1] = useState(false);
    const [isVisible2, setVisible2] = useState(false);
    const [isVisible3, setVisible3] = useState(false);

    const toggle1 = () => {
        setVisible1(!isVisible1);
    };

    const toggle2 = () => {
        setVisible2(!isVisible2);
    };

    const toggle3 = () => {
        setVisible3(!isVisible3);
    };


    return (
        <>
            <nav className={`navbar navbar-expand-lg ${darkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-white'}`}>
                <div className="container">

                    {/* LOGO */}
                    <Link to="/" className="navbar-brand ps-2">
                        <img src={logo} alt="" style={{ width: "120px" }} />
                    </Link>

                    {/* RESPONSOVE BUTTON */}
                    <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    {/* NAVBAR */}
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-4">
                            <li className="nav-item dropdown me-5">
                                <NavLink to="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>
                                        <img src={location} alt="" className='img-fluid me-1' />
                                        Ashgabat
                                    </span>
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><Link to='/' className="dropdown-item">Ashgabat</Link></li>
                                    <li><Link to='/' className="dropdown-item">Ahal</Link></li>
                                    <li><Link to='/' className="dropdown-item">Balkan</Link></li>
                                    <li><Link to='/' className="dropdown-item">Dashoguz</Link></li>
                                    <li><Link to='/' className="dropdown-item">Mary</Link></li>
                                    <li><Link to='/' className="dropdown-item">Lebap</Link></li>
                                </ul>
                            </li>
                            <form className="d-flex ms-5">
                                <input className="form-control me-2 rounded-0 ps-5" type="search" placeholder="Gözle..." style={{ background: `url(${search}) no-repeat left`, backgroundPositionX: "20px", width: "500px" }} />
                            </form>
                            <li className="nav-item dropdown me-5 ms-5">
                                <NavLink to="/" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    <span>
                                        <img src={globus} alt="" className='img-fluid me-1' />
                                        Türkmençe
                                    </span>
                                </NavLink>
                                <ul className="dropdown-menu">
                                    <li><Link to='/' className="dropdown-item text-capitalize">русский</Link></li>
                                    <li><Link to='/' className="dropdown-item">English</Link></li>
                                </ul>
                            </li>
                            <div className="dropdown mt-2">
                                <div className="position-relative" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <img src={bell} alt="" className='me-1' style={{ width: "20px" }} />
                                    <span className="position-absolute translate-middle badge rounded-circle px-1 bg-danger" style={{ top: "6px", left: "22px" }}>
                                        23
                                    </span>
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                    <li><Link to="/" className="dropdown-item">Action</Link></li>
                                    <li><Link to="/" className="dropdown-item">Another action</Link></li>
                                    <li><Link to="/" className="dropdown-item">Something else here</Link></li>
                                </ul>
                            </div>

                            {/* AUTH AREA */}
                            <>
                                <div className="ms-5">
                                    <div type="button" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                        <img src={logo_circle} alt="" className='me-1' style={{ width: "40px" }} />
                                    </div>
                                </div>
                                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content px-4 py-2">
                                            <div className="modal-header d-flex justify-content-center border-0">
                                                <div className="modal-title" id="staticBackdropLabel">
                                                    <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                                        <li className="nav-item" role="presentation">
                                                            <button style={{ borderTopRightRadius: "0", borderEndEndRadius: "0", fontWeight: "500" }} className="text-dark nav-link active px-5 bg-light" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" type="button" role="tab" aria-controls="pills-home" aria-selected="true">
                                                                Ulgama girmek
                                                            </button>
                                                        </li>
                                                        <li className="nav-item" role="presentation">
                                                            <button style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", fontWeight: "500" }} className="text-dark nav-link px-5 bg-light" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">
                                                                Agza bolmak
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="modal-body">
                                                <div className="tab-content" id="pills-tabContent">
                                                    {/* Login */}
                                                    <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                                                        <div className="d-flex justify-content-center align-items-center flex-column">

                                                            <input value={login_phone} onChange={(e) => setLogin_phone(e.target.value)} name='name' className="form-control ps-5" type="text" placeholder="Ulanyjy ady" style={{ background: `url(${user}) no-repeat left`, backgroundPositionX: "20px", width: "400px" }} />

                                                            <div className="input-group ms-3 mb-4">
                                                                <input value={login_pass} onChange={(e) => setLogin_Password(e.target.value)} name='password' className="form-control ps-5 mt-4 border-end-0 flex-grow-0" type={!isVisible1 ? "password" : "text"} placeholder="Açar sözi" style={{ background: `url(${key}) no-repeat left`, backgroundPositionX: "20px", width: "360px" }} />
                                                                <span className="input-group-text mt-4 bg-white border-start-0" id="basic-addon1" style={{ cursor: "pointer" }} onClick={toggle1}>
                                                                    {isVisible1 ? <FontAwesomeIcon icon={faEye} className='text-muted' /> : <img src={not_see} alt="" className='img-fluid' />}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className="ms-2">
                                                                <input type="checkbox" className="form-check-input me-2 p-2" id="exampleCheck1" />
                                                                <label className="form-check-label" htmlFor="exampleCheck1">Ýatda sakla</label>
                                                            </div>
                                                            <div className='me-2'>
                                                                <Link to='/' className='text-secondary text-decoration-none'>Açar sözi unutdym</Link>
                                                            </div>
                                                        </div>
                                                        <div className="border-0 d-grid mt-3" style={{ justifyContent: 'unset' }}>
                                                            <button onClick={loginUser} type="button" className="btn btn-green">Ulgama gir</button>
                                                        </div>
                                                    </div>
                                                    {/* Login */}

                                                    {/* Register */}
                                                    <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                                                        <div className="d-flex justify-content-center flex-column">
                                                            <label className="mb-2 ms-1" style={{ fontWeight: "500" }}>Çagyranyň linki, QR-kody ýa-da nomeri</label>
                                                            <input className="form-control ps-5 mb-4" type="text" placeholder="Çagyranyň linki, QR-kody ýa-da nomeri" style={{ background: `url(${user_tick}) no-repeat left`, backgroundPositionX: "20px", width: "400px" }} />

                                                            <label className="mb-2 ms-1" style={{ fontWeight: "500" }}>Ulanyjy ady</label>
                                                            <input value={name} onChange={(e) => setName(e.target.value)} name='name' className="form-control ps-5 mb-4" type="text" placeholder="Ulanyjy ady" style={{ background: `url(${user}) no-repeat left`, backgroundPositionX: "20px", width: "400px" }} />

                                                            <label className="ms-1 mb-1" style={{ fontWeight: "500" }}>Telefon belgisi</label>
                                                            <input value={phone} onChange={(e) => setPhone(e.target.value)} type="number" min="60000000" max="65999999" name='phone' className="form-control ps-5 mb-4" placeholder="Telefon belgisi" style={{ background: `url(${phone_img}) no-repeat left`, backgroundPositionX: "20px", width: "400px" }} />

                                                            <div className="input-group mb-4">
                                                                <label className="mb-2 ms-1" style={{ fontWeight: "500" }}>Açar sözi</label>
                                                                <input type={!isVisible2 ? "password" : "text"} value={pass} onChange={(e) => setPassword(e.target.value)} name='pass' className="form-control ps-5 border-end-0 flex-grow-0" placeholder="Açar sözi" style={{ background: `url(${key}) no-repeat left`, backgroundPositionX: "20px", width: "360px" }} />
                                                                <span className="input-group-text bg-white border-start-0" id="basic-addon1" style={{ cursor: "pointer" }} onClick={toggle2}>
                                                                    {isVisible2 ? <FontAwesomeIcon icon={faEye} className='text-muted' /> : <img src={not_see} alt="" className='img-fluid' />}
                                                                </span>
                                                            </div>

                                                            <div className="input-group mb-4">
                                                                <label className="mb-2 ms-1" style={{ fontWeight: "500" }}>Açar sözi (tassykla)</label>
                                                                <input type={!isVisible3 ? "password" : "text"} value={cPassword} onChange={(e) => setCPassword(e.target.value)} name='confirm_pass' className="form-control ps-5 border-end-0 flex-grow-0" placeholder="Açar sözi (tassykla)" style={{ background: `url(${key}) no-repeat left`, backgroundPositionX: "20px", width: "360px" }} />
                                                                <span className="input-group-text bg-white border-start-0" id="basic-addon1" style={{ cursor: "pointer" }} onClick={toggle3}>
                                                                    {isVisible3 ? <FontAwesomeIcon icon={faEye} className='text-muted' /> : <img src={not_see} alt="" className='img-fluid' />}
                                                                </span>
                                                            </div>
                                                        </div>

                                                        <label className="ms-1 mb-1" style={{ fontWeight: "500" }}>Tassyklama görnüşi</label>
                                                        <select className="form-select mb-3" aria-label="Tassyklama koduny al" style={{ width: "400px" }} disabled>
                                                            <option defaultValue>Tassyklama koduny al</option>
                                                            <option value="1">One</option>
                                                            <option value="2">Two</option>
                                                            <option value="3">Three</option>
                                                        </select>

                                                        <div className="ms-2">
                                                            <input type="checkbox" className="form-check-input me-2 p-2" id="exampleCheck1" />
                                                            <label className="form-check-label" htmlFor="exampleCheck1">Düzgunnamany okadym we kabul etdim</label>
                                                        </div>

                                                        <div className="border-0 d-grid mt-3" style={{ justifyContent: 'unset' }}>
                                                            <button onClick={registerUser} data-bs-toggle="modal" data-bs-target="#exampleModalVertification" type="button" className="btn btn-green">Ulgama gir</button>
                                                        </div>
                                                    </div>
                                                    {/* Register */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="modal fade" id="exampleModalVertification" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                    <div className="modal-dialog">
                                        <div className="modal-content px-4 py-2">
                                            <div className="modal-header d-flex justify-content-center border-0">
                                                dsfg
                                            </div>
                                            <div className="modal-body">
                                                <button className='btn btn-primary' onClick={checkSMS}>SMS ugratdym</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>

                            {/* USER INFORMATION  */}
                            <>
                                {/* PROFILE AREA  */}
                                <div className="dropdown ms-5">
                                    <div className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={profile} alt="" className='me-1' style={{ width: "40px" }} />
                                    </div>
                                    <ul className="dropdown-menu border-0 shadow" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <Link to="/profile" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={user_bold} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Profil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile/wallet" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={wallet} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Gapjyk
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/post-gosmak" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={plus} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Post goşmak
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <Link to="/profile" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={selected} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Bellenenler
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={bell} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Bildirişler
                                                <span className='small bg-danger px-1 rounded-circle ms-2 text-white' style={{ fontSize: "8px" }}>23</span>
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <div onClick={handleLogout} className="dropdown-item d-flex align-items-center mb-2 pe-4 text-danger" style={{ cursor: "pointer" }}>
                                                <img src={logout_img} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Ulgamdan çykmak
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                {/* OFFICAL AREA  */}
                                <div className="dropdown ms-5">
                                    <div className="" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img src={haryt100} alt="" className='me-1' style={{ width: "40px" }} />
                                    </div>
                                    <ul className="dropdown-menu border-0 shadow" aria-labelledby="dropdownMenuButton1">
                                        <li>
                                            <Link to="/offical" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={user_bold} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Profil
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile/wallet" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={wallet} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Gapjyk
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/post-gosmak" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={plus} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Post goşmak
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/post-gosmak" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={service} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Hyzmat aatyn almak
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <div className="dropdown-item d-flex align-items-center mb-2" style={{ cursor: "pointer" }} type="button" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                                <img src={foot} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Myhmanlar
                                            </div>
                                        </li>
                                        <li>
                                            <Link to="/profile" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={news} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Rassylka
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={selected} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Bellenenler
                                            </Link>
                                        </li>
                                        <li>
                                            <Link to="/profile" className="dropdown-item d-flex align-items-center mb-2">
                                                <img src={bell} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Bildirişler
                                                <span className='small bg-danger px-1 rounded-circle ms-2 text-white' style={{ fontSize: "8px" }}>23</span>
                                            </Link>
                                        </li>
                                        <li><hr className="dropdown-divider" /></li>
                                        <li>
                                            <div onClick={handleLogout} className="dropdown-item d-flex align-items-center mb-2 pe-4 text-danger" style={{ cursor: "pointer" }}>
                                                <img src={logout_img} alt='' className='img-fluid me-2' style={{ width: "16px" }} />
                                                Ulgamdan çykmak
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </>
                        </ul>
                    </div>
                </div>
            </nav >

            {/* GUESTS  */}
            <div className="modal fade" id="staticBackdrop" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header shadow">
                            <h1 className="modal-title fs-5" id="staticBackdropLabel">Myhmanlar <span className='text-green'>(+57)</span></h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ backgroundColor: "#F9FAFC" }}>
                            <div className='d-flex align-items-center mb-3'>
                                <div className='rounded-circle bg-green p-1 small d-inline-block me-3'></div>
                                <div className='card border-0 py-2 px-3 shadow-sm w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='d-flex align-items-center'>
                                            <img src={haryt100} alt="" style={{ width: "30px" }} />
                                            <span className='small ms-2'>Kemal Hojayew</span>
                                        </div>
                                        <div className='text-secondary small'>
                                            5 minut öň
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex align-items-center mb-3'>
                                <div className='card border-0 py-2 px-3 shadow-sm w-100'>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <div className='d-flex align-items-center'>
                                            <img src={haryt100} alt="" style={{ width: "30px" }} />
                                            <span className='small ms-2'>Kemal Hojayew</span>
                                        </div>
                                        <div className='text-secondary small'>
                                            5 minut öň
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SIDEBAR */}
            <div className={darkMode ? `offcanvas offcanvas-start bg-dark` : `offcanvas offcanvas-start bg-white`} style={{ width: "250px" }} data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel" >
                <div className="offcanvas-header flex-column align-items-start p-0">
                    <div className='d-flex align-items-center justify-content-between p-3'>
                        <h5 className="offcanvas-title me-5 pe-5" id="offcanvasWithBothOptionsLabel">Logo</h5>
                        <button type="button" className={`btn-close ms-4`} data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Navbar