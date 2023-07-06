import { useEffect, useState } from 'react'
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import ReactPaginate from 'react-paginate'
import axios from 'axios'
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";

const ChosenPosts = () => {

    const [pages, setPages] = useState();
    const [page, setPage] = useState(1);
    const [urlParams, setUrlParams] = useState({
        limit: 15,
        publication_type_id: 3
    });
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);

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

        await axios.get(`/api/v1/post?` + new URLSearchParams(data)).then((res) => {
            setPosts(res.data.data);
            setPages(res.data.data[0].items_full_count / urlParams.limit);
        }).catch((res) => {
            toast.error(res.response.data.error.message)
        })

        setLoading(false);
    };

    //DATA BADGES
    const [count, setCount] = useState({});

    useEffect(() => {
        const fetchBadge = async () => {
            await axios.get(`/api/v1/post/badge?publication_type_id=3`).then((res) => {
                setCount(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        }
        fetchBadge()
    }, [])

    return (
        <>
            <div className='container d-flex align-items-center my-4'>
                <Link to="/" className='text-green text-decoration-none'>Baş sahypa</Link>
                <div className='mx-2'>/</div>
                <div>Arzanladyşlar</div>
            </div>

            <div className='container mt-2 '>
                <div className='d-flex align-items-center justify-content-between'>
                    <div className='h3'>Saylananlar <span className='text-green'>(+{count.count})</span></div>
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
                                            <div className='bg-green text-white small rounded-circle p-2'>{post.discount ? Math.floor(100 - (post.discount * 100 / post.price)) : 0}%</div>
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

export default ChosenPosts