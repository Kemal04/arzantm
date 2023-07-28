import { useTranslation } from "react-i18next";

const TermsOfUse = () => {

    const { t } = useTranslation();

    return (
        <>
            <div className="container my-5">
                <div className="row justify-content-center">
                    <div className="col-xl-8">
                        <div className="card rounded-5">
                            <div className="card-body">
                                <div className="text-green h2 text-center mb-4">{t('ulanys_duzgunleri')}</div>
                                <p dangerouslySetInnerHTML={{ __html: t('ulanys_duzgunleri_tekst') }}></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TermsOfUse