import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import phone_img from '../../assets/icons/phone-bold.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import not_see from '../../assets/icons/not-see.svg'
import key from '../../assets/icons/key.svg'
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {

    //PASSWORD SHOW
    const [isVisible2, setVisible2] = useState(false);
    const [isVisible3, setVisible3] = useState(false);

    const toggle2 = () => {
        setVisible2(!isVisible2);
    };

    const toggle3 = () => {
        setVisible3(!isVisible3);
    };

    const navigate = useNavigate()

    const [phone, setPhone] = useState("")

    const [exist, setExist] = useState(true)

    const [checkSms, setCheckSms] = useState(false)

    const [changePassword, setChangePassword] = useState(false)

    //EXIST PHONE
    const existPhone = async (e) => {
        e.preventDefault();

        await axios.post('/api/v1/account/exists', { phone: phone })
            .then((res) => {
                toast.success(res.data.message)
                setExist(false)
                setCheckSms(true)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
    }


    //CHECK VERTIFICATION
    const checkSmsClick = async (e) => {
        e.preventDefault();

        await axios.post('/api/v1/account/recover/verify/check', { phone: phone })
            .then((res) => {
                toast.success(res.data.message)
                setCheckSms(false)
                setChangePassword(true)
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
    }


    const [pass, setPassword] = useState("")
    const [cPassword, setCPassword] = useState("")

    ///RESET PASSWORD
    const resetPassword = async (e) => {
        e.preventDefault();

        if (!pass) {
            toast.error("Açar sözüňizi ýazyň!")
        }
        else if (!cPassword) {
            toast.error("Açar sözüňizi gaýtadan ýazyň!")
        }
        else if (cPassword !== pass) {
            toast.error("Açar sözüňiz gabat gelenok !")
        }
        else {
            await axios.post('/api/v1/account/reset-password', { phone: phone, password: pass }).then((res) => {
                toast.success(res.data.message)
                navigate('/')
            }).catch((err) => {
                toast.error(err.response.data.message)
            })
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center" style={{ height: "62.8vh" }}>
            <div className={exist ? "d-block" : "d-none"}>
                <div className="shadow p-5 d-flex justify-content-center flex-column align-items-center">
                    <label htmlFor="phone_num" className="mb-3 fw-black">Parolyňyzy ýatdan çykardyňyzmy? Biz kömek edip bileris.</label>
                    <input required value={phone} onChange={(e) => setPhone(e.target.value)} name='phone' className="form-control ps-5 mb-3" type="text" placeholder="Telefon belgisi" style={{ background: `url(${phone_img}) no-repeat left`, backgroundPositionX: "20px", width: "400px" }} />
                    <button className='btn btn-green' onClick={existPhone} style={{ width: "400px" }}>Indiki</button>
                </div>
            </div>

            <div className={checkSms ? "d-block" : "d-none"}>
                <div className="shadow p-5 d-flex justify-content-center flex-column align-items-center">
                    <div className="h4 mb-2"><span className="text-green">+993 63 22-54-44</span> şu berlen telefon belga <span className="text-green">"RecoverArzanTm"</span> sms ugradyň</div>

                    <a href="sms:+99363225444?&body=RecoverArzanTm" className='btn btn-outline-dark btn-sm mb-4'>Awtomat SMS ugrat</a>

                    <button className='btn btn-green' onClick={checkSmsClick}>SMS ugratdym</button>
                </div>
            </div>

            <div className={changePassword ? "d-block" : "d-none"}>
                <div className="shadow p-5 d-flex justify-content-center flex-column align-items-center">
                    <label htmlFor="passsss" className="mb-3 fw-black">Täze parolyňyzy giriziň</label>
                    <div className="input-group mb-4">
                        <input type={!isVisible2 ? "password" : "text"} value={pass} onChange={(e) => setPassword(e.target.value)} name='password' className="form-control ps-5 border-end-0 flex-grow-0 rounded" placeholder="Açar sözi" style={{ background: `url(${key}) no-repeat left`, backgroundPositionX: "20px", width: "360px" }} />
                        <span className="input-group-text bg-white border-start-0" id="basic-addon1" style={{ cursor: "pointer" }} onClick={toggle2}>
                            {isVisible2 ? <FontAwesomeIcon icon={faEye} className='text-muted' /> : <img src={not_see} alt="" className='img-fluid' />}
                        </span>
                    </div>
                    <div className="input-group mb-4">
                        <input type={!isVisible3 ? "password" : "text"} value={cPassword} onChange={(e) => setCPassword(e.target.value)} name='confirm_pass' className="form-control ps-5 border-end-0 flex-grow-0 rounded" placeholder="Açar sözi (tassykla)" style={{ background: `url(${key}) no-repeat left`, backgroundPositionX: "20px", width: "360px" }} />
                        <span className="input-group-text bg-white border-start-0" id="basic-addon1" style={{ cursor: "pointer" }} onClick={toggle3}>
                            {isVisible3 ? <FontAwesomeIcon icon={faEye} className='text-muted' /> : <img src={not_see} alt="" className='img-fluid' />}
                        </span>
                    </div>
                    <button className='btn btn-green w-100' onClick={resetPassword}>Ugrat</button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword