import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import { Link, useLocation } from "react-router-dom"

const Tags = () => {

    const { state } = useLocation()
    const { t } = useTranslation();

    const [pages, setPages] = useState();
    const [page, setPage] = useState(1);
    const [urlParams, setUrlParams] = useState({
        limit: 15,
    });
    const [loading, setLoading] = useState(false);

    const [tags, setTags] = useState(null);

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

        await axios.get(`/api/v1/post?tag=${state === null ? "arzantm" : state}&` + new URLSearchParams(data))
            .then((res) => {
                setTags(res.data.data)
                setPages(res.data.data[0].items_full_count / urlParams.limit);
            })
            .catch((err) => {
                console.log(err);
            });

        setLoading(false);
    };

    return (
        <>
            {
                loading ? (
                    <div className=' d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100' style={{ height: "100vh", zIndex: "10", backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="spinner-border text-white">
                        </div>
                    </div>
                ) : (
                    <div className='container mt-2 '>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='h3'>Tags <span className='text-green small'>({urlParams.limit * pages})</span></div>
                        </div>
                        <div className='row my-5 gx-3'>
                            {
                                tags?.map((post, index) => (
                                    <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-auto col-lg-3 col-md-4 col-sm-6 col-6 d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                        <div className='card rounded-1 h-100' style={{ width: "230px" }}>
                                            <div className='text-center overflow-hidden position-relative'>
                                                <img src={'https://arzan.info/' + post.image} alt="" style={{ height: "250px", width: "100%", zIndex: 0, filter: "blur(19px)", position: "absolute" }} />
                                                <img src={'https://arzan.info/' + post.image} alt="" style={{ width: "100%", height: "250px", objectFit: "contain", zIndex: 9, position: "relative" }} />
                                            </div>
                                            <div className='position-absolute p-2 end-0 text-center mt-2' style={{ zIndex: 10 }}>
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
                                ))
                            }
                        </div>
                    </div>
                )}
            <nav className='d-flex justify-content-center mt-5'>
                {
                    <ReactPaginate
                        previousLabel={t('yza')}
                        nextLabel={t('one')}
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
        </>
    )
}

export default Tags