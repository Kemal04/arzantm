import { Link, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import phone from '../../assets/icons/phone-bold.svg'
import location from '../../assets/icons/location.svg'
import arzanTmLogo from '../../assets/cards/offical/arzan.jpeg'
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const OfficalRead = () => {

    const { officalId } = useParams()

    console.log(officalId);

    //CURRENT USER FETCH
    const [user, loading] = useFetch("/api/v1/user/profile/" + officalId, "data");

    const [activePosts, setActivePosts] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            await axios.get(`/api/v1/post?user_id=${officalId}&status=approved`).then((res) => {
                setActivePosts(res.data.data.posts);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        };
        fetchData();

    }, [officalId]);

    return (
        <>
            {
                loading ? (
                    <div className=' d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100' style={{ height: "100vh", zIndex: "10", backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="spinner-border text-white">
                        </div>
                    </div>
                ) : (
                    <div className='container mt-4'>
                        <div className='d-flex justify-content-center'>
                            <div style={{ width: "60%" }}>
                                <div className='text-center'>
                                    <img src={user.avatar_image.url === null ? arzanTmLogo : 'https://arzan.info/' + user.avatar_image.url} alt="" className='img-fluid' style={{ height: "500px", width: "1000px", objectFit: "cover", filter: "blur(4px)" }} />
                                    <div className='row justify-content-center g-0'>
                                        <div className='col-xl-12 position-relative'>
                                            <div className="avatar-upload" style={{ marginTop: "-100px" }} >
                                                <div className="avatar-preview">
                                                    <div id="imagePreview" style={{ backgroundImage: `url(${user.avatar_image.url === null ? arzanTmLogo : 'https://arzan.info/' + user.avatar_image.url})` }}>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-xl-12 h5 mt-1 mb-3'>
                                            {user.name}
                                        </div>
                                        <div className='col-xl-12 mb-3 text-secondary'>
                                            <img src={phone} alt='' className='img-fluid me-2' />
                                            {user.phone}
                                        </div>
                                        <div className='col-xl-12 mb-3 text-secondary'>
                                            <img src={location} alt='' className='img-fluid me-2' />
                                            Ashgabat
                                        </div>
                                        <div className='col-xl-12 mb-3 text-secondary d-flex justify-content-center'>
                                            {user.about}
                                        </div>
                                    </div>
                                </div>


                                {/* CHEAP */}
                                <div className='container mt-2'>
                                    <div className='h3'>Posts</div>
                                    <div className='row mt-3'>
                                        {
                                            activePosts?.map((post, index) =>
                                                <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-auto col-lg-3 col-md-4 col-sm-6 col-6 d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                                    <div className='card rounded-1 h-100' style={{ width: "230px" }}>
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
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default OfficalRead