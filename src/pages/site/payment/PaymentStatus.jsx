import axios from "axios";
import { useEffect } from "react";

const PaymentStatus = () => {
    const orderId = localStorage.getItem("orderId")

    //PAYMENT CHECK
    useEffect(() => {
        const checkCoin = async () => {
            await axios.get(`/api/v1/payment/${orderId}/status`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then((res) => {
                console.log(res);
            }).catch((err) => {
                console.log(err);
            })
        }
        checkCoin()
    }, [orderId])

    return (
        <div>
            Payments
        </div>
    )
}

export default PaymentStatus