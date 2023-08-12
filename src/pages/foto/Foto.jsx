import { useState } from 'react'
import { Link } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { toast } from 'react-hot-toast'

import gallery_img from '../../assets/icons/gallery.svg'
import eye from '../../assets/icons/eye.png'
import grid_little from '../../assets/icons/grid-little.svg'
import grid_big from '../../assets/icons/grid-big.svg'
import { useEffect } from 'react'
import axios from 'axios'
import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/arzanTm.png'

const Foto = () => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: false,
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

    //DESIGN GRIDS
    const [grid, setGrid] = useState(false)

    //CATEGORIES
    const [categories, loading1] = useFetch("/api/v1/page-category?page_id=2", "data");

    //ARRAY DATA
    const [activeCat, setActiveCat] = useState("All");
    const [galleries, setGalleries] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [loading, setLoading] = useState(false);

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

        await axios.get(`/api/v1/gallery`).then((res) => {
            setFilteredData(res.data.data);
            setGalleries(res.data.data)
            setPages(res.data.data[0].items_full_count / urlParams.limit);
        }).catch((res) => {
            toast.error(res.response.data.error.message)
        })

        setLoading(false);
    };

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
        setActiveCat(catId);
        if (catId === "All") {
            setFilteredData(galleries);
            setFilteredBanner(banners);
        } else {
            const filter = galleries.filter(gallery => (gallery.page_category[0].category?.id) == catId)
            setFilteredData(filter);

            const filterBanner = banners.filter(banner => (banner.page_category[0].category?.id) == catId)
            setFilteredBanner(filterBanner);

        }
    }

    //DATA BADGES
    const [count, setCount] = useState({});

    useEffect(() => {
        const fetchBadge = async () => {
            await axios.get(`/api/v1/gallery/badge`).then((res) => {
                setCount(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        }
        fetchBadge()
    }, [])

    //FOTO COUNTER
    const [total, setTotal] = useState("")

    useEffect(() => {
        let jem = 0;
        galleries?.map((gallery) => {
            setTotal(jem += gallery.image_count)
        })
    }, [galleries])

    const { t } = useTranslation();

    return (
        <>
            <div className='container d-flex align-items-center my-4 small-sm'>
                <Link to='/' className='text-green text-decoration-none'>{t('bas_sahypa')}</Link>
                <div className='mx-2'>/</div>
                <div>{t('albomlar')}</div>
            </div>

            <div className='container mt-2 '>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='d-flex align-items-center'>
                        <div className='h3 me-4'>{t('albomlar')} <span className='text-green'>({galleries.length} / {total})</span></div>
                    </div>
                    <div className='d-flex align-items-center'>
                        <img src={grid_little} alt="" className='me-2' style={{ width: "24px", cursor: "pointer" }} onClick={() => setGrid(false)} />
                        <img src={grid_big} alt="" className='ms-2' style={{ width: "25px", cursor: "pointer" }} onClick={() => setGrid(true)} />
                    </div>
                </div>

                <div className='row mt-3 justify-content-between'>
                    <Splide options={option2} hasTrack={false}>
                        <SplideTrack className='row g-0'>
                            {
                                loading1 ? (
                                    <SplideSlide>Loading...</SplideSlide>
                                ) : (
                                    <>
                                        <SplideSlide className='col-xl-auto'>
                                            <button className={activeCat == "All" ? `btn bg-green text-white btn-sm rounded px-4 me-3` : `btn btn-outline-green btn-sm rounded px-4 me-3`} id={"All"} onClick={changeData}>Hemmesi ({galleries.length})</button>
                                        </SplideSlide>
                                        {
                                            categories.map((category, index) => (
                                                <SplideSlide className='col-xl-auto' key={index}>
                                                    <button className={activeCat == category.category.id ? `btn bg-green btn-sm rounded px-4 text-white me-3` : `btn bg-light btn-outline-green btn-sm rounded px-4 me-3`} id={category.category.id} onClick={changeData}>{category.category.name} ({category.statistics.gallery_count})</button>
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
                                            banner.page_category[0].page?.name === "PHOTO"
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

                <div className='row my-5 gx-3'>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            filteredData?.map((gallery, index) => (
                                <Link to={`/foto/${gallery.id}`} key={index} className={`col-xl-4 mb-3 text-decoration-none text-dark ${grid === true ? "col-xl-6" : null}`}>
                                    <div className='card rounded-2 h-100'>
                                        <div className='card-body d-flex align-items-center'>
                                            <img src={gallery.user.avatar_image.url === null ? logo : 'https://arzan.info/' + gallery.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                            <div>{gallery.user.name}</div>
                                        </div>
                                        <div className='text-center'>
                                            <img src={'https://arzan.info/' + gallery.avatar_image.url} alt="" className='img-fluid' style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                        </div>
                                        <div className='card-body p-2 position-relative pb-5'>
                                            <div className='card-title' style={{ fontWeight: "500" }}>{gallery.title}</div>
                                            <div className='d-flex justify-content-between align-items-center position-absolute bottom-0 mb-2'>
                                                <div className='text-secondary d-flex align-items-center me-3'>
                                                    <img src={gallery_img} alt="" className='img-fluid me-1' />
                                                    <span>{gallery.image_count}</span>
                                                </div>
                                                <div className='text-secondary d-flex align-items-center'>
                                                    <img src={eye} alt="" className='img-fluid me-1' />
                                                    <span>{gallery.view_count}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )
                    }
                </div>
            </div >
        </>
    )
}

export default Foto