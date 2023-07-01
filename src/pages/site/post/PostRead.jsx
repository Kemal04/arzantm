import { useParams } from "react-router-dom"
import useFetch from "../../../hooks/useFetch";
import { toast } from "react-hot-toast";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

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
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <FontAwesomeIcon icon={faPoui}/>
                                            </div>
                                            <div>

                                            </div>
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