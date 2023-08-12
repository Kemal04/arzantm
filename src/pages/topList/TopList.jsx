import banner from '../../assets/banners/top-list/top-list.png'
import coin from '../../assets/icons/coin.svg'
import useFetch from '../../hooks/useFetch'
import { toast } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import logo_img from '../../assets/arzanTm.png'
import axios from 'axios'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const TopList = () => {

    const { t } = useTranslation();

    const [userOfficals] = useFetch("/api/v1/user/profile?limit=50&subscription_type_id=2", "data");

    const [users, setUsers] = useState([]);
    const [urlParams, setUrlParams] = useState({
        limit: 50,
        subscription_type_id: 1
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchData(urlParams);
    }, [urlParams]);

    const fetchData = async (data) => {
        setLoading(true);

        await axios.get(`/api/v1/user/profile?` + new URLSearchParams(data)).then((res) => {
            setUsers(res.data.data);
        }).catch((res) => {
            toast.error(res.response.data.error.message)
        })

        setLoading(false);
    };

    const sortUser = async (value) => {

        await axios.get(`/api/v1/user/profile?limit=50&sort=${value}`)
            .then((res) => {
                setUsers(res.data.data);
            }).catch((err) => {
                console.log(err);
            })

    }

    return (
        <>
            <div className='container d-flex align-items-center my-4 small-sm'>
                <Link to='/' className='text-green text-decoration-none'>{t('bas_sahypa')}</Link>
                <div className='mx-2'>/</div>
                <div>{t('top_hasaplar')}</div>
            </div>

            <div className='container mt-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='h3'>{t('top_hasaplar')}</div>
                    <div className='d-flex align-items-center'>
                        <select className="form-select" onChange={(e) => sortUser(e.target.value)}>
                            <option defaultValue>Sort</option>
                            <option value="coin">Bal</option>
                            <option value="created">Agza bolan wagty</option>
                            <option value="post">Arzanladyş sany</option>
                            <option value="like">Like sany</option>
                        </select>
                    </div>
                </div>

                <div className='my-3'>
                    <img src={banner} alt="" className='img-fluid w-100' />
                </div>

                <div className='mt-3'>

                    <div className='d-flex justify-content-center'>
                        <ul className="nav nav-pills" id="pills-tab" role="tablist">
                            <li className="nav-item" role="presentation">
                                <button style={{ borderTopRightRadius: "0", borderEndEndRadius: "0", fontWeight: "500" }} className="pt-sm-100 text-dark nav-link active  bg-light border" id="pills-day-tab" data-bs-toggle="pill" data-bs-target="#pills-day" type="button" role="tab" aria-controls="pills-day" aria-selected="true">
                                    {t('ulanyjylar')}
                                </button>
                            </li>
                            <li className="nav-item" role="presentation">
                                <button style={{ fontWeight: "500" }} className="pt-sm-100 text-dark nav-link bg-light rounded-0 border" id="pills-week-tab" data-bs-toggle="pill" data-bs-target="#pills-week" type="button" role="tab" aria-controls="pills-week" aria-selected="false">
                                    {t('resmiler')}
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
                                                <div className='col-xl-8 col-12 mb-3 d-flex justify-content-center' key={index}>
                                                    <div className='w-100'>
                                                        <div className={`border rounded py-2 px-3 d-flex justify-content-between align-items-center ${index < 3 ? "border-warning" : null}`}>
                                                            <div className='d-flex align-items-center fs-18 fw-black'>
                                                                <div className='pe-3'>{index + 1}</div>
                                                                <img src={user.avatar_image.url === null ? logo_img : 'https://arzan.info/' + user.avatar_image.url} alt="" className='rounded-circle' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                                                <div className='ps-3'>{user.name}</div>
                                                            </div>
                                                            <div className='d-flex align-items-center'>
                                                                <div className='text-warning fw-black me-3'>{user.coin_balance || user.like_count || user.post_count}</div>
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
                                <div className='row justify-content-center'>
                                    {
                                        loading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            userOfficals?.map((user, index) => (
                                                <div className='col-xl-8 col-12 mb-3 d-flex justify-content-center' key={index}>
                                                    <div className='w-100'>
                                                        <div className={`border rounded py-2 px-3 d-flex justify-content-between align-items-center ${index < 3 ? "border-warning" : null}`}>
                                                            <div className='d-flex align-items-center fs-18 fw-black'>
                                                                <div className='pe-3'>{index + 1}</div>
                                                                <img src={user.avatar_image.url === null ? logo_img : 'https://arzan.info/' + user.avatar_image.url} alt="" className='rounded-circle' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
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