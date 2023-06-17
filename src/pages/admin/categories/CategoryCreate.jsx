import { useState } from 'react'
import img_icon from '../../../assets/icons/img.svg'

const CategoryCreate = () => {

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
                            <h3 className="mb-3">Category Create</h3>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-3">
                        <form>
                            <div className="form-row">
                                <div className='col-xl-7 mb-4'>
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
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault02">Title</label>
                                    <input type="text" className="form-control" id="validationDefault02" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault02">Priority</label>
                                    <input type="number" className="form-control" id="validationDefault02" required />
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

export default CategoryCreate