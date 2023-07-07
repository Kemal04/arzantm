import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import useFetch from '../../../hooks/useFetch'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faHeart } from '@fortawesome/free-solid-svg-icons'
import { SlideshowLightbox } from 'lightbox.js-react'
import 'lightbox.js-react/dist/index.css'
import { useEffect } from 'react'
import axios from 'axios'
import like from '../../../assets/icons/like-empty.svg'

const FotoRead = () => {

    const { fotoId } = useParams()

    const [gallery, loading, error] = useFetch(`/api/v1/gallery/${fotoId}`, "data", true);

    if (error) {
        toast.error(error.message);
    }

    //VIEWED
    useEffect(() => {
        const fetchData = async () => {
            await axios.post(`/api/v1/gallery/view`, { id: fotoId })
        }
        fetchData()
    }, [fotoId])

    //LIKED
    const handleLike = async () => {
        await axios.post(`/api/v1/gallery/like`, { id: fotoId }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => {
            toast.success(res.data.message)
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
                            <Link to="/" className='text-green text-decoration-none'>Baş sahypa</Link>
                            <div className='mx-2'>/</div>
                            <Link to="/foto" className='text-green text-decoration-none'>Surat</Link>
                            <div className='mx-2'>/</div>
                            <div>{gallery.title}</div>
                        </div>

                        <div className='container mt-2'>
                            <div className='h3'>Suratlar <span className='text-green'>( {gallery?.images.length} )</span></div>

                            <div className='d-flex align-items-center mb-4'>
                                <img src={'http://95.85.126.113:8080/' + gallery.user.avatar_image.url} alt="" className='img-fluid me-2 rounded-circle border' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                <div>{gallery.user.name}</div>
                            </div>

                            <div className='row gx-3 justify-content-start'>
                                {
                                    loading ? (
                                        <div>Loading...</div>
                                    ) : (
                                        gallery.images.map((image, index) => (
                                            <div className='col-xl-3 mb-3' key={index}>
                                                <div className='card border-0'>
                                                    <SlideshowLightbox>
                                                        <img src={'http://95.85.126.113:8080/' + image.url} alt="" className='img-fluid' />
                                                    </SlideshowLightbox>
                                                    <div className='position-absolute px-3 py-2 bottom-0 text-white small w-100'>
                                                        <div className='d-flex justify-content-between align-items-center'>
                                                            <div className='px-2 rounded' style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                                                <FontAwesomeIcon icon={faEye} className='me-2' />
                                                                {image.view_count}
                                                            </div>
                                                            <div className='px-2 rounded d-flex align-items-center' style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
                                                                {
                                                                    gallery.is_liked === 1
                                                                        ?
                                                                        <FontAwesomeIcon icon={faHeart} className="text-danger" style={{ fontSize: "25px" }} />
                                                                        :
                                                                        <img src={like} alt="" style={{ width: "13px", cursor: "pointer" }} onClick={handleLike} />
                                                                }
                                                                {image.like_count}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
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