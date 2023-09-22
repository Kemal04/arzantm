import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom"
import column_icon from '../../assets/icons/grid-column.svg'
import grid_little from '../../assets/icons/grid-little.svg'
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import logo_img from '../../assets/cards/offical/arzan.jpeg'
import { Fragment } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const Offical = () => {

    const { t } = useTranslation();
    const navigate = useNavigate()

    //DESIGN GRIDS
    const [grid, setGrid] = useState(false)

    const [officals, loading] = useFetch("/api/v1/user/profile?subscription_type_id=2", "data");

    // const [isClicked, setIsClicked] = useState(0);

    // useEffect(() => {
    //     setLikes(Number(post?.like_count))
    //     if (post) {
    //         setIsClicked(post.is_liked)
    //     }
    // }, [post])

    const handleFollow = async (id) => {
        await axios.post(`/api/v1/user/profile/follow`, { id: id }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
        })
            .then((res) => {
                // setIsClicked(isClicked + 1);
                toast.success(res.data.message)
                console.log(res.data);
            }).catch((err) => {
                toast.error(err.response.data.message)
            });
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
                        <div className='container d-flex align-items-center my-4 small-sm'>
                            <Link to='/' className='text-green text-decoration-none'>{t('bas_sahypa')}</Link>
                            <div className='mx-2'>/</div>
                            <div>{t('taze_resmiler')}</div>
                        </div>

                        <div className="container">
                            <div className='d-flex align-items-center justify-content-between'>
                                <div className='d-flex align-items-center'>
                                    <div className='h3 me-4'>Resmi hasaplar <span className='text-green'>({officals?.length})</span></div>
                                </div>
                                <div className='d-flex align-items-center'>
                                    <img src={column_icon} alt="" className='me-2' style={{ width: "25px", cursor: "pointer" }} onClick={() => setGrid(false)} />
                                    <img src={grid_little} alt="" className='ms-2' style={{ width: "24px", cursor: "pointer" }} onClick={() => setGrid(true)} />
                                </div>
                            </div>
                        </div>

                        <div className="container mt-5">
                            <div className="row">
                                {
                                    officals?.map((offical, index) => (
                                        <Fragment key={index} >

                                            <div className={`col-xl-12  ${!grid ? "" : "d-none"}`}>
                                                <div className="d-flex justify-content-between align-items-center border p-3 mb-3">
                                                    <Link to={`/resmi-hasap/${offical.id}`} className="d-flex align-items-center text-decoration-none text-dark">
                                                        <img src={offical.avatar_image.url === null ? logo_img : 'https://arzan.info/' + offical.avatar_image.url} alt="" className='rounded-circle' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                                        <div className='ms-4'>
                                                            <div className='fw-black'>{offical.name}</div>
                                                            <div className='text-secondary small'>
                                                                Yzarlaýanlar: 0
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <button onClick={() => handleFollow(offical.id)} className="btn btn-green px-3 py-2 btn-sm">Yzarla</button>
                                                </div>
                                            </div>

                                            <div className={`col-xl-3 text-decoration-none text-dark mb-3 ${!grid ? "d-none" : ""}`}>
                                                <div className="card rounded-4 text-center d-flex flex-column align-items-center pt-3">
                                                    <Link to={`/resmi-hasap/${offical.id}`} className="text-decoration-none text-dark">
                                                        <img src={offical.avatar_image.url === null ? logo_img : 'https://arzan.info/' + offical.avatar_image.url} className='rounded-circle' style={{ width: "125px", height: "125px", objectFit: "cover" }} />
                                                    </Link>
                                                    <div className="card-body">
                                                        <div className="card-title fw-black">{offical.name}</div>
                                                        <div className='text-secondary small mb-2'> Yzarlaýanlar: 0 </div>
                                                        <button onClick={() => handleFollow(offical.id)} className="btn btn-green py-2 btn-sm" style={{ paddingRight: "100px", paddingLeft: "100px" }}>Yzarla</button>
                                                    </div>
                                                </div>
                                            </div>

                                        </Fragment>
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

export default Offical