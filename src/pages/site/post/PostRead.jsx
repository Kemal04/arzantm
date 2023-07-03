import { Link, useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-hot-toast";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faComment, faEye, faHeart } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";
import bookmark from '../../../assets/icons/bookmark.svg'
import share from '../../../assets/icons/share.svg'
import like from '../../../assets/icons/like-empty.svg'

const PostRead = () => {

    const options = {
        type: 'loop',
        perPage: 1,
        perMove: 1,
        pagination: true,
        autoplay: false,
    };

    const { postId } = useParams()

    const [post, loading, error] = useFetch(`/api/v1/post/${postId}`, "data");

    if (error) {
        toast.error(error.message);
    }

    return (
        <>
            {

                loading ? (
                    <div>Loading...</div>
                ) : (
                    <>
                        <div className='container d-flex align-items-center my-4'>
                            <div className='text-green'>Baş sahypa</div>
                            <div className='mx-2'>/</div>
                            <div className='text-green'>Arzanladyşlar</div>
                            <div className='mx-2'>/</div>
                            <div>{post.title}</div>
                        </div>

                        <div className="container">
                            <div className="row justify-content-center">
                                <div className="col-xl-8">
                                    <div className='card border-0'>
                                        <div className='card-body d-flex align-items-center'>
                                            <img src={'http://95.85.126.113:8080/' + post.user.image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "40px", height: "40px", objectFit: "cover" }} />
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
                                                                <img src={'http://95.85.126.113/' + image.url} alt="banner" className='img-fluid' style={{ height: "430px" }} title={post.title} />
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
                                                <img src={like} alt="" style={{ width: "25px" }} />
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
                                            <div className="bg-green text-white rounded-circle p-4 h5">
                                                {post.discount ? Math.floor(100 - (post.discount * 100 / post.price)) : 0}%
                                            </div>
                                        </div>
                                        <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
                                        <div className="row mb-4">
                                            {
                                                post.tags.map((tag, index) => (
                                                    <div key={index} className="col-auto">
                                                        <div className="bg-green-opacity-50 text-green fw-black px-2 py-1 rounded">
                                                            #{tag.name}
                                                        </div>
                                                    </div>
                                                ))
                                            }
                                        </div>
                                        <div className="d-flex align-items-center mb-5">
                                            <button className='btn btn-light border me-3 w-100'>
                                                Teswirler
                                            </button>
                                            <button className='btn btn-outline-danger w-100'>
                                                Şikaýat et
                                            </button>
                                        </div>
                                    </div>
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