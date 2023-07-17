import moment from 'moment/moment'
import useFetch from '../../../hooks/useFetch'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons'

import { Stories } from '../../../components'

import Banner from '../../../components/banners/Banner'
import konkurs from '../../../assets/cards/others/konkurs.png'
import top from '../../../assets/cards/others/top.png'
import foto from '../../../assets/cards/others/foto.png'
import video from '../../../assets/cards/others/video.png'
import offical from '../../../assets/cards/others/offical.png'
import offical_1 from '../../../assets/cards/offical/1.png'
import offical_2 from '../../../assets/cards/offical/2.png'
import offical_3 from '../../../assets/cards/offical/3.png'
import offical_4 from '../../../assets/cards/offical/4.png'
import offical_5 from '../../../assets/cards/offical/5.png'
import offical_6 from '../../../assets/cards/offical/6.png'
import offical_7 from '../../../assets/cards/offical/7.png'
import offical_8 from '../../../assets/cards/offical/8.png'
import mobile_banner from '../../../assets/banners/home/mobile-banner.png'

const Home = () => {

    const option2 = {
        type: 'loop',
        perPage: 5,
        focus: 0,
        omitEnd: true,
        perMove: 1,
        pagination: false,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 1,
        speed: 1000,
    };

    const [posts, loading] = useFetch("/api/v1/post?publication_type_id=1&limit=10", "data");

    const [selectedPosts, loading1] = useFetch("/api/v1/post?publication_type_id=3&limit=20", "data");

    //PHOTO DATA BADGES
    const [countGallery, setCountGallery] = useState({});

    useEffect(() => {
        const fetchBadge = async () => {
            await axios.get(`/api/v1/gallery/badge`).then((res) => {
                setCountGallery(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        }
        fetchBadge()
    }, [])

    //VIDEO DATA BADGES
    const [countVideo, setCountVideo] = useState({});

    useEffect(() => {
        const fetchBadge = async () => {
            await axios.get(`/api/v1/video/badge`).then((res) => {
                setCountVideo(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        }
        fetchBadge()
    }, [])

    //DATA BADGES
    const [countChosenPost, setCountChosenPost] = useState({});

    useEffect(() => {
        const fetchBadge = async () => {
            await axios.get(`/api/v1/post/badge?publication_type_id=3`).then((res) => {
                setCountChosenPost(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        }
        fetchBadge()
    }, [])

    //DATA BADGES
    const [countPost, setCountPost] = useState({});

    useEffect(() => {
        const fetchBadge = async () => {
            await axios.get(`/api/v1/post/badge`).then((res) => {
                setCountPost(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        }
        fetchBadge()
    }, [])


    const { t } = useTranslation();

    return (
        <>
            <Banner page_name="HOME" />

            {/* <Stories /> */}

            {/* CARDS */}
            <div className='container mt-5'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='fw-black' style={{ fontSize: "30px" }}>{t('saylananlar')} <span className='text-green'> (+{countChosenPost.count})</span></div>
                    <Link to="/saylananlar" className='bg-green text-white py-1 px-3 rounded-4 text-decoration-none'>{t('hemmesi')} <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>

                <div className='row justify-content-between mt-3 mb-5'>

                    <Splide options={option2} hasTrack={false}>
                        <SplideTrack className='row g-0'>
                            {
                                loading1 ? (
                                    <SplideSlide>Loading...</SplideSlide>
                                ) : (
                                    <>
                                        {
                                            selectedPosts.map((post, index) => (
                                                <SplideSlide key={index}>
                                                    <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-auto col-lg-2 col-md-4 col-sm-6 col-6 mb-5 text-decoration-none'>
                                                        <div className='position-relative card border-0' style={{ width: "240px", marginRight: "23px" }}>
                                                            <div className='text-center'>
                                                                <img src={'http://95.85.126.113/' + post.image} alt="About Us" className='img-fluid w-100' style={{ height: "300px", objectFit: "cover" }} />
                                                            </div>
                                                            <div className='position-absolute bottom-0 start-0 w-100 footer-rgba px-3 py-2'>
                                                                <div className='h5 text-white'>
                                                                    {post.title.substr(0, 10) + "..."}
                                                                </div>
                                                                <small className='' style={{ color: "#C4C4C4" }}>{moment(post.created_at).format('DD.MM.YYYY')}</small>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </SplideSlide>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </SplideTrack>
                    </Splide>
                </div>
            </div>

            {/* OTHERS */}
            <div className='container'>
                <div className='row text-center'>
                    {/* <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4'>
                        <img src={konkurs} alt="" className='img-fluid w-100' />
                    </div> */}
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4'>
                        <Link to='/top-list'>
                            <img src={top} alt="" className='img-fluid w-100' />
                        </Link>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-4'>
                        <Link to='/foto' className='card border-0'>
                            <img src={foto} alt="" className='img-fluid w-100' />
                            <div className='card-img-overlay p-0'>
                                <div className='bg-green rounded d-flex justify-content-center align-items-center text-white h5' style={{ width: "170px", height: "55px" }}>
                                    Foto ({countGallery.count})
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-4'>
                        <Link to='/video' className='card border-0'>
                            <img src={video} alt="" className='img-fluid w-100' />
                            <div className='card-img-overlay p-0'>
                                <div className='bg-green rounded d-flex justify-content-center align-items-center text-white h5' style={{ width: "170px", height: "55px" }}>
                                    Video ({countVideo.count})
                                </div>
                            </div>
                        </Link>
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4'>
                        <img src={offical} alt="" className='img-fluid w-100' />
                    </div>
                </div>
            </div>

            {/* CHEAP */}
            <div className='container mt-2'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='h3'>{t('arzanladyslar')} <span className='text-green'> (+{countPost.count})</span></div>
                    <Link to="/arzanladyslar" className='bg-green text-white py-1 px-3 rounded-4 text-decoration-none'>{t('hemmesi')} <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>

                <div className='row justify-content-between mt-3'>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            posts.map((post, index) =>
                                <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-auto col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                    <div className='card rounded-1 h-100' style={{ width: "230px" }}>
                                        <div className='text-center overflow-hidden position-relative'>
                                            <img src={'http://95.85.126.113/' + post.image} alt="" style={{ height: "250px", width: "100%", zIndex: 0, filter: "blur(19px)", position: "absolute" }} />
                                            <img src={'http://95.85.126.113/' + post.image} alt="" style={{ width: "100%", height: "250px", objectFit: "contain", zIndex: 9, position: "relative" }} />
                                        </div>
                                        <div className='position-absolute p-2 end-0 text-center mt-2' style={{ zIndex: 10 }}>
                                            <div className='bg-green text-white small rounded-circle pt-2' style={{ width: "40px", height: "40px" }}>{Math.floor(100 - (post.discount * 100 / post.price))}%</div>
                                        </div>
                                        <div className='card-body p-2 position-relative pb-5'>
                                            <div className='card-title' style={{ fontWeight: "500" }}>{post.title}</div>
                                            <div className='d-flex justify-content-between align-items-center position-absolute bottom-0 mb-2'>
                                                <div className='small text-secondary me-2'>{moment(post.created_at).format('DD.MM.YYYY')}</div>
                                                <div className='small text-secondary'>
                                                    <FontAwesomeIcon icon={faEye} className='me-2' />
                                                    {post.viewed_count}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            )
                        )
                    }
                </div>
            </div>

            {/* RESMILER */}
            <div className='container mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='h3'>{t('taze_resmiler')}</div>
                    <Link to="/" className='bg-green text-white py-1 px-3 rounded-4 text-decoration-none'>{t('hemmesi')} <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>

                <div className='row justify-content-between g-0 mt-3'>
                    <div className='col-auto mb-3'>
                        <img src={offical_1} alt="" className='img-fluid' />
                    </div>
                    <div className='col-auto mb-3'>
                        <img src={offical_2} alt="" className='img-fluid' />
                    </div>
                    <div className='col-auto mb-3'>
                        <img src={offical_3} alt="" className='img-fluid' />
                    </div>
                    <div className='col-auto mb-3'>
                        <img src={offical_4} alt="" className='img-fluid' />
                    </div>
                    <div className='col-auto mb-3'>
                        <img src={offical_5} alt="" className='img-fluid' />
                    </div>
                    <div className='col-auto mb-3'>
                        <img src={offical_6} alt="" className='img-fluid' />
                    </div>
                    <div className='col-auto mb-3'>
                        <img src={offical_7} alt="" className='img-fluid' />
                    </div>
                    <div className='col-auto mb-3'>
                        <img src={offical_8} alt="" className='img-fluid' />
                    </div>
                </div>
            </div>

            {/* MOBILE BANNER */}
            <div className='container-fluid mt-5 p-0'>
                <img src={mobile_banner} alt="" className='img-fluid w-100' />
            </div>
        </>
    )
}

export default Home