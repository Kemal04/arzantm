import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Link, NavLink } from "react-router-dom";
import coin from '../../assets/icons/coin.svg'
import chat_icon from '../../assets/icons/chat.svg'
import location from '../../assets/icons/location.svg'

const ProfileService = () => {

    const { t } = useTranslation();

    const { authState } = useContext(AuthContext)

    const [user, loading] = useFetch("/api/v1/user/profile/" + authState.id, "data");

    const [services] = useFetch("/api/v1/service", "data");

    const [locations] = useFetch("/api/v1/location/list", "data");

    console.log(services);

    return (
        <>
            {
                loading ? (
                    <div className=' d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100' style={{ height: "100vh", zIndex: "10", backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="spinner-border text-white">
                        </div>
                    </div>
                ) : (
                    <div className='container mt-5 px-5'>
                        <div className='h3 mb-4'>Hyzmat satyn almak</div>
                        <div className='d-flex justify-content-center'>
                            <div style={{ width: "63%" }}>
                                <div className='row justify-content-between align-items-center mb-4'>
                                    <div className='col-xl-6 d-flex align-items-center'>
                                        <img src={'https://arzan.info/' + user?.avatar_image.url} alt="" className='img-fluid rounded-circle' style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                        <div className='ms-4'>
                                            <div className='h5'>{user?.name}</div>
                                            <div className='d-flex align-items-center text-secondary'>
                                                <img src={location} alt="" className='img-fluid me-1' style={{ width: "11px" }} />
                                                <small>Ashgabat</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-6 d-flex justify-content-end align-items-center'>
                                        <div className='me-4 position-relative'>
                                            <img src={chat_icon} alt="" />
                                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                                2
                                            </span>
                                        </div>
                                        <Link to='/toleg' className='btn-coin text-decoration-none'>
                                            <div className=''>{user?.coin_balance}</div>
                                            <img src={coin} alt="" className='img-fluid ms-2' style={{ width: "18px" }} />
                                        </Link>
                                    </div>
                                    <div className="col-xl-12 mt-4">
                                        {/* <select name='' id='servicess' className="form-select bg-light" required>
                                            {
                                                services?.map((service, index) => (
                                                    <option key={index} value={service.id} id={index} className="d-flex justify-content-between">
                                                        {service.name}
                                                    </option>
                                                ))
                                            }
                                        </select> */}
                                        <div className="small">Hyzmatyň görnüşini saýlaň:</div>
                                        <div className="nav-item dropdown">
                                            <div to="/" className="nav-link dropdown-toggle btn btn-light py-1 border" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                <span>
                                                    Hyzmatlar
                                                </span>
                                            </div>
                                            <ul className="dropdown-menu w-100">
                                                {
                                                    loading ? (
                                                        <li>Loading...</li>
                                                    ) : (
                                                        services?.map((service, index) =>
                                                            <li key={index}><div className="dropdown-item cursor-pointer d-flex justify-content-between">
                                                                <div>
                                                                    <img src={'https://arzan.info/' + service.image} alt="" style={{ width: "20px" }} className="me-2" />
                                                                    {service.name}
                                                                </div>
                                                                <div>
                                                                    <span className="text-warning fw-black">{service.cost}</span>
                                                                    <img src={coin} alt="" style={{ width: "15px" }} className="ms-2" />
                                                                </div>
                                                            </div></li>
                                                        )
                                                    )
                                                }
                                            </ul>
                                        </div>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <label htmlFor="location" className="small">Ýeri</label>
                                        <select name='location' id='location' className="form-select mt-1" required multiple>
                                            {locations?.map((location, index) => (
                                                <option key={index} value={location.id} id={index}>
                                                    {location.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className='col-12 mt-3'>
                                        <div className="small">Umumy bahasy:</div>
                                        <div>
                                            <span className="text-warning fw-black">1300</span>
                                            <img src={coin} alt="" style={{ width: "15px" }} className="ms-2" />
                                        </div>
                                    </div>
                                    <div className="col-xl-12 d-grid mt-3">
                                        <button className="btn btn-green">Satyn al</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}

export default ProfileService