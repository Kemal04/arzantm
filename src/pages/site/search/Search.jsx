import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import axios from "axios";
import moment from "moment";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom"

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

    const [result, setResult] = useState(null);

    useEffect(() => {
        const findBook = async () => {
            await axios.get(`/api/v1/post?query=${state}&limit=100`)
                .then((res) => {
                    setResult(res.data.data)

                })
                .catch((err) => {
                    console.log(err);
                });
        };
        findBook()
    }, [state])


    return (
        <div className="container my-5">
            <div className="h4">Post'lar</div>
            <Splide options={option2} hasTrack={false}>
                <SplideTrack>
                    {
                        result?.map((post, index) => (
                            <SplideSlide key={index}>
                                <Link to={`/arzanladys/${post.id}`} key={index} className='d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                    <div className='card rounded-1 h-100 w-100 me-4'>
                                        <div className='text-center'>
                                            <img src={'http://95.85.126.113/' + post.image} alt="" style={{ width: "100%", height: "250px", objectFit: "contain" }} />
                                        </div>
                                        <div className='position-absolute p-2 end-0 text-center'>
                                            <div className='bg-green text-white small rounded-circle pt-2' style={{ width: "40px", height: "40px" }}>{Math.floor(100 - (post.discount * 100 / post.price))}%</div>
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
        </div>
    )
}

export default Search