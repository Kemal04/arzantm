import { faChevronDown, faChevronUp, faEye, faHeart, faTimes } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const VideoRead = () => {

    const { videoId } = useParams();

    const [video, loading] = useFetch(`/api/v1/video/${videoId}`, "data", true);

    //VIEWED
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(`/api/v1/video/view`, { id: videoId })
        }
        fetchData()
    }, [videoId])

    //LIKED
    const [likes, setLikes] = useState()
    const [isClicked, setIsClicked] = useState(0);

    useEffect(() => {
        setLikes(Number(video?.like_count))
        if (video) {
            setIsClicked(video.is_liked)
        }
    }, [video])

    const handleLike = async () => {
        await axios.post(`/api/v1/video/like`, { id: videoId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then(() => {
            setIsClicked(isClicked + 1);
            setLikes(likes + 1);
        }).catch((err) => {
            toast.error(err.response.data.message);
        });
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
                    <>
                        <Link to='/video' className="text-white position-relative w-100 h-100"><FontAwesomeIcon icon={faTimes} className=" position-absolute top-0 start-0 p-3 h3" /></Link>
                        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", background: "#0F0F0F" }}>
                            <div className="position-relative" style={{ width: "550px", }}>

                                <video src={'https://beta2.arzan.info/' + video?.video.url} className="img-fluid shadow-lg rounded-4" style={{ height: "831px" }} autoPlay controls></video>

                                <div className='position-absolute text-white text-center end-0' style={{ zIndex: "1", bottom: "35%" }}>

                                    <div className='bg-dark rounded-circle d-flex align-items-center justify-content-center' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                                        <FontAwesomeIcon icon={faEye} className='text-white fs-17' />
                                    </div>
                                    {video?.viewed_count}

                                    <div className='bg-dark rounded-circle d-flex align-items-center justify-content-center mt-3' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                                        {
                                            isClicked === 1
                                                ?
                                                <FontAwesomeIcon icon={faHeart} className='text-danger fs-17' />
                                                :
                                                <FontAwesomeIcon icon={faHeart} className='text-white fs-17' onClick={handleLike} />
                                        }
                                    </div>
                                    {likes}

                                    {
                                        video?.cursor.next_id !== null ?

                                            <Link to={'/video/' + video?.cursor.next_id} className='bg-dark text-white rounded-circle d-flex align-items-center justify-content-center mt-5' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                                                <FontAwesomeIcon icon={faChevronUp} />
                                            </Link>
                                            :

                                            <div className='bg-dark text-secondary rounded-circle d-flex align-items-center justify-content-center mt-5' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                                                <FontAwesomeIcon icon={faChevronUp} />
                                            </div>
                                    }

                                    {
                                        video?.cursor.prev_id !== null ?
                                            <Link to={'/video/' + video?.cursor.prev_id} className='bg-dark text-white rounded-circle d-flex align-items-center justify-content-center mt-3' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </Link>
                                            :
                                            <div className='bg-dark text-secondary rounded-circle d-flex align-items-center justify-content-center mt-3' style={{ width: "45px", height: "45px", cursor: "pointer" }}>
                                                <FontAwesomeIcon icon={faChevronDown} />
                                            </div>
                                    }

                                </div>
                            </div>
                        </div>
                    </>
                )}
        </>
    )
}

export default VideoRead