import banner from '../../../assets/banners/profile/1.png'
import phone from '../../../assets/icons/phone-bold.svg'
import location from '../../../assets/icons/location.svg'
import coin from '../../../assets/icons/coin.svg'
import user_icon from '../../../assets/icons/user-icon.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faPenAlt } from '@fortawesome/free-solid-svg-icons'

import cheap_1 from '../../../assets/cards/cheap/1.png'
import cheap_2 from '../../../assets/cards/cheap/2.png'
import cheap_3 from '../../../assets/cards/cheap/3.png'
import cheap_4 from '../../../assets/cards/cheap/4.png'
import cheap_5 from '../../../assets/cards/cheap/5.png'
import { toast } from 'react-hot-toast'
import useFetch from '../../../hooks/useFetch'
import { useContext, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useTranslation } from 'react-i18next'
import axios from 'axios'

const Profile = () => {

    const { authState } = useContext(AuthContext)

    const [user, loading, error] = useFetch("/api/v1/user/profile/" + authState.id, "data");

    if (error) {
        toast.error(error.message);
    }

    const [img, setImg] = useState('')

    const [image, setImage] = useState(null)

    const onImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setImage(URL.createObjectURL(e.target.files[0]));
        }
        setImg(e.target.files[0])
    }

    //USER AVATAR
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


    const { t } = useTranslation();

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='container mt-4'>
                    <div className='text-center'>
                        <img src={'http://95.85.126.113:8080/' + user.avatar_image.url} alt="" className='img-fluid' style={{ height: "400px", width: "800px", objectFit: "cover", filter: "blur(4px)" }} />
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
                                        <div id="imagePreview" style={{ backgroundImage: `url(${'http://95.85.126.113:8080/' + user.avatar_image.url})` }}>
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
                                <b>0</b>
                                <div className='text-muted'>{t('garasylyar')}</div>
                            </div>
                            <div className='col-xl-2 border-end my-3'>
                                <b>0</b>
                                <div className='text-muted'>{t('kabul_edilmedi')}</div>
                            </div>
                            <div className='col-xl-2 my-3'>
                                <b>0</b>
                                <div className='text-muted'>{t('tassyklandy')}</div>
                            </div>
                            <div className='col-xl-12 my-3 d-flex justify-content-center'>
                                <button className='btn border-green me-2' style={{ paddingLeft: "100px", paddingRight: "100px" }}>
                                    <img src={coin} alt="" className='img-fluid me-2' />
                                    {user.coin_balance}
                                </button>
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
                                <div className='h3'>Pending</div>
                                <div className='row mt-3'>
                                    <div className='col-xl-4 mb-3'>
                                        <div className='card rounded-1'>
                                            <img src={cheap_1} alt="" className='img-fluid' />
                                            <div className='position-absolute p-2 end-0'>
                                                <div className='bg-green text-white small rounded-circle px-1 py-2'>23%</div>
                                            </div>
                                            <div className='card-body p-2'>
                                                <div className='card-title' style={{ fontWeight: "500" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</div>
                                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <div className='small text-secondary'>19.02.2022</div>
                                                    <div className='small text-secondary'>
                                                        <FontAwesomeIcon icon={faEye} className='me-2' />
                                                        121
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-4 mb-3'>
                                        <div className='card rounded-1'>
                                            <img src={cheap_2} alt="" className='img-fluid' />
                                            <div className='position-absolute p-2 end-0'>
                                                <div className='bg-green text-white small rounded-circle px-1 py-2'>23%</div>
                                            </div>
                                            <div className='card-body p-2'>
                                                <div className='card-title' style={{ fontWeight: "500" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</div>
                                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <div className='small text-secondary'>19.02.2022</div>
                                                    <div className='small text-secondary'>
                                                        <FontAwesomeIcon icon={faEye} className='me-2' />
                                                        121
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-4 mb-3'>
                                        <div className='card rounded-1'>
                                            <img src={cheap_3} alt="" className='img-fluid' />
                                            <div className='position-absolute p-2 end-0'>
                                                <div className='bg-green text-white small rounded-circle px-1 py-2'>23%</div>
                                            </div>
                                            <div className='card-body p-2'>
                                                <div className='card-title' style={{ fontWeight: "500" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</div>
                                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <div className='small text-secondary'>19.02.2022</div>
                                                    <div className='small text-secondary'>
                                                        <FontAwesomeIcon icon={faEye} className='me-2' />
                                                        121
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-4 mb-3'>
                                        <div className='card rounded-1'>
                                            <img src={cheap_4} alt="" className='img-fluid' />
                                            <div className='position-absolute p-2 end-0'>
                                                <div className='bg-green text-white small rounded-circle px-1 py-2'>23%</div>
                                            </div>
                                            <div className='card-body p-2'>
                                                <div className='card-title' style={{ fontWeight: "500" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</div>
                                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <div className='small text-secondary'>19.02.2022</div>
                                                    <div className='small text-secondary'>
                                                        <FontAwesomeIcon icon={faEye} className='me-2' />
                                                        121
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='col-xl-4 mb-3'>
                                        <div className='card rounded-1'>
                                            <img src={cheap_5} alt="" className='img-fluid' />
                                            <div className='position-absolute p-2 end-0'>
                                                <div className='bg-green text-white small rounded-circle px-1 py-2'>23%</div>
                                            </div>
                                            <div className='card-body p-2'>
                                                <div className='card-title' style={{ fontWeight: "500" }}>Lorem ipsum dolor sit amet, consectetur adipiscing elit..</div>
                                                <div className='d-flex justify-content-between align-items-center mt-3'>
                                                    <div className='small text-secondary'>19.02.2022</div>
                                                    <div className='small text-secondary'>
                                                        <FontAwesomeIcon icon={faEye} className='me-2' />
                                                        121
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
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