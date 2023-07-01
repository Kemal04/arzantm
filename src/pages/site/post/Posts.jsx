import { toast } from "react-hot-toast";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import moment from "moment";

const Posts = () => {

    const [posts, loading, error] = useFetch("/api/v1/post", "data");

    if (error) {
        toast.error(error.message);
    }

    return (
        <>
            <div className='container d-flex align-items-center my-4'>
                <div className='text-green'>Baş sahypa</div>
                <div className='mx-2'>/</div>
                <div>Arzanladyşlar</div>
            </div>

            <div className='container mt-2 '>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='h3'>Arzanladyşlar <span className='text-green'>(+135)</span></div>
                </div>
                <div className='row my-5 gx-3'>
                    {
                        loading ? (
                            <div>Loading...</div>
                        ) : (
                            posts.map((post, index) => (
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
                            ))
                        )
                    }
                </div>
            </div >
        </>
    )
}

export default Posts