import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import moment from 'moment/moment'
import { ControlBar, CurrentTimeDisplay, ForwardControl, PlaybackRateMenuButton, Player, ReplayControl, TimeDivider, VolumeMenuButton } from 'video-react'
import "video-react/dist/video-react.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, faChevronUp, faEye, faHeart, faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import eye from '../../../assets/icons/eye.png'
import like_empty from '../../../assets/icons/like-empty.svg'
import grid_little from '../../../assets/icons/grid-little.svg'
import grid_big from '../../../assets/icons/grid-big.svg'
import star from '../../../assets/icons/star.svg'
import play from '../../../assets/icons/play.svg'
import useFetch from '../../../hooks/useFetch'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { useTranslation } from 'react-i18next'
import logo from '../../../assets/arzanTm.png'

function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <div className='position-absolute text-white text-center' style={{ zIndex: "1", bottom: "30%", right: "-70px" }}>
                <div className='bg-dark rounded-circle d-flex align-items-center justify-content-center' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faEye} className='text-white fs-17' />
                </div>
                23
                <div className='bg-dark rounded-circle d-flex align-items-center justify-content-center mt-3' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faHeart} className='text-white fs-17' />
                </div>
                23
                <div className='bg-dark rounded-circle d-flex align-items-center justify-content-center mt-5' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faChevronUp} />
                </div>
                <div className='bg-dark rounded-circle d-flex align-items-center justify-content-center mt-3' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                    <FontAwesomeIcon icon={faChevronDown} />
                </div>
            </div>
            <Player autoPlay>
                <source src={'http://95.85.126.113:8080/' + props.src} />
                <ControlBar>
                    <ReplayControl seconds={10} order={1.1} />
                    <ForwardControl seconds={30} order={1.2} />
                    <CurrentTimeDisplay order={4.1} />
                    <TimeDivider order={4.2} />
                    <PlaybackRateMenuButton rates={[5, 2, 1, 0.5, 0.1]} order={7.1} />
                    <VolumeMenuButton disabled />
                </ControlBar>
            </Player>
        </Modal>
    );
}

