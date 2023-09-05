import axios from "axios";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom"


const Payment = () => {

    const [coins, setCoins] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        const fetchData = async () => {
            setLoading(true);
            await axios.get(`/api/v1/payment`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            }).then((res) => {
                setCoins(res.data.data);
            }).catch((res) => {
                toast.error(res.response.data.error.message)
            })
            setLoading(false);
        };
        fetchData();

    }, []);

    //PAYMENT SEND DATA
    const sendCoin = async (id) => {
        await axios.get(`/api/v1/payment/form/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        }).then((res) => {
            localStorage.setItem("orderId", res.data.data.orderId)
            window.open(res.data.data.formUrl)
        }).catch((err) => {
            console.log(err);
        })
    }

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
                        <div className='container d-flex align-items-center my-4'>
                            <h2>Ball satyn almak</h2>
                        </div>

                        <div className='container mt-2 '>
                            <div className="row justify-content-center">
                                <div className="col-xl-8">
                                    <Link to='/' className="btn btn-green w-100">Täze kart goşmak</Link>
                                </div>
                                {
                                    coins.map((coin, index) => (
                                        <div key={index} className="col-xl-8 mt-3 border-bottom pb-3 mb-3">
                                            <div className="d-flex justify-content-between align-items-center">
                                                <div className="d-flex align-items-center">
                                                    <div className="d-flex justify-content-center align-items-center" style={{ background: "linear-gradient(270deg, rgba(249, 217, 54, 0) 17.19%, rgba(255, 237, 78, 0.55) 100%)", width: "90px", height: "60px" }}>
                                                        <img src={'https://arzan.info/' + coin.image} alt="" className="img-fluid" style={{ width: "30px" }} />
                                                    </div>
                                                    <div className="h5 mt-1 ms-2">{coin.amount} ball</div>
                                                </div>
                                                <button onClick={() => sendCoin(coin.id)} className="btn btn-green rounded-2 px-3">{coin.price} TMT</button>
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

export default Payment