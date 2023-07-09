import banner from '../../../assets/banners/top-list/top-list.png'
import { Link, NavLink } from 'react-router-dom'

import coin from '../../../assets/icons/coin.svg'
import useFetch from '../../../hooks/useFetch'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'

const TopList = () => {

    const [users, loading, error] = useFetch("/api/v1/user/profile?limit=50", "data");

    if (error) {
        toast.error(error.message);
    }

    const { t } = useTranslation();

    return (
        <>
            <div className='container d-flex align-items-center my-4'>
                <div className='text-green'>{t('bas_sahypa')}</div>
                <div className='mx-2'>/</div>
                <div>{t('top_hasaplar')}</div>
            </div>

            <div className='container mt-2 '>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='h3'>{t('top_hasaplar')}</div>
                    <div className='d-flex align-items-center'>
                        <div className="dropdown">
                            <NavLink to="/" className="nav-link dropdown-toggle border py-1 px-4 bg-light rounded" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort
                            </NavLink>
                            <ul className="dropdown-menu">
                                <li><Link to='/' className="dropdown-item">Bal boýunça</Link></li>
                                <li><Link to='/' className="dropdown-item">Agza bolan wagty boýunça</Link></li>
                                <li><Link to='/' className="dropdown-item">Arzanladyş sany boýunça</Link></li>
                                <li><Link to='/' className="dropdown-item">Like sany boýunça</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className='my-3'>
                    <img src={banner} alt="" className='img-fluid w-100' />
                </div>

                <div className='mt-3'>

                    <div className='d-flex justify-content-center'>
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button style={{ borderTopRightRadius: "0", borderEndEndRadius: "0", fontWeight: "500", padding: "10px 110px" }} className="text-dark nav-link active  bg-light border" id="pills-day-tab" data-bs-toggle="pill" data-bs-target="#pills-day" type="button" role="tab" aria-controls="pills-day" aria-selected="true">
                                    {t('ulanyjylar')}
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button style={{ fontWeight: "500", padding: "10px 110px" }} className="text-dark nav-link bg-light rounded-0 border" id="pills-week-tab" data-bs-toggle="pill" data-bs-target="#pills-week" type="button" role="tab" aria-controls="pills-week" aria-selected="false">
                                    {t('resmiler')}
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button style={{ fontWeight: "500", padding: "10px 110px" }} className="text-dark nav-link bg-light rounded-0 border" id="pills-year-tab" data-bs-toggle="pill" data-bs-target="#pills-year" type="button" role="tab" aria-controls="pills-year" aria-selected="false">
                                    {t('expired')}
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className='mt-3'>
                        <div className="tab-content" id="pills-tabContent">
                            <div className="tab-pane fade show active" id="pills-day" role="tabpanel" aria-labelledby="pills-day-tab" tabIndex="0">
                                <div className='row justify-content-center'>
                                    {
                                        loading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            users?.map((user, index) => (
                                                <div className='col-xl-12 mb-3 d-flex justify-content-center' key={index}>
                                                    <div className='w-45'>
                                                        <div className='border border-2 rounded border-warning py-2 px-3 d-flex justify-content-between align-items-center'>
                                                            <div className='d-flex align-items-center fs-18 fw-black'>
                                                                <div className='pe-3'>{index + 1}</div>
                                                                <img src={'http://95.85.126.113:8080/' + user.avatar_image.url} alt="" className='rounded-circle' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                                                <div className='ps-3'>{user.name}</div>
                                                            </div>
                                                            <div className='d-flex align-items-center'>
                                                                <div className='text-warning fw-black me-3'>{user.coin_balance}</div>
                                                                <img src={coin} alt="" style={{ width: "20px" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    }

                                </div>
                            </div>
                            <div className="tab-pane fade" id="pills-week" role="tabpanel" aria-labelledby="pills-week-tab" tabIndex="0">
                                2
                            </div>
                            <div className="tab-pane fade" id="pills-year" role="tabpanel" aria-labelledby="pills-year-tab" tabIndex="0">
                                3
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TopList