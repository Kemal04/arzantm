import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import moment from 'moment/moment'
import { ControlBar, CurrentTimeDisplay, ForwardControl, PlaybackRateMenuButton, Player, ReplayControl, TimeDivider, VolumeMenuButton } from 'video-react'
import Banner from '../../../components/banners/Banner'
import "video-react/dist/video-react.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons'

import download from '../../../assets/icons/download.svg'
import eye from '../../../assets/icons/eye.png'
import like from '../../../assets/icons/like.svg'
import like_empty from '../../../assets/icons/like-empty.svg'
import grid_little from '../../../assets/icons/grid-little.svg'
import grid_big from '../../../assets/icons/grid-big.svg'
import star from '../../../assets/icons/star.svg'
import play from '../../../assets/icons/play.svg'

function MyVerticallyCenteredModal(props) {
    return (
        <Modal {...props} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
            <Player>
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

    const [modalShow, setModalShow] = useState(false);
    const [videoSrc, setVideoSrc] = useState("");

    const [grid, setGrid] = useState(false)

    const [pages, setPages] = useState();
    const [page, setPage] = useState(1);
    const [urlParams, setUrlParams] = useState({
        limit: 12,
    });
    const [loading, setLoading] = useState(false);
    const [videos, setVideos] = useState([]);

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

        await axios.get(`/api/v1/video?` + new URLSearchParams(data)).then((res) => {
            setVideos(res.data.data);
            setPages(res.data.data[0].items_full_count / urlParams.limit);
        }).catch((res) => {
            toast.error(res.response.data.error.message)
        })

        setLoading(false);
    };

    return (
        <>
            <div className='container d-flex align-items-center my-4'>
                <Link to='/' className='text-green text-decoration-none'>Baş sahypa</Link>
                <div className='mx-2'>/</div>
                <div>Wideo</div>
            </div>

            <div className='container my-2'>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='h3'>Wideo <span className='text-green'>(+19)</span></div>
                    <div className='d-flex align-items-center'>
                        <img src={grid_little} alt="" className='me-2' style={{ width: "24px", cursor: "pointer" }} onClick={() => setGrid(false)} />
                        <img src={grid_big} alt="" className='ms-2' style={{ width: "25px", cursor: "pointer" }} onClick={() => setGrid(true)} />
                    </div>
                </div>

                <div className='row mt-2'>
                    <div className='col-xl-auto'>
                        <button className='btn bg-light btn-outline-green btn-sm rounded px-4'>Hemmesi (256)</button>
                    </div>
                    <div className='col-xl-auto'>
                        <button className='btn btn-green btn-sm rounded px-4'>Sport (65)</button>
                    </div>
                    <div className='col-xl-auto'>
                        <button className='btn bg-light btn-outline-green btn-sm rounded px-4'>Awto (23)</button>
                    </div>
                    <div className='col-xl-auto'>
                        <button className='btn bg-light btn-outline-green btn-sm rounded px-4'>Medeniýet (39)</button>
                    </div>
                    <div className='col-xl-auto'>
                        <button className='btn bg-light btn-outline-green btn-sm rounded px-4'>Kibersport (11)</button>
                    </div>
                    <div className='col-xl-auto'>
                        <button className='btn bg-light btn-outline-green btn-sm rounded px-4'>Kibersport (11)</button>
                    </div>
                    <div className='col-xl-auto'>
                        <button className='btn bg-light btn-outline-green btn-sm rounded px-4'>Awto (23)</button>
                    </div>
                    <div className='col-xl-auto'>
                        <button className='btn bg-light btn-outline-green btn-sm rounded px-4'>Medeniýet (39)</button>
                    </div>
                </div>

                <div className='my-3'>
                    <Banner page_number="VIDEO" />
                </div>

                <div className='row justify-content-center'>
                    <div className='col-xl-6'>
                        <div className='d-flex align-items-center justify-content-center border-green' style={{ borderRadius: "10px 0 0 10px" }}>
                            <img src={play} alt="" className='img-fluid' />
                            Meşhurlar (65)
                        </div>
                    </div>
                    <div className='col-xl-6'>
                        <div className='d-flex align-items-center justify-content-center border-green' style={{ borderRadius: "0 10px 10px 0" }}>
                            <img src={star} alt="" className='img-fluid' />
                            Resmiler (25)
                        </div>
                    </div>
                </div>

                <MyVerticallyCenteredModal src={videoSrc} show={modalShow} onHide={() => setModalShow(false)} />

                <div className='row mb-5 mt-4 gx-3'>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            videos.map((video, index) => (
                                <div key={index} className={`col-xl-4 mb-3 ${grid === true ? "col-xl-6" : null}`}>
                                    <div onClick={() => { setModalShow(true); setVideoSrc(video.video.url) }}>
                                        <div className='card rounded-21'>
                                            <div className='card-body d-flex align-items-center'>
                                                <img src={'http://95.85.126.113:8080/' + video.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                                <div>{video.user.name}</div>
                                            </div>
                                            <div className='position-relative d-flex justify-content-center align-items-center text-center'>
                                                <img src={'http://95.85.126.113:8080/' + video.thumbnail.url} alt="" className='img-fluid' style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                                <div className='card-img-overlay' style={{ top: "40%", left: "0%" }}>
                                                    <FontAwesomeIcon icon={faPlayCircle} className='h1 opacity-75 text-white' />
                                                </div>
                                            </div>
                                            <div className='card-body'>
                                                <div className='card-title' style={{ fontWeight: "500" }}>{video.title}</div>
                                                <div className='d-flex align-items-center justify-content-between small text-secondary'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div>{moment(video.created_at).format('DD.MM.YYYY')}</div>
                                                        <div className='d-flex align-items-center ms-3'>
                                                            <img src={download} alt="" className='img-fluid' />
                                                            <span>{video.items_full_count}</span>
                                                        </div>
                                                        <div className='text-secondary d-flex align-items-center ms-3'>
                                                            <img src={eye} alt="" className='img-fluid me-1' />
                                                            <span>{video.viewed_count}</span>
                                                        </div>
                                                    </div>
                                                    <div className='d-flex align-items-center me-3'>
                                                        <span>{video.likes_count}</span>
                                                        <img src={like} alt="" className='img-fluid ms-1' />
                                                    </div>
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
            </div >
        </>
    )
}

export default Video