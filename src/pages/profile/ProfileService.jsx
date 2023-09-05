import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import coin from '../../assets/icons/coin.svg'
import chat_icon from '../../assets/icons/chat.svg'
import location from '../../assets/icons/location.svg'

const ProfileService = () => {

    const { t } = useTranslation();

    const { authState } = useContext(AuthContext)

    const [user, loading] = useFetch("/api/v1/user/profile/" + authState.id, "data");

    const [services] = useFetch("/api/v1/service", "data");

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
                                        <div htmlFor="servicess" className="mb-2 small">Hyzmatyň görnüşini saýlaň:</div>
                                        <select name='' id='servicess' className="form-select bg-light" required>
                                            {
                                                services?.map((service, index) => (
                                                    <option key={index} value={service.id} id={index} className="d-flex justify-content-between">
                                                        {service.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
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