import { useState } from "react";
import img_icon from '../../../assets/icons/img.svg'

const BannerCreate = () => {

    const [image, setImage] = useState(null)

    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setImage(URL.createObjectURL(event.target.files[0]));
        }
    }

    return (
        <>

            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                            <h3 className="mb-3">Banner Create</h3>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-3">
                        <form>
                            <div className="form-row">
                                <div className='col-xl-12 mb-4'>
                                    {
                                        image === null
                                            ?
                                            <>
                                                <label className='label text-center d-flex justify-content-center align-items-center flex-column' htmlFor="upload">
                                                    <img src={img_icon} alt="" className='img-fluid mb-2' />
                                                    <div className='text-green'>Surat goş</div>
                                                </label>

                                                <input type="file" name="banner_img" id="upload" hidden onChange={onImageChange} />
                                            </>
                                            :
                                            <>
                                                <img alt="" src={image} className='img-fluid' />
                                            </>
                                    }
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationDefault02">Title</label>
                                    <input type="text" className="form-control" id="validationDefault02" required />
                                </div>
                                <div className="col-md-12 mb-3">
                                    <label htmlFor="validationDefault02">Note</label>
                                    <textarea type="number" className="form-control" id="validationDefault02" required rows={6}></textarea>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault02">Url</label>
                                    <input type="text" className="form-control" id="validationDefault02" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault02">Priority</label>
                                    <input type="number" className="form-control" id="validationDefault02" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault01">Start Date</label>
                                    <input type="date" className="form-control" id="validationDefault01" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault02">End Date</label>
                                    <input type="date" className="form-control" id="validationDefault02" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault04">Welayats</label>
                                    <select className="form-control" id="validationDefault04" required>
                                        <option defaultValue>Welayats</option>
                                        <option value="Ashgabat">Ashgabat</option>
                                        <option value="Ahal">Ahal</option>
                                        <option value="Mary">Mary</option>
                                        <option value="Lebap">Lebap</option>
                                        <option value="Dashoguz">Dashoguz</option>
                                        <option value="Balkan">Balkan</option>
                                    </select>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault04">Pages</label>
                                    <select className="form-control" id="validationDefault04" required>
                                        <option defaultValue>Pages</option>
                                        <option value="Home page">Home page</option>
                                        <option value="Foto page">Foto pagel</option>
                                        <option value="Video page">Video page</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-group d-grid mt-3 mb-5">
                                <button className="btn btn-green" type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default BannerCreate