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
                        <div className='col-xl-3'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to='/' className="nav-link" style={{ color: "#AAAAAA" }}>{t("habarlar")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/' className="nav-link" style={{ color: "#AAAAAA" }}>{t("dukan")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/foto' className="nav-link" style={{ color: "#AAAAAA" }}>{t("galereya")}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-xl-3'>
                            <ul className="nav flex-column">
                                <li className="nav-item">
                                    <Link to='/top-list' className="nav-link" style={{ color: "#AAAAAA" }}>{t("top_hasaplar")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/resmiler' className="nav-link" style={{ color: "#AAAAAA" }}>{t("resmiler")}</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to='/saylananlar' className="nav-link" style={{ color: "#AAAAAA" }}>{t("saylananlar")}</Link>
                                </li>
                            </ul>
                        </div>
                        <div className='col-xl-3'>
                            <ul className="nav flex-column">
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
                        <div className='col-xl-3 text-end'>
                            <img src={logo} alt="" className='img-fluid' />
                            <div className='mt-3' style={{ color: "#747474", fontSize: "12px" }}>@2023 ArzanTM, Turkmenistan. All rights reserved.</div>
                        </div>
                        <div className='col-xl-12 text-center mt-5'>
                            <div className='d-flex justify-content-center align-items-center'>
                                <img src={youtube} alt="" className='img-fluid px-3' />
                                <img src={tiktok} alt="" className='img-fluid px-3' />
                                <img src={instagram} alt="" className='img-fluid px-3' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Footer