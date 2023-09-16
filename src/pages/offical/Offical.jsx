import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom"
import column_icon from '../../assets/icons/grid-column.svg'
import grid_little from '../../assets/icons/grid-little.svg'
import { useState } from "react";
import useFetch from "../../hooks/useFetch";
import logo_img from '../../assets/cards/offical/arzan.jpeg'
import { Fragment } from "react";

const Offical = () => {

    const { t } = useTranslation();

    //DESIGN GRIDS
    const [grid, setGrid] = useState(false)

    const [officals, loading] = useFetch("/api/v1/user/profile?subscription_type_id=2", "data");

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

                                            <Link to={`/resmi-hasap/${offical.id}`} className={`col-xl-12 text-decoration-none text-dark ${!grid ? "" : "d-none"}`}>
                                                <div className="d-flex justify-content-between align-items-center border p-3 mb-3">
                                                    <div className="d-flex align-items-center">
                                                        <img src={offical.avatar_image.url === null ? logo_img : 'https://arzan.info/' + offical.avatar_image.url} alt="" className='rounded-circle' style={{ width: "60px", height: "60px", objectFit: "cover" }} />
                                                        <div className='ms-4'>
                                                            <div className='fw-black'>{offical.name}</div>
                                                            <div className='text-secondary small'>
                                                                Yzarlaýanlar: 0
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <button className="btn btn-green px-3 py-2 btn-sm">Yzarla</button>
                                                </div>
                                            </Link>

                                            <Link to='/' className={`col-xl-3 text-decoration-none text-dark mb-3 ${!grid ? "d-none" : ""}`}>
                                                <div className="card rounded-4 text-center d-flex flex-column align-items-center pt-3">
                                                    <img src={offical.avatar_image.url === null ? logo_img : 'https://arzan.info/' + offical.avatar_image.url} className='rounded-circle' style={{ width: "125px", height: "125px", objectFit: "cover" }} />
                                                    <div className="card-body">
                                                        <div className="card-title fw-black">{offical.name}</div>
                                                        <div className='text-secondary small mb-2'> Yzarlaýanlar: 0 </div>
                                                        <button className="btn btn-green py-2 btn-sm" style={{ paddingRight: "100px", paddingLeft: "100px" }}>Yzarla</button>
                                                    </div>
                                                </div>
                                            </Link>

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