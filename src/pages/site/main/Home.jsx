import Banner from '../../../components/banners/Banner'

import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight, faEye } from '@fortawesome/free-solid-svg-icons'

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
import { Stories } from '../../../components'
import { toast } from 'react-hot-toast'
import moment from 'moment/moment'
import { useEffect, useState } from 'react'
import axios from 'axios'
import ReactPaginate from 'react-paginate'

const Home = () => {

    const [pages, setPages] = useState();
    const [page, setPage] = useState(1);
    const [urlParams, setUrlParams] = useState({
        limit: 10,
    });
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [selectedPosts, setSelectedPosts] = useState([]);

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

    const fetchData = async (data) => {
        setLoading(true);

        await axios.get(`/api/v1/post?publication_type_id=1&` + new URLSearchParams(data)).then((res) => {
            setPosts(res.data.data);
            setPages(res.data.data[0].items_full_count / urlParams.limit);
        }).catch((res) => {
            toast.error(res.response.data.error.message)
        })

        await axios.get(`/api/v1/post?publication_type_id=3&limit=6`).then((res) => {
            setSelectedPosts(res.data.data);
        }).catch((res) => {
            toast.error(res.response.statusText)
        })

        setLoading(false);
    };


    return (
        <>
            <Banner page_name="HOME" />

            {/* Stories */}
            <Stories />

            {/* CARDS */}
            <div className='container mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='h3'>Saýlananlar</div>
                    <Link to="/arzanladyslar" className='bg-green text-white py-1 px-3 rounded-4 text-decoration-none'>Hemmesi <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>

                <div className='row justify-content-between mt-3'>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        selectedPosts.map((post, index) => (
                            <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-2 col-lg-2 col-md-4 col-sm-6 col-6 mb-5 text-decoration-none'>
                                <div className='position-relative card-about'>
                                    <div className='text-center'>
                                        <img src={'http://95.85.126.113/' + post.image} alt="About Us" className='img-fluid w-100' style={{ height: "300px", objectFit: "cover" }} />
                                    </div>
                                    <div className='position-absolute bottom-0 start-0 w-100 footer-rgba px-3 py-2'>
                                        <div className='h5 text-white'>
                                            {post.title}
                                        </div>
                                        <small className='' style={{ color: "#C4C4C4" }}>{moment(post.created_at).format('DD.MM.YYYY')}</small>
                                    </div>
                                </div>
                            </Link>
                        ))
                    )}
                </div>
            </div>

            {/* OTHERS */}
            <div className='container'>
                <div className='row text-center'>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4'>
                        <img src={konkurs} alt="" className='img-fluid w-100' />
                    </div>
                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 mb-4'>
                        <Link to='/top-list'>
                            <img src={top} alt="" className='img-fluid w-100' />
                        </Link>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-4'>
                        <Link to='/foto'>
                            <img src={foto} alt="" className='img-fluid w-100' />
                        </Link>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-6 col-6 mb-4'>
                        <Link to='/video'>
                            <img src={video} alt="" className='img-fluid w-100' />
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
                    <div className='h3'>Arzanladyşlar</div>
                    <Link to="/arzanladyslar" className='bg-green text-white py-1 px-3 rounded-4 text-decoration-none'>Hemmesi <FontAwesomeIcon icon={faArrowRight} /></Link>
                </div>

                <div className='row justify-content-between mt-3'>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            posts.map((post, index) =>
                                <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-auto col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                    <div className='card rounded-1 h-100' style={{ width: "230px" }}>
                                        <div className='text-center'>
                                            <img src={'http://95.85.126.113/' + post.image} alt="" style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                        </div>
                                        <div className='position-absolute p-2 end-0'>
                                            <div className='bg-green text-white small rounded-circle p-2'>{Math.floor(100 - (post.discount * 100 / post.price))}%</div>
                                        </div>
                                        <div className='card-body p-2'>
                                            <div className='card-title' style={{ fontWeight: "500" }}>{post.title}</div>
                                            <div className='d-flex justify-content-between align-items-center mt-3'>
                                                <div className='small text-secondary'>{moment(post.created_at).format('DD.MM.YYYY')}</div>
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
                    <nav className='col-xl-12 d-flex justify-content-center mt-5'>
                        {
                            <ReactPaginate
                                previousLabel="Yza"
                                nextLabel="Öňe"
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
            </div>

            {/* RESMILER */}
            <div className='container mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='h3'>Täze resmiler</div>
                    <Link to="/" className='bg-green text-white py-1 px-3 rounded-4 text-decoration-none'>Hemmesi <FontAwesomeIcon icon={faArrowRight} /></Link>
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