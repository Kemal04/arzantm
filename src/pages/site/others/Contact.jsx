import { useTranslation } from "react-i18next";

const Contact = () => {

    const { t } = useTranslation();

    return (
        <div className="container my-5 py-5">
            <div className="row justify-content-center">
                <div className="col-xl-8">
                    <div className="card rounded-5 pb-5 pt-2">
                        <div className="card-body">
                            <div className="text-green h2 text-center mb-4">Habarlaşmak</div>
                            <input name='email' type="email" className="form-control mb-4" placeholder={t('E-mail adresi')} required />
                            <textarea name='description' className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder={t('doly_maglumaty')} required></textarea>
                            <div className="d-grid mt-4">
                                <button className='btn btn-green'>{t('Ugratmak')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Contact