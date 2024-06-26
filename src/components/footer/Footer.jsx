import { Link } from 'react-router-dom'
import logo from '../../assets/logo/logo.svg'

import youtube from '../../assets/icons/youtube.svg'
import tiktok from '../../assets/icons/tiktok.svg'
import instagram from '../../assets/icons/instagram.svg'
import { useTranslation } from 'react-i18next'

const Footer = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className='p-5 text-white' style={{ backgroundColor: "#0A0909" }}>
                <div className='container'>
                    <div className='row align-items-center'>
                        <div className='col-xl-3 col-lg-3 col-md-6 col-6 mb-5'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to='/arzanladyslar' className="nav-link" style={{ color: "#AAAAAA" }}>{t("arzanladyslar")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/video' className="nav-link" style={{ color: "#AAAAAA" }}>{t("wideo")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/foto' className="nav-link" style={{ color: "#AAAAAA" }}>{t("galereya")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/top-list' className="nav-link" style={{ color: "#AAAAAA" }}>{t("top_hasaplar")}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-6 col-6 mb-5'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to='/saylananlar' className="nav-link" style={{ color: "#AAAAAA" }}>{t("saylananlar")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/ulanys-kadalary' className="nav-link" style={{ color: "#AAAAAA" }}>{t("ulanys_duzgunleri")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/habarlasmak' className="nav-link" style={{ color: "#AAAAAA" }}>{t("habarlasmak")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/biz-barada' className="nav-link" style={{ color: "#AAAAAA" }}>{t("biz_barada")}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-xl-3 col-lg-3 col-md-6 col-6 mb-5 text-end'>
                            <Link to='https://arzan.info/' className='text-decoration-none'>
                                <img src={logo} alt="" className='img-fluid' />
                                <div className='mt-3' style={{ color: "#747474", fontSize: "12px" }}>@2023 ArzanTM, Turkmenistan. All rights reserved.</div>
                            </Link>
                        </div>
                        <div className='col-xl-3 mb-5'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <Link to='https://www.youtube.com/channel/UC87LcYTNsVhadgUsdP08LfQ' target='_blank'><img src={youtube} alt="" className='img-fluid px-3' style={{ width: "55px" }} /></Link>
                                <Link to='https://www.tiktok.com/@arzan_tm' target='_blank'><img src={tiktok} alt="" className='img-fluid px-3' style={{ width: "55px" }} /></Link>
                                <Link to='https://www.instagram.com/arzan_tm/' target='_blank'><img src={instagram} alt="" className='img-fluid px-3' style={{ width: "55px" }} /></Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer