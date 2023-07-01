import { useRef, useState } from 'react'
import download from '../../../assets/icons/download.svg'
import eye from '../../../assets/icons/eye.png'
import like from '../../../assets/icons/like.svg'
import like_empty from '../../../assets/icons/like-empty.svg'
import grid_little from '../../../assets/icons/grid-little.svg'
import grid_big from '../../../assets/icons/grid-big.svg'
import star from '../../../assets/icons/star.svg'
import play from '../../../assets/icons/play.svg'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faBackward, faDownload, faExpand, faForward, faPause, faPlay, faPlayCircle, faTimes, faVolumeHigh } from '@fortawesome/free-solid-svg-icons'

import './video-player.css'
import Banner from '../../../components/banners/Banner'
import useFetch from '../../../hooks/useFetch'
import { toast } from 'react-hot-toast'
import moment from 'moment/moment'

const Video = () => {

    const [videos, loading, error] = useFetch("/api/v1/video", "data");

    if (error) {
        toast.error(error.message);
    }

    const [grid, setGrid] = useState(false)

    const videoRef = useRef(null);

    const [playing, setPlaying] = useState(false);

    const [videoTime, setVideoTime] = useState(0);

    const [currentTime, setCurrentTime] = useState(0);

    const [progress, setProgress] = useState(0);

    const videoHandler = (control) => {
        if (control === "play") {
            videoRef.current.play();
            setPlaying(true);
            var vid = document.getElementById("video177");
            setVideoTime(vid.duration);
        } else if (control === "pause") {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    const fastForward = () => {
        videoRef.current.currentTime += 5;
    };

    const revert = () => {
        videoRef.current.currentTime -= 5;
    };

    window.setInterval(function () {
        setCurrentTime(videoRef.current?.currentTime);
        setProgress((videoRef.current?.currentTime / videoTime) * 100);
    }, 1000);

    const handleVideoProgress = (e) => {
        console.log((e.pageX / e.target.offsetWidth) * 100);
        videoRef.current.currentTime = 100 * e.pageX / e.target.offsetWidth
    };


    return (
        <>
            <div className='container d-flex align-items-center my-4'>
                <div className='text-green'>Baş sahypa</div>
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

                <div className='row mb-5 mt-4 gx-3'>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            videos.map((video, index) => (
                                <div key={index} className={`col-xl-4 mb-3 ${grid === true ? "col-xl-6" : null}`}>
                                    <div type="button" data-bs-toggle="modal" data-bs-target={`#staticBackdrop${video.id}`}>
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
                                    {/* MOdal  */}
                                    <div className="modal fade" id={`staticBackdrop${video.id}`} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
                                        <div className="modal-dialog modal-dialog-centered modal-xl">
                                            <div className="modal-content border-0" style={{ backgroundColor: "transparent" }}>
                                                <div className="modal-body">
                                                    <div className='position-relative'>
                                                        <video src={'http://95.85.126.113:8080/' + video.video.url} id={`video${video.id}`} className='img-fluid' ref={videoRef}></video>
                                                        {/* Video Header */}
                                                        <div className='position-absolute top-0 start-0 text-white px-3 py-2 w-100'>
                                                            <div className='d-flex justify-content-between align-items-center'>
                                                                <div className='fw-black'>
                                                                    <FontAwesomeIcon icon={faArrowLeft} />
                                                                    <span className='ms-4'>{video.title}</span>
                                                                </div>
                                                                <div className='d-flex align-items-center'>
                                                                    <img src={like_empty} alt="" style={{ width: '25px' }} /> <span className='ms-2 me-5 small'>{video.likes_count}</span>
                                                                    <FontAwesomeIcon icon={faTimes} style={{ fontSize: "25px", cursor: "pointer" }} data-bs-dismiss="modal" aria-label="Close" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        {/* Video Footer */}
                                                        <div className='position-absolute start-0 end-0 bottom-0 text-white p-3 w-100'>
                                                            <div className='video-timeline' onClick={(e) => handleVideoProgress(e)}>
                                                                <div className='progress-area'>
                                                                    <span>{Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}</span>
                                                                    <div className='progress-bar' style={{ width: `${progress}%` }}></div>
                                                                </div>
                                                            </div>
                                                            <div className='video-controls'>
                                                                <div className='options left'>
                                                                    <button className='volume'><FontAwesomeIcon icon={faVolumeHigh} /></button>
                                                                    <input type="range" />
                                                                    <div className='video-timer'>
                                                                        <div className='current-time'>{Math.floor(currentTime / 60) + ":" + ("0" + Math.floor(currentTime % 60)).slice(-2)}</div>
                                                                        <div className='separator'>/</div>
                                                                        <div className='video-duration'>{Math.floor(videoTime / 60) + ":" + ("0" + Math.floor(videoTime % 60)).slice(-2)}</div>
                                                                    </div>
                                                                </div>
                                                                <div className='options center'>
                                                                    <button onClick={revert} className='skip-backward' ><FontAwesomeIcon icon={faBackward} /></button>
                                                                    <button className='play-pause'>
                                                                        {
                                                                            playing ? (
                                                                                <FontAwesomeIcon icon={faPause} onClick={() => videoHandler("pause")} />
                                                                            ) : (
                                                                                <FontAwesomeIcon icon={faPlay} onClick={() => videoHandler("play")} />
                                                                            )
                                                                        }
                                                                    </button>
                                                                    <button onClick={fastForward} className='skip-forward'><FontAwesomeIcon icon={faForward} /></button>
                                                                </div>
                                                                <div className='options right'>
                                                                    <button className='download'><FontAwesomeIcon icon={faDownload} /></button>
                                                                    <button className='fullscreen'><FontAwesomeIcon icon={faExpand} /></button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )
                    }
                </div>
            </div >
        </>
    )
}

export default Video