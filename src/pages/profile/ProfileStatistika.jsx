import { useContext } from 'react'

import location from '../../assets/icons/location.svg'
import coin from '../../assets/icons/coin.svg'

import like from '../../assets/icons/wallet/like.png'
import chat from '../../assets/icons/wallet/chat.png'
import footprint from '../../assets/icons/wallet/footprint.png'
import users from '../../assets/icons/wallet/users.png'
import user_tick from '../../assets/icons/wallet/user-tick.png'
import calendar from '../../assets/icons/wallet/calendar.png'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const ProfileStatistika = () => {

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
                <div className='container mt-5'>
                    <div className='d-flex justify-content-center'>
                        <div style={{ width: "60%" }}>
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
                                <div className='col-xl-6 d-flex justify-content-end'>
                                    <Link to='/toleg' className='btn-coin text-decoration-none'>
                                        <div className=''>{user.coin_balance}</div>
                                        <img src={coin} alt="" className='img-fluid ms-2' style={{ width: "18px" }} />
                                    </Link>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center'>
                                <ul className="nav nav-pills" id="pills-tab" role="tablist">
                                    <li className="nav-item" role="presentation">
                                        <button style={{ borderTopRightRadius: "0", borderEndEndRadius: "0", fontWeight: "500", padding: "10px 110px" }} className="text-dark nav-link active  bg-light border" id="pills-day-tab" data-bs-toggle="pill" data-bs-target="#pills-day" type="button" role="tab" aria-controls="pills-day" aria-selected="true">
                                            {t('gun')}
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button style={{ fontWeight: "500", padding: "10px 100px" }} className="text-dark nav-link bg-light rounded-0 border" id="pills-week-tab" data-bs-toggle="pill" data-bs-target="#pills-week" type="button" role="tab" aria-controls="pills-week" aria-selected="false">
                                            {t('hepde')}
                                        </button>
                                    </li>
                                    <li className="nav-item" role="presentation">
                                        <button style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", fontWeight: "500", padding: "10px 100px" }} className="text-dark nav-link bg-light border" id="pills-month-tab" data-bs-toggle="pill" data-bs-target="#pills-month" type="button" role="tab" aria-controls="pills-month" aria-selected="false">
                                            {t('ay')}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            <div className='mt-3'>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-day" role="tabpanel" aria-labelledby="pills-day-tab" tabIndex="0">
                                        <div className='table-responsive'>
                                            <table className="table table-borderless align-middle">
                                                <thead className='border-bottom small text-secondary'>
                                                    <tr>
                                                        <td>{t('ady')}</td>
                                                        <td className='text-end'>{t('mukdary')}</td>
                                                        <td className='text-end'>{t('ball')}</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr className='border-bottom'>
                                                        <td className='d-flex align-items-center'>
                                                            <img src={like} alt="" className='img-fluid me-3' />
                                                            {t('like')}
                                                        </td>
                                                        <td className='text-end pe-4'>{user.like_count}</td>
                                                        <td>
                                                            <div className='d-flex align-items-center justify-content-end' style={{ color: "#E79E12" }}>
                                                                0
                                                                <img src={coin} alt="" className='img-fluid ms-2' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='border-bottom'>
                                                        <td className='d-flex align-items-center'>
                                                            <img src={chat} alt="" className='img-fluid me-3' />
                                                            {t('teswir')}
                                                        </td>
                                                        <td className='text-end pe-4'>0</td>
                                                        <td>
                                                            <div className='d-flex align-items-center justify-content-end' style={{ color: "#E79E12" }}>
                                                                0
                                                                <img src={coin} alt="" className='img-fluid ms-2' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='border-bottom'>
                                                        <td className='d-flex align-items-center'>
                                                            <img src={footprint} alt="" className='img-fluid me-3' />
                                                            {t('myhmanlar')}
                                                        </td>
                                                        <td className='text-end pe-4'>0</td>
                                                        <td>
                                                            <div className='d-flex align-items-center justify-content-end' style={{ color: "#E79E12" }}>
                                                                0
                                                                <img src={coin} alt="" className='img-fluid ms-2' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='border-bottom'>
                                                        <td className='d-flex align-items-center'>
                                                            <img src={users} alt="" className='img-fluid me-3' />
                                                            {t('yzarlayjylar')}
                                                        </td>
                                                        <td className='text-end pe-4'>{user.follower_count}</td>
                                                        <td>
                                                            <div className='d-flex align-items-center justify-content-end' style={{ color: "#E79E12" }}>
                                                                0
                                                                <img src={coin} alt="" className='img-fluid ms-2' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='border-bottom'>
                                                        <td className='d-flex align-items-center'>
                                                            <img src={user_tick} alt="" className='img-fluid me-3' />
                                                            {t('cagyrma')}
                                                        </td>
                                                        <td className='text-end pe-4'>11</td>
                                                        <td>
                                                            <div className='d-flex align-items-center justify-content-end' style={{ color: "#E79E12" }}>
                                                                0
                                                                <img src={coin} alt="" className='img-fluid ms-2' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                    <tr className='border-bottom'>
                                                        <td className='d-flex align-items-center'>
                                                            <img src={calendar} alt="" className='img-fluid me-3' />
                                                            {t('girilen_gun')}
                                                        </td>
                                                        <td className='text-end pe-4'>{user.day_streak.day_streak}</td>
                                                        <td>
                                                            <div className='d-flex align-items-center justify-content-end' style={{ color: "#E79E12" }}>
                                                                0
                                                                <img src={coin} alt="" className='img-fluid ms-2' />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-week" role="tabpanel" aria-labelledby="pills-week-tab" tabIndex="0">
                                        2
                                    </div>
                                    <div className="tab-pane fade" id="pills-month" role="tabpanel" aria-labelledby="pills-month-tab" tabIndex="0">
                                        3
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

export default ProfileStatistika