import axios from "axios";
import { useEffect, useState } from "react";

const PaymentStatus = () => {

    const orderId = localStorage.getItem("orderId")

    const [status, setStatus] = useState()

    //PAYMENT CHECK
    useEffect(() => {
        const checkCoin = async () => {
            await axios.get(`/api/v1/payment/${orderId}/status`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then((res) => {
                setStatus(res.data.data);
                localStorage.removeItem("orderId")
            }).catch((err) => {
                console.log(err);
                localStorage.removeItem("orderId")
            })
        }
        checkCoin()
    }, [orderId])

    return (
        <div>
            Payments {status}
        </div>
    )
}

export default PaymentStatus