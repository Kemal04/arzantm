import { faEye } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"

const PostMarked = () => {

    const { t } = useTranslation();

    const [mark, setMark] = useState([])

    useEffect(() => {
        const marks = JSON.parse(localStorage.getItem('favorites'))
        setMark(marks)
    }, [])

    return (
        <>
            {
                <>
                    <div className='container d-flex align-items-center my-4'>
                        <Link to="/" className='text-green text-decoration-none'>{t('bas_sahypa')}</Link>
                        <div className='mx-2'>/</div>
                        <div>{t('bellenenler')}</div>
                    </div>

                    <div className='container mt-2 '>
                        <div className='d-flex align-items-center justify-content-between'>
                            <div className='h3'>{t('bellenenler')} <span className='text-green small'>({mark.length})</span></div>
                        </div>
                        <div className='row my-5 gx-3'>
                            {
                                mark?.map((post, index) => (
                                    <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-auto col-lg-3 col-md-4 col-sm-6 col-6 d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                        <div className='card rounded-1 h-100' style={{ width: "230px" }}>
                                            <div className='text-center overflow-hidden position-relative'>
                                                <img src={'https://arzan.info/' + post.images[0].url} alt="" style={{ height: "250px", width: "100%", zIndex: 0, filter: "blur(19px)", position: "absolute" }} />
                                                <img src={'https://arzan.info/' + post.images[0].url} alt="" style={{ width: "100%", height: "250px", objectFit: "contain", zIndex: 9, position: "relative" }} />
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
                                ))
                            }
                        </div>
                    </div >
                </>
            }
        </>
    )
}

export default PostMarked