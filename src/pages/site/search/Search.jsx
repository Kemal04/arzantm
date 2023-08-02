import { faAngleDown, faAngleUp, faEye, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"
import gallery_img from '../../../assets/icons/gallery.svg'
import eye from '../../../assets/icons/eye.png'
import { ControlBar, CurrentTimeDisplay, ForwardControl, PlaybackRateMenuButton, Player, ReplayControl, TimeDivider, VolumeMenuButton } from 'video-react'
import "video-react/dist/video-react.css";
import { Modal } from "react-bootstrap";
import like from '../../../assets/icons/like.svg'

function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
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

const Search = () => {

    const option2 = {
        perPage: 4,
        focus: 0,
        omitEnd: true,
        perMove: 1,
        pagination: false,
        arrows: false,
    };

    const { state } = useLocation()

    const [posts, setPosts] = useState(null);
    const [galleries, setGalleries] = useState(null);
    const [videos, setVideos] = useState(null);

    const [modalShow, setModalShow] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");

    useEffect(() => {
        const searchPost = async () => {
            await axios.get(`/api/v1/post?query=${state}&limit=100`)
                .then((res) => {
                    setPosts(res.data.data)

                })
                .catch((err) => {
                    console.log(err);
                });
        };
        searchPost()

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
        <div className="container my-5">
            <div className="h4">Postlar <FontAwesomeIcon icon={hiddenPosts ? faAngleDown : faAngleUp} onClick={handlePostHidden} style={{ cursor: "pointer" }} /><span className="text-green"> ({posts?.length})</span></div>
            {
                hiddenPosts &&
                <Splide options={option2} hasTrack={false}>
                    <SplideTrack>
                        {
                            posts?.map((post, index) => (
                                <SplideSlide key={index}>
                                    <Link to={`/arzanladys/${post.id}`} key={index} className='d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                        <div className='card rounded-1 h-100 w-100 me-4'>
                                            <div className='text-center'>
                                                <img src={'https://arzan.info/' + post.image} alt="" style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                            </div>
                                            {/* <div className='position-absolute p-2 end-0 text-center'>
                                            <div className='bg-green text-white small rounded-circle pt-2' style={{ width: "40px", height: "40px" }}>{Math.floor(100 - (post.discount * 100 / post.price))}%</div>
                                        </div> */}
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

            <div className="h4 mt-5">Gallerylar <FontAwesomeIcon icon={hiddenPhotos ? faAngleDown : faAngleUp} onClick={handlePhotoHidden} style={{ cursor: "pointer" }} /><span className="text-green"> ({galleries?.length})</span></div>
            <div className="row">
                {
                    hiddenPhotos &&

                    galleries?.map((gallery, index) => (
                        <Link to={`/foto/${gallery.id}`} key={index} className={`col-xl-3 mb-3 text-decoration-none text-dark`}>
                            <div className='card rounded-2 h-100'>
                                <div className='card-body d-flex align-items-center'>
                                    <img src={'https://arzan.info/' + gallery.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
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

            <MyVerticallyCenteredModal src={videoSrc} show={modalShow} onHide={() => setModalShow(false)} />

            <div className="h4 mt-5">Wideolar <FontAwesomeIcon icon={hiddenVideos ? faAngleDown : faAngleUp} onClick={handleVideoHidden} style={{ cursor: "pointer" }} /> <span className="text-green"> ({videos?.length})</span></div>
            <div className="row">
                {
                    hiddenVideos &&
                    videos?.map((video, index) => (
                        <div key={index} className={`col-xl-3 mb-3`}>
                            <div className='card rounded-21 h-100'>
                                <div className='card-body d-flex align-items-center'>
                                    <img src={'https://arzan.info/' + video.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                    <div>{video.user.name}</div>
                                </div>
                                <div style={{ cursor: "pointer" }} onClick={() => { setModalShow(true); setVideoSrc(video.video.url) }} className='position-relative d-flex justify-content-center align-items-center text-center'>
                                    <img src={'https://arzan.info/' + video.thumbnail.url} alt="" className='img-fluid' style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                    <div className='card-img-overlay' style={{ top: "40%", left: "0%" }}>
                                        <FontAwesomeIcon icon={faPlayCircle} className='h1 opacity-75 text-white' />
                                    </div>
                                </div>
                                <div className='card-body p-2 position-relative pb-5'>
                                    <div className='card-title' style={{ fontWeight: "500" }}>{video.title}</div>
                                    <div className='d-flex align-items-center justify-content-between small text-secondary position-absolute bottom-0 mb-2'>
                                        <div className='d-flex justify-content-between align-items-center'>
                                            <div>{moment(video.created_at).format('DD.MM.YYYY')}</div>
                                            <div className='text-secondary d-flex align-items-center ms-3'>
                                                <img src={eye} alt="" className='img-fluid me-1' />
                                                <span>{video.viewed_count}</span>
                                            </div>
                                        </div>
                                        <div className='d-flex align-items-center' style={{ marginLeft: "100px" }}>
                                            <span>{video.like_count === null ? 0 : video.like_count}</span>
                                            <img src={like} alt="" className='img-fluid ms-1' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Search