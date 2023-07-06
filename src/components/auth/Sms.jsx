import axios from "axios";
import { toast } from "react-hot-toast";

const Sms = () => {

    const phone = localStorage.getItem("phone")

    //CHECK VERTIFICATION
    const checkSmsClick = async (e) => {
        e.preventDefault();

        await axios.post('/api/v1/account/verify/check', { phone: phone }).then(() => {
            toast.success("Ustunlikli tassyklanyldy, Login edip bilersiniz")
        }).catch(() => {
            toast.error("Sms bize ugradylmady")
        })
    }

    return (
        <div className="d-flex align-items-center justify-content-center text-center" style={{ height: "62.8vh" }}>
            <div>
                <div className="h4 mb-3"><span className="text-green">+993 63 22-54-44</span> şu berlen telefon belga <span className="text-green">"ArzanTm2023"</span> sms ugradyň</div>
                <button className='btn btn-green' onClick={checkSmsClick}>SMS ugratdym</button>
            </div>
        </div>
    )
}

export default Sms