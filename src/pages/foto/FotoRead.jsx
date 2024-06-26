import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useFetch from '../../hooks/useFetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import { useEffect } from 'react'
import axios from 'axios'
import like from '../../assets/icons/like-empty.svg'
import { useTranslation } from 'react-i18next'
import logo from '../../assets/arzanTm.png'

const FotoRead = () => {

    const { fotoId } = useParams()

    const [gallery, loading] = useFetch(`/api/v1/gallery/${fotoId}`, "data", true);

    //VIEWED
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(`/api/v1/gallery/view`, { id: fotoId })
        }
        fetchData()
    }, [fotoId])

    //LIKED
    const handleLike = async (id) => {
        await axios.post(`/api/v1/gallery/like`, { id: id }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => {
            toast.success(res.data.message)
            window.location.reload()
        }).catch((res) => {
            toast.error(res.response.data.message);
        });
    }

    const { t } = useTranslation();

    return (
        <>
            {
                loading ? (
                    <div className=' d-flex justify-content-center align-items-center position-absolute top-0 start-0 w-100' style={{ height: "100vh", backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="spinner-border text-white">
                        </div>
                    </div>
                ) : (
                    <>
                        <div className='container d-flex align-items-center my-4 small-sm'>
                            <Link to="/" className='text-green text-decoration-none'>{t('bas_sahypa')}</Link>
                            <div className='mx-2'>/</div>
                            <Link to="/foto" className='text-green text-decoration-none'>{t('albomlar')}</Link>
                            <div className='mx-2'>/</div>
                            <div>{gallery.title}</div>
                        </div>

                        <div className='container mt-2'>
                            <div className='h3'>{t('suratlar')} <span className='text-green'>( {gallery?.images.length} )</span></div>

                            <div className='d-flex align-items-center mb-4'>
                                <img src={gallery.user.avatar_image.url === null ? logo : 'https://arzan.info/' + gallery.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                <div>{gallery.user.name}</div>
                            </div>

                            <div className='row gx-3 justify-content-start'>
                                {
                                    gallery.images.map((image, index) => (
                                        <div className='col-xl-3 mb-3' key={index}>
                                            <div className='card border-0'>
                                                <SlideshowLightbox>
                                                    <img src={'https://arzan.info/' + image.url} alt="" className='img-fluid' />
                                                </SlideshowLightbox>
                                                <div className='position-absolute px-3 py-2 bottom-0 text-white small w-100'>
                                                    <div className='d-flex justify-content-between align-items-center'>
                                                        <div className='px-2 rounded' style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                                            <FontAwesomeIcon icon={faEye} className='me-2' />
                                                            {image.view_count}
                                                        </div>
                                                        <div className='px-2 rounded d-flex align-items-center' style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                                            {
                                                                image.is_liked
                                                                    ?
                                                                    <FontAwesomeIcon icon={faHeart} className="text-danger" style={{ fontSize: "15px" }} />
                                                                    :
                                                                    <img src={like} alt="" style={{ width: "13px", cursor: "pointer" }} onClick={() => handleLike(image.id)} />
                                                            }
                                                            {image.like_count}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </>
                )
            }

        </>
    )
}

export default FotoRead