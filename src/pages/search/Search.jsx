import { faAngleDown, faAngleUp, faEye, faHeart, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import gallery_img from '../../assets/icons/gallery.svg'
import eye from '../../assets/icons/eye.png'
import logo from '../../assets/arzanTm.png'
import logo_img from '../../assets/cards/offical/arzan.jpeg'

const Search = () => {

    const option2 = {
        perPage: 4,
        focus: 0,
        omitEnd: true,
        perMove: 1,
        pagination: false,
        arrows: false,
    };

    const option3 = {
        perPage: 4,
        focus: 0,
        omitEnd: true,
        perMove: 1,
        pagination: false,
        arrows: false,
    };

    const { state } = useLocation()

    const [posts, setPosts] = useState(null);
    const [officals, setOfficals] = useState(null);
    const [galleries, setGalleries] = useState(null);
    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const searchPost = async () => {
            setLoading(true);
            await axios.get(`/api/v1/post?query=${state}&limit=100`)
                .then((res) => {
                    setPosts(res.data.data.posts);
                })
                .catch((err) => {
                    console.log(err);
                });
            setLoading(false);
        };
        searchPost()

        const searchOfficals = async () => {
            await axios.get(`/api/v1/user/profile?subscription_type=OFFICIAL&query=${state}`)
                .then((res) => {
                    setOfficals(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        searchOfficals()

        const searchGallery = async () => {
            await axios.get(`/api/v1/gallery?query=${state}&limit=100`)
                .then((res) => {
                    setGalleries(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        searchGallery()

        const searchVideo = async () => {
            await axios.get(`/api/v1/video?query=${state}&limit=100`)
                .then((res) => {
                    setVideos(res.data.data)
                })
                .catch((err) => {
                    console.log(err);
                });
        };
        searchVideo()
    }, [state])

    const [hiddenPosts, setHiddenPosts] = useState(true)
    const [hiddenVideos, setHiddenVideos] = useState(true)
    const [hiddenPhotos, setHiddenPhotos] = useState(true)

    const handlePostHidden = () => {
        if (hiddenPosts) {
            setHiddenPosts(false)
        } else {
            setHiddenPosts(true)
        }
    }

    const handleVideoHidden = () => {
        if (hiddenVideos) {
            setHiddenVideos(false)
        } else {
            setHiddenVideos(true)
        }
    }

    const handlePhotoHidden = () => {
        if (hiddenPhotos) {
            setHiddenPhotos(false)
        } else {
            setHiddenPhotos(true)
        }
    }

    return (
        <>
            {
                loading ? (
                    <div className=' d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100' style={{ height: "100vh", zIndex: "10", backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="spinner-border text-white">
                        </div>
                    </div>
                ) : (
                    <div className="container my-5">
                        <div className="h4">Postlar <FontAwesomeIcon icon={hiddenPosts ? faAngleDown : faAngleUp} onClick={handlePostHidden} style={{ cursor: "pointer" }} /><span className="text-green"> ({posts?.length})</span></div>
                        {
                            hiddenPosts &&
                            <Splide options={option2} hasTrack={false}>
                                <SplideTrack>
                                    {
                                        posts?.map((post, index) => (
                                            <SplideSlide key={index}>
                                                <Link to={`/arzanladys/${post.id}`} key={index} className='mb-3 text-decoration-none text-dark'>
                                                    <div className='card rounded-1 h-100' style={{ width: "280px" }}>
                                                        <div className='text-center overflow-hidden position-relative'>
                                                            <img src={'https://arzan.info/' + post.image} alt="" style={{ height: "250px", width: "100%", zIndex: 0, filter: "blur(19px)", position: "absolute" }} />
                                                            <img src={'https://arzan.info/' + post.image} alt="" style={{ width: "100%", height: "250px", objectFit: "contain", zIndex: 9, position: "relative" }} />
                                                        </div>
                                                        <div className='position-absolute p-2 end-0 text-center mt-2' style={{ zIndex: 10 }}>
                                                            <div className='bg-green text-white small rounded-circle pt-2 shadow' style={{ width: "40px", height: "40px" }}>{Math.floor(100 - (post.discount * 100 / post.price))}%</div>
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
                                            </SplideSlide>
                                        ))
                                    }
                                </SplideTrack>
                            </Splide>
                        }


                        <div className="h4 mt-4">Officals <span className="text-green"> ({officals?.length})</span></div>
                        <Splide options={option3} hasTrack={false}>
                            <SplideTrack>
                                {
                                    officals?.map((offical, index) => (
                                        <SplideSlide key={index}>
                                            <div className="card rounded-0  text-center d-flex flex-column align-items-center pt-3 me-4">
                                                <Link to={`/resmi-hasap/${offical.id}`} className="text-decoration-none text-dark">
                                                    <img src={offical.avatar_image.url === null ? logo_img : 'https://arzan.info/' + offical.avatar_image.url} className='rounded-circle' style={{ width: "125px", height: "125px", objectFit: "cover" }} />
                                                </Link>
                                                <div className="card-body">
                                                    <div className="card-title fw-black">{offical.name}</div>
                                                    <div className='text-secondary small mb-2'> Yzarlaýanlar: 0 </div>
                                                    <button className="btn btn-green py-2 btn-sm" style={{ paddingRight: "100px", paddingLeft: "100px" }}>Yzarla</button>
                                                </div>
                                            </div>
                                        </SplideSlide>
                                    ))
                                }
                            </SplideTrack>
                        </Splide>


                        <div className="h4 mt-5">Gallerylar <FontAwesomeIcon icon={hiddenPhotos ? faAngleDown : faAngleUp} onClick={handlePhotoHidden} style={{ cursor: "pointer" }} /><span className="text-green"> ({galleries?.length})</span></div>
                        <div className="row">
                            {
                                hiddenPhotos &&

                                galleries?.map((gallery, index) => (
                                    <Link to={`/foto/${gallery.id}`} key={index} className={`col-xl-3 mb-3 text-decoration-none text-dark`}>
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
                            }
                        </div>

                        <div className="h4 mt-5">Wideolar <FontAwesomeIcon icon={hiddenVideos ? faAngleDown : faAngleUp} onClick={handleVideoHidden} style={{ cursor: "pointer" }} /> <span className="text-green"> ({videos?.length})</span></div>
                        <div className="row">
                            {
                                hiddenVideos &&
                                videos?.map((video, index) => (
                                    <div key={index} className={`col-xl-4 mb-3 `}>
                                        <div className='card rounded-21 h-100'>
                                            <div className='card-body d-flex align-items-center'>
                                                <img src={video.user.avatar_image.url === null ? logo : 'https://arzan.info/' + video.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                                <div>{video.user.name}</div>
                                            </div>
                                            <Link className='' to={`/video/${video.id}`}>
                                                <img src={'https://arzan.info/' + video.thumbnail.url} alt="" className='img-fluid' style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                                <div className='card-img-overlay' style={{ top: "40%", left: "0%" }}>
                                                    <FontAwesomeIcon icon={faPlayCircle} className='h1 opacity-75 text-white' />
                                                </div>
                                            </Link>
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
                                                        <FontAwesomeIcon icon={faHeart} className="text-danger" style={{ fontSize: "15px" }} />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                )}
        </>
    )
}

export default Search