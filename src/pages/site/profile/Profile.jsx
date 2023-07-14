import phone from '../../../assets/icons/phone-bold.svg'
import location from '../../../assets/icons/location.svg'
import coin from '../../../assets/icons/coin.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenAlt } from '@fortawesome/free-solid-svg-icons'

import { toast } from 'react-hot-toast'
import useFetch from '../../../hooks/useFetch'
import { useContext, useState, useEffect } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import axios from 'axios'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Profile = () => {

    //CONTEXT
    const { authState } = useContext(AuthContext)

    //CURRENT USER FETCH
    const [user, loading] = useFetch("/api/v1/user/profile/" + authState.id, "data");
    const [postWaiting] = useFetch(`/api/v1/post?user_id=${authState.id}&status=waiting`, "data");
    const [postDeclined] = useFetch(`/api/v1/post?user_id=${authState.id}&status=declined`, "data");
    const [postApproved] = useFetch(`/api/v1/post?user_id=${authState.id}&status=approved`, "data");

    //USER AVATAR
    const [img, setImg] = useState('')

    const handleClick = async () => {

        const formData = new FormData()
        formData.append('image', img.pictureAsFile === undefined ? img : img.pictureAsFile)

        if (!img) {
            toast.error("Surat ýerleşdiriň")
        }
        else {
            await axios.post(`/api/v1/user/profile/avatar`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then((res) => {
                toast.success(res.data.message);
                window.location.reload()
            }).catch((res) => {
                console.log(res.response.data.message);
            });
        }
    }

    const [image, setImage] = useState(null)
    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
        setImg(e.target.files[0])
    }


    const { t } = useTranslation();


    const [activePosts, setActivePosts] = useState([])

    useEffect(() => {

        const fetchData = async () => {
            await axios.get(`/api/v1/post?user_id=${authState.id}&status=waiting`).then((res) => {
                setActivePosts(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
        };
        fetchData();

    }, [authState.id]);


    const changeStatus = async (name) => {

        await axios.get(`/api/v1/post?user_id=${authState.id}&status=${name}`)
            .then((res) => {
                setActivePosts(res.data.data)
            }).catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='container mt-4'>
                    <div className='text-center'>
                        <img src={image === null ? 'http://95.85.126.113:8080/' + user.avatar_image.url : image} alt="" className='img-fluid' style={{ height: "400px", width: "800px", objectFit: "cover", filter: "blur(4px)" }} />
                        <div className='row justify-content-center g-0'>
                            <div className='col-xl-12 position-relative'>
                                {/* <img src={'http://95.85.126.113:8080/' + user.avatar_image.url} alt="" className='img-fluid rounded-circle border'/>
                                <span className="position-absolute translate-middle badge rounded-circle px-1 bottom-0 bg-white" style={{ right: "43%" }}>
                                    <img src={edit} alt="" className='img-fluid' />
                                </span> */}
                                <div className="avatar-upload" style={{ marginTop: "-100px" }} >
                                    <div className="avatar-edit">
                                        <input type='file' id="imageUpload" onChange={onImageChange} />
                                        <label htmlFor="imageUpload">
                                            <FontAwesomeIcon icon={faPenAlt} />
                                        </label>
                                    </div>
                                    <div className="avatar-preview">
                                        <div id="imagePreview" style={{ backgroundImage: `url(${image === null ? 'http://95.85.126.113:8080/' + user.avatar_image.url : image})` }}>
                                        </div>
                                    </div>
                                    {img && <button className='btn btn-green mt-3' onClick={handleClick}>{t('gosmak')}</button>}
                                </div>
                            </div>
                            <div className='col-xl-12 h5 mt-1 mb-3'>
                                {user.name}
                            </div>
                            <div className='col-xl-12 mb-3 text-secondary'>
                                <img src={phone} alt='' className='img-fluid me-2' />
                                {user.phone}
                            </div>
                            <div className='col-xl-12 mb-3 text-secondary'>
                                <img src={location} alt='' className='img-fluid me-2' />
                                Ashgabat
                            </div>
                            <div className='col-xl-2 border-end my-3'>
                                <b>{postWaiting?.length}</b>
                                <div style={{ cursor: "pointer" }} onClick={() => changeStatus("waiting")} className='text-muted'>{t('garasylyar')}</div>
                            </div>
                            <div className='col-xl-2 border-end my-3'>
                                <b>{postDeclined?.length}</b>
                                <div style={{ cursor: "pointer" }} onClick={() => changeStatus("declined")} className='text-muted'>{t('kabul_edilmedi')}</div>
                            </div>
                            <div className='col-xl-2 my-3'>
                                <b>{postApproved?.length}</b>
                                <div style={{ cursor: "pointer" }} onClick={() => changeStatus("approved")} className='text-muted'>{t('tassyklandy')}</div>
                            </div>
                            <div className='col-xl-12 my-3 d-flex justify-content-center'>
                                <Link to='/toleg' className='btn border-green me-2' style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                                    <img src={coin} alt="" className='img-fluid me-2' />
                                    {user.coin_balance}
                                </Link>
                                <button className='btn btn-green ms-2' style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                                    {t('resmi_hasap_ac')}
                                </button>
                            </div>
                        </div>
                    </div>


                    {/* CHEAP */}
                    <div className='container mt-2'>
                        <div className='d-flex justify-content-center'>
                            <div className='w-75'>
                                <div className='h3'>Posts</div>
                                <div className='row mt-3'>
                                    {
                                        loading ? (
                                            <div>Loading...</div>
                                        ) : (
                                            activePosts?.map((post, index) =>
                                                <Link to={`/arzanladys/${post.id}`} key={index} className='col-xl-4 col-lg-3 col-md-4 col-sm-6 col-12 d-flex justify-content-center mb-3 text-decoration-none text-dark'>
                                                    <div className='card rounded-1 h-100 w-100'>
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
                                            )
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
            }
        </>
    )
}

export default Profile