const Video = () => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: true,
        autoplay: false,
        arrows: false,
    };

    const option2 = {
        perPage: 'auto',
        focus: 0,
        omitEnd: true,
        perMove: 1,
        pagination: false,
        arrows: false,
    };

    const [modalShow, setModalShow] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");

    //DESIGN GRIDS
    const [grid, setGrid] = useState(false)

    //STATES
    const [activeCat, setActiveCat] = useState("All");
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);
    const [filteredData, setFilteredData] = useState([])

    //PAGITAIONS 
    const [pages, setPages] = useState();
    const [page, setPage] = useState(1);
    const [urlParams, setUrlParams] = useState({
        limit: 12,
    });

    const changePage = ({ selected }) => {
        setPage(selected + 1);
        setUrlParams({
            ...urlParams,
            offset: selected * urlParams.limit,
        });
    };

    useEffect(() => {
        fetchData(urlParams);
    }, [urlParams]);

    //FETCH DATA
    const fetchData = async (data) => {
        setLoading(true);

        await axios.get(`/api/v1/video?` + new URLSearchParams(data)).then((res) => {
            setFilteredData(res.data.data);
            setVideos(res.data.data);
            setPages(res.data.data[0].items_full_count / urlParams.limit);
        }).catch((res) => {
            toast.error(res.response.data.error.message)
        })

        setLoading(false);
    };

    //CATEGORIES
    const [categories, loading1] = useFetch("/api/v1/page-category?page_id=3", "data");

    const [filteredBanner, setFilteredBanner] = useState([])
    const [banners, setBanners] = useState([]);

    //FETCH DATA
    const fetchBanner = async () => {
        setLoading(true);

        await axios.get(`/api/v1/banner`).then((res) => {
            setFilteredBanner(res.data.data);
            setBanners(res.data.data)
        }).catch((res) => {
            toast.error(res.response.data.error.message)
        })

        setLoading(false);
    };

    useEffect(() => {
        fetchBanner();
    }, []);

    //FILTERED DATA
    const changeData = async (e) => {
        const catId = e.target.id

        const res = await axios.get(`/api/v1/video?limit=1000`)
        const data = res.data.data

        setActiveCat(catId);
        if (catId === "All") {
            setFilteredData(videos);
            setFilteredBanner(banners);
        } else {
            const filter = data.filter(video => (video.page_category[0].category?.id) == catId)
            setFilteredData(filter)

            const filterBanner = banners.filter(banner => (banner.page_category[0].category?.id) == catId)
            setFilteredBanner(filterBanner);
        }
    }

    //DATA BADGES
    const [count, setCount] = useState({});

    useEffect(() => {
        const fetchBadge = async () => {
            await axios.get(`/api/v1/video/badge`).then((res) => {
                setCount(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        }
        fetchBadge()
    }, [])

    const { t } = useTranslation();

    //LIKED
    const handleLike = async (id) => {
        await axios.post(`/api/v1/video/like`, { id: id }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => {
            toast.success(res.data.message)
            window.location.reload()
        }).catch((res) => {
            toast.error(res.response.data.message);
        });
    }

    return (
        <>
            <div className='container d-flex align-items-center my-4 small-sm'>
                <Link to='/' className='text-green text-decoration-none'>{t('bas_sahypa')}</Link>
                <div className='mx-2'>/</div>
                <div>{t('wideo')}</div>
            </div>

            <div className='container my-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='h3'>{t('wideo')} <span className='text-green'>( +{count.count} )</span></div>
                    <div className='d-flex align-items-center'>
                        <img src={grid_little} alt="" className='me-2' style={{ width: "24px", cursor: "pointer" }} onClick={() => setGrid(false)} />
                        <img src={grid_big} alt="" className='ms-2' style={{ width: "25px", cursor: "pointer" }} onClick={() => setGrid(true)} />
                    </div>
                </div>

                <div className='row mt-2 justify-content-between'>
                    <Splide options={option2} hasTrack={false}>
                        <SplideTrack className='row g-0'>
                            {
                                loading1 ? (
                                    <SplideSlide>Loading...</SplideSlide>
                                ) : (
                                    <>
                                        <SplideSlide className='col-xl-auto'>
                                            <button className={activeCat == "All" ? `btn bg-green text-white btn-sm rounded px-4 me-3` : `btn btn-outline-green btn-sm rounded px-4 me-3`} id={"All"} onClick={changeData}>Hemmesi ({videos[0]?.items_full_count})</button>
                                        </SplideSlide>
                                        {
                                            categories.map((category, index) => (
                                                <SplideSlide className='col-xl-auto' key={index}>
                                                    <button className={activeCat == category.category.id ? `btn bg-green btn-sm rounded px-4 text-white me-3` : `btn bg-light btn-outline-green btn-sm rounded px-4 me-3`} id={category.category.id} onClick={changeData}>{category.category.name} ({category.statistics.video_count})</button>
                                                </SplideSlide>
                                            ))
                                        }
                                    </>
                                )
                            }
                        </SplideTrack>
                    </Splide>
                </div>

                <div className='my-3'>
                    <div className='my-3'>
                        <div className='container p-0 text-center mt-3'>
                            <Splide options={options} hasTrack={false}>
                                <SplideTrack className='row g-0'>
                                    {
                                        loading ? (
                                            <SplideSlide>Loading...</SplideSlide>
                                        ) : (
                                            filteredBanner?.map((banner, index) =>
                                                banner.platform[0].name === "WEB"
                                                &&
                                                banner.page_category[0].page.name === "VIDEO"
                                                &&
                                                <SplideSlide className='col-lg-12 p-0' key={index} >
                                                    <Link to={banner.url}>
                                                        <img src={'https://arzan.info/' + banner.image.url} alt="banner" className='img-fluid w-100' title={banner.title} />
                                                    </Link>
                                                </SplideSlide>
                                            )
                                        )
                                    }
                                </SplideTrack>
                            </Splide>
                        </div >
                    </div>
                </div>

                <div className='row justify-content-center'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
                        <div className='d-flex align-items-center justify-content-center border-green' style={{ borderRadius: "10px 0 0 10px" }}>
                            <img src={play} alt="" className='img-fluid' />
                            {t('meshurlar')} (65)
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-6'>
                        <div className='d-flex align-items-center justify-content-center border-green' style={{ borderRadius: "0 10px 10px 0" }}>
                            <img src={star} alt="" className='img-fluid' />
                            {t('resmiler')} (25)
                        </div>
                    </div>
                </div>

                <MyVerticallyCenteredModal src={videoSrc} show={modalShow} onHide={() => setModalShow(false)} />

                <div className='row mb-5 mt-4 gx-3'>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            filteredData?.map((video, index) => (
                                <div key={index} className={`col-xl-4 mb-3 ${grid === true ? "col-xl-6" : null}`}>
                                    <div className='card rounded-21 h-100'>
                                        <div className='card-body d-flex align-items-center'>
                                            <img src={video.user.avatar_image.url === null ? logo : 'http://95.85.126.113:8080/' + video.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                            <div>{video.user.name}</div>
                                        </div>
                                        <div style={{ cursor: "pointer" }} onClick={() => { setModalShow(true); setVideoSrc(video.video.url) }} className='position-relative d-flex justify-content-center align-items-center text-center'>
                                            <img src={'http://95.85.126.113:8080/' + video.thumbnail.url} alt="" className='img-fluid' style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                            <div className='card-img-overlay' style={{ top: "40%", left: "0%" }}>
                                                <FontAwesomeIcon icon={faPlayCircle} className='h1 opacity-75 text-white' />
                                            </div>
                                        </div>
                                        <div className='card-body p-2 position-relative pb-5'>
                                            <div className='card-title' style={{ fontWeight: "500" }}>{video.title}</div>
                                            <div className='row align-items-center justify-content-between small text-secondary position-absolute bottom-0 mb-2 w-100'>
                                                <div className='col-xl-6 d-flex align-items-center'>
                                                    <div>{moment(video.created_at).format('DD.MM.YYYY')}</div>
                                                    <div className='text-secondary d-flex align-items-center ms-3'>
                                                        <img src={eye} alt="" className='img-fluid me-1' />
                                                        <span>{video.viewed_count}</span>
                                                    </div>
                                                </div>
                                                <div className='col-xl-6 d-flex align-items-center text-end justify-content-end'>
                                                    <span className='me-2'>{video.like_count === null ? 0 : video.like_count}</span>
                                                    {
                                                        video.is_liked
                                                            ?
                                                            <FontAwesomeIcon icon={faHeart} className="text-danger" style={{ fontSize: "15px" }} />
                                                            :
                                                            <img src={like_empty} alt="" style={{ width: "18px", cursor: "pointer" }} onClick={() => handleLike(video.id)} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                    <nav className='col-xl-12 d-flex justify-content-center mt-5'>
                        {
                            <ReactPaginate
                                previousLabel={t('yza')}
                                nextLabel={t('one')}
                                pageCount={pages}
                                onPageChange={changePage}
                                containerClassName={"pagination"}
                                pageLinkClassName={"page-link text-success"}
                                previousLinkClassName={"page-link text-success"}
                                nextLinkClassName={"page-link text-success"}
                                activeLinkClassName={"page-link active bg-green border-green text-white"}
                                disabledLinkClassName={"page-link disabled"}
                            />
                        }
                    </nav>
                </div>
            </div >
        </>
    )
}

export default Video