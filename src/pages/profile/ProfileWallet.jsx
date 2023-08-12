import { useContext } from 'react'

import location from '../../assets/icons/location.svg'
import coin from '../../assets/icons/coin.svg'
import chat_icon from '../../assets/icons/chat.svg'
import shoping_bag from '../../assets/icons/shoping-bag-green.svg'
import coins from '../../assets/icons/coins.svg'
import get_coin from '../../assets/icons/get-coin.svg'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ProfileWallet = () => {

    const { authState } = useContext(AuthContext)

    const [user, loading, error] = useFetch("/api/v1/user/profile/" + authState.id, "data");

    if (error) {
        toast.error(error.message);
    }

    const { t } = useTranslation();

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='container mt-5 px-5'>
                    <div className='h3 mb-4'>{t('gapjyk')}</div>
                    <div className='d-flex justify-content-center'>
                        <div style={{ width: "63%" }}>
                            <div className='row justify-content-between align-items-center mb-4'>
                                <div className='col-xl-6 d-flex align-items-center'>
                                    <img src={'https://arzan.info/' + user?.avatar_image.url} alt="" className='img-fluid rounded-circle' style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                                    <div className='ms-4'>
                                        <div className='h5'>{user.name}</div>
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
                                        <div className=''>{user.coin_balance}</div>
                                        <img src={coin} alt="" className='img-fluid ms-2' style={{ width: "18px" }} />
                                    </Link>
                                </div>
                            </div>
                            <div className='row gx-2 align-items-center my-3'>
                                <div className='col-xl-4 mb-3'>
                                    <div className='border rounded-1 d-flex align-items-center justify-content-between p-4'>
                                        <img src={shoping_bag} alt="" className='img-fluid' style={{ width: "43px" }} />
                                        <div className='fw-black'>Ball satyn almak</div>
                                    </div>
                                </div>
                                <div className='col-xl-4 mb-3'>
                                    <div className='border rounded-1 d-flex align-items-center justify-content-between p-4'>
                                        <img src={get_coin} alt="" className='img-fluid' style={{ width: "40px" }} />
                                        <div className='fw-black'>Ball soramak</div>
                                    </div>
                                </div>
                                <div className='col-xl-4 mb-3'>
                                    <div className='border rounded-1 d-flex align-items-center justify-content-between p-4'>
                                        <img src={coins} alt="" className='img-fluid' style={{ width: "44px" }} />
                                        <div className='fw-black'>Ball geçirmek</div>
                                    </div>
                                </div>
                            </div>
                            <div className='d-grid mb-4'>
                                <Link to="/profile/resmi-hasap-ac" className='btn btn-green'>Resmi hasap aç</Link>
                            </div>
                            <div className='d-flex justify-content-between align-items-center mb-2'>
                                <div className='fs-18 fw-black'>Geçirimler</div>
                                <div className='small text-green fw-black'>Hemmesi</div>
                            </div>
                            <div className='row'>
                                <div className='col-xl-12 mb-3'>
                                    <div className='bg-light py-2 px-3'>
                                        <div className='d-flex justify-content-between align-items-center mb-2'>
                                            <div className='text-secondary small'>Ball geçirmek</div>
                                            <div className='text-secondary small'>16.01.2023</div>
                                        </div>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div className='fw-black'>Billie Eilish</div>
                                            <div className='fw-black text-warning d-flex align-items-center'>200 <img src={coin} alt="" className='ms-1' /></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default ProfileWallet