import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useTranslation } from "react-i18next";
import useFetch from "../../hooks/useFetch";
import phone_img from '../../assets/icons/phone-bold.svg'
import { useState } from "react";
import user_img from '../../assets/icons/user-bold.svg'
import email_img from '../../assets/icons/email.svg'
import coin from '../../assets/icons/coin.svg'

const ProfileOpenOffical = () => {

    const { t } = useTranslation();
    const { authState } = useContext(AuthContext)

    const [user, loading] = useFetch("/api/v1/user/profile/" + authState.id, "data");

    const [categories] = useFetch("/api/v1/category/list", "data", true);

    const [locations] = useFetch("/api/v1/location/list", "data");

    const [phone, setPhone] = useState("+993")

    return (
        <>
            {loading ? (
                <div>Loading...</div>
            ) : (
                <div className='container mt-5 px-5'>
                    <div className='h3 mb-4'>{t('resmi_hasap_ac')}</div>
                    <div className='d-flex justify-content-center'>
                        <div style={{ width: "63%" }}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="phone" className="small">Telefon belgisi</label>
                                    <div className='d-flex align-items-center mt-1'>
                                        <input id="phone" name='phone' value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control ps-5" type="text" placeholder={t('telefon_belgi')} style={{ background: `url(${phone_img}) no-repeat left`, backgroundPositionX: "20px" }} required />
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="name" className="small">Ulanyjy ady</label>
                                    <div className='d-flex align-items-center mt-1'>
                                        <input id="name" name='name' className="form-control ps-5" type="text" style={{ background: `url(${user_img}) no-repeat left`, backgroundPositionX: "20px" }} required />
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="email" className="small">E-mail</label>
                                    <div className='d-flex align-items-center mt-1'>
                                        <input id="email" name='email' className="form-control ps-5" type="email" style={{ background: `url(${email_img}) no-repeat left`, backgroundPositionX: "20px" }} required />
                                    </div>
                                </div>
                                <div className='col-12 mb-3'>
                                    <label htmlFor="category" className="small">Kategoriýa saýlaň</label>
                                    <select name='category_id' id='category' className="form-select mt-1" required>
                                        <option defaultValue>{t('kategoriya_sayla')}</option>
                                        {categories?.map((category, index) => (
                                            <option key={index} value={category.id} id={index}>
                                                {category.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-12 mb-3'>
                                    <label htmlFor="location" className="small">Ýeri</label>
                                    <select name='location' id='location' className="form-select mt-1" required multiple>
                                        {locations?.map((location, index) => (
                                            <option key={index} value={location.id} id={index}>
                                                {location.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className='col-12 mb-3'>
                                    <label htmlFor="price" className="small">Töleg görnüşi</label>
                                    <select name='price' id='price' className="form-select mt-1" required>
                                        <option>
                                            1 aý
                                        </option>
                                    </select>
                                </div>
                                <div className="col-12 mb-4">
                                    <small>Umumy bahasy:</small>
                                    <div className="text-warning mt-2 fw-black fs-18">
                                        1300
                                        <img src={coin} alt="" style={{ width: "18px" }} className="ms-2" />
                                    </div>
                                </div>
                                <div className='d-grid mb-5'>
                                    <button type="submit" className='btn btn-green'>Resmi hasap aç</button>
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

export default ProfileOpenOffical