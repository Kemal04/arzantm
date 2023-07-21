import { Link, useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-hot-toast";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faComment, faEye, faHeart, faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import bookmark from '../../../assets/icons/bookmark.svg'
import share from '../../../assets/icons/share.svg'
import like_img from '../../../assets/icons/like-empty.svg'
import axios from "axios";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useState } from "react";

const PostRead = () => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: true,
        autoplay: false,
    };

    const { t } = useTranslation();
    const { postId } = useParams();

    const [post, loading] = useFetch(`/api/v1/post/${postId}`, "data", true);

    //VIEWED
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(`/api/v1/post/view`, { id: postId })
        }
        fetchData()
    }, [postId])

    //LIKED
    const [like, setLike] = useState(0);

    useEffect(() => {
        if (post) {
            setLike(post.is_liked)
        }
    }, [post])

    const handleLike = async () => {
        await axios.post(`/api/v1/post/like`, { id: postId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then(() => {
            setLike(like + 1);
        }).catch((res) => {
            toast.error(res.response.data.message);
        });
    }

    return (
        <>
            {

                loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className='container d-flex align-items-center my-4'>
                            <Link to="/" className='text-green text-decoration-none'>{t('bas_sahypa')}</Link>
                            <div className='mx-2'>/</div>
                            <Link to="/arzanladyslar" className='text-green text-decoration-none'>{t('arzanladyslar')}</Link>
                            <div className='mx-2'>/</div>
                            <div>{post.title}</div>
                        </div>

                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-2 text-center" style={{ marginTop: "50%" }}>
                                    {
                                        post.next_id !== null &&
                                        <Link to={'/arzanladys/' + post.next_id} className={`bg-green text-white rounded-circle d-inline fs-18`} style={{ padding: "5px 9px" }}>
                                            <FontAwesomeIcon icon={faArrowLeft} />
                                        </Link>
                                    }
                                </div>
                                <div className="col-xl-8">
                                    <div className='card border-0'>
                                        <div className='card-body d-flex align-items-center'>
                                            <img src={'http://95.85.126.113:8080/' + post.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
                                            <div>{post.user.name}</div>
                                        </div>
                                        <Splide options={options} hasTrack={false}>
                                            <SplideTrack className='text-center'>
                                                {
                                                    loading ? (
                                                        <SplideSlide>Loading...</SplideSlide>
                                                    ) : (
                                                        post.images.map((image, index) =>
                                                            <SplideSlide key={index} >
                                                                <img src={image === null ? "" : 'http://95.85.126.113/' + image.url} alt="banner" className='img-fluid' style={{ height: "430px" }} title={post.title} />
                                                            </SplideSlide>
                                                        )
                                                    )
                                                }
                                            </SplideTrack>
                                        </Splide>
                                        <div className="d-flex justify-content-between mt-4">
                                            <div>
                                                <img src={bookmark} alt="" className="me-3" style={{ width: "25px" }} />
                                                <img src={share} alt="" style={{ width: "25px" }} />
                                            </div>
                                            <div>
                                                {
                                                    like === 1
                                                        ?
                                                        <FontAwesomeIcon icon={faHeart} className="text-danger" style={{ fontSize: "25px" }} />
                                                        :
                                                        <img src={like_img} alt="" style={{ width: "25px", cursor: "pointer" }} onClick={handleLike} />
                                                }
                                            </div>
                                        </div>
                                        <div className="small mt-4 d-flex align-items-center text-muted">
                                            <span>{moment(post.created_at).format('DD.MM.YYYY')}</span>
                                            <div className='ms-3'>
                                                <FontAwesomeIcon icon={faEye} className='me-2' />
                                                {post.viewed_count}
                                            </div>
                                            <div className='ms-3'>
                                                <FontAwesomeIcon icon={faHeart} className='me-2' />
                                                {post.like_count}
                                            </div>
                                            <div className='ms-3'>
                                                <FontAwesomeIcon icon={faComment} className='me-2' />
                                                0
                                            </div>
                                        </div>
                                        <div className="mt-4 h4">
                                            {post.title}
                                        </div>
                                        {
                                            !post.price
                                                ?
                                                null
                                                :
                                                <div className="d-flex justify-content-between align-items-center border-top border-bottom py-4 my-3">
                                                    <div>
                                                        <div>
                                                            <span className="text-green h2">{post.discount}</span><span className="fs-17 fw-black"> manat</span>
                                                            <span className="fs-17 ms-4 text-muted text-decoration-line-through">{post.price}<span className="fs-17"> manat</span></span>
                                                        </div>
                                                        <div className="d-flex align-items-center mt-4 text-muted small">
                                                            <FontAwesomeIcon icon={faCalendarAlt} />
                                                            <div className="ms-2">{moment(post.start_date).format('DD.MM.YYYY')} - </div>
                                                            <div className="ms-2">{moment(post.end_date).format('DD.MM.YYYY')}</div>
                                                        </div>
                                                    </div>
                                                    <div className="bg-green text-white rounded-circle h5 d-flex justify-content-center align-items-center" style={{ width: "70px", height: "70px" }}>
                                                        {post.discount ? Math.floor(100 - (post.discount * 100 / post.price)) : 0}%
                                                    </div>
                                                </div>
                                        }
                                        <p className="mt-4" dangerouslySetInnerHTML={{ __html: post.description }}></p>
                                        <div className="row mb-4">
                                            {
                                                post.tags.map((tag, index) => (
                                                    <div key={index} className="col-auto">
                                                        <div className="bg-green-opacity-50 text-green fw-black px-2 py-1 rounded">
                                                            #{tag === null ? " " : tag.name}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="d-flex align-items-center mb-5">
                                            <button className='btn btn-light border me-3 w-100'>
                                                {t('teswirler')}
                                            </button>
                                            <button className='btn btn-outline-danger w-100'>
                                                {t('sikayet_et')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-2 text-center" style={{ marginTop: "50%" }}>
                                    {
                                        post.prev_id !== null &&
                                        <Link to={'/arzanladys/' + post.prev_id} className="bg-green text-white rounded-circle d-inline fs-18" style={{ padding: "5px 9px" }}>
                                            <FontAwesomeIcon icon={faArrowRight} />
                                        </Link>
                                    }
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}

export default PostRead