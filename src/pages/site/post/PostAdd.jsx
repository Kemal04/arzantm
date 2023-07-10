import { useEffect, useState } from 'react'
import img_icon from '../../../assets/icons/img.svg'
import phone from '../../../assets/icons/phone-bold.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import useFetch from '../../../hooks/useFetch'
import { useTranslation } from 'react-i18next'

const PostAdd = () => {

    //OTHERS
    const navigate = useNavigate()
    const { t } = useTranslation();

    //MULTI IMAGE DESIGN VIEWED
    const [selectedFile1, setSelectedFile1] = useState();
    const [preview1, setPreview1] = useState();

    const [selectedFile2, setSelectedFile2] = useState();
    const [preview2, setPreview2] = useState();

    const [selectedFile3, setSelectedFile3] = useState();
    const [preview3, setPreview3] = useState();

    const [selectedFile4, setSelectedFile4] = useState();
    const [preview4, setPreview4] = useState();

    const [selectedFile5, setSelectedFile5] = useState();
    const [preview5, setPreview5] = useState();

    const [selectedFile6, setSelectedFile6] = useState();
    const [preview6, setPreview6] = useState();

    const [selectedFile7, setSelectedFile7] = useState();
    const [preview7, setPreview7] = useState();

    const [selectedFile8, setSelectedFile8] = useState();
    const [preview8, setPreview8] = useState();

    const [selectedFile9, setSelectedFile9] = useState();
    const [preview9, setPreview9] = useState();

    const [selectedFile10, setSelectedFile10] = useState();
    const [preview10, setPreview10] = useState();

    useEffect(() => {
        if (!selectedFile1) {
            setPreview1(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile1);
        setPreview1(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile1]);
    useEffect(() => {
        if (!selectedFile2) {
            setPreview2(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile2);
        setPreview2(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile2]);
    useEffect(() => {
        if (!selectedFile3) {
            setPreview3(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile3);
        setPreview3(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile3]);
    useEffect(() => {
        if (!selectedFile4) {
            setPreview4(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile4);
        setPreview4(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile4]);
    useEffect(() => {
        if (!selectedFile5) {
            setPreview5(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile5);
        setPreview5(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile5]);
    useEffect(() => {
        if (!selectedFile6) {
            setPreview6(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile6);
        setPreview6(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile6]);
    useEffect(() => {
        if (!selectedFile7) {
            setPreview7(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile7);
        setPreview7(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile7]);
    useEffect(() => {
        if (!selectedFile8) {
            setPreview8(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile8);
        setPreview8(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile8]);
    useEffect(() => {
        if (!selectedFile9) {
            setPreview9(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile9);
        setPreview9(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile9]);
    useEffect(() => {
        if (!selectedFile10) {
            setPreview10(undefined);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile10);
        setPreview10(objectUrl);
        return () => URL.revokeObjectURL(objectUrl);
    }, [selectedFile10]);

    const onSelectFile1 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile1(undefined);
            return;
        }
        setSelectedFile1(e.target.files[0]);
    };
    const onSelectFile2 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile2(undefined);
            return;
        }
        setSelectedFile2(e.target.files[0]);
    };
    const onSelectFile3 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile3(undefined);
            return;
        }
        setSelectedFile3(e.target.files[0]);
    };
    const onSelectFile4 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile4(undefined);
            return;
        }
        setSelectedFile4(e.target.files[0]);
    };
    const onSelectFile5 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile5(undefined);
            return;
        }
        setSelectedFile5(e.target.files[0]);
    };
    const onSelectFile6 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile6(undefined);
            return;
        }
        setSelectedFile6(e.target.files[0]);
    };
    const onSelectFile7 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile7(undefined);
            return;
        }
        setSelectedFile7(e.target.files[0]);
    };
    const onSelectFile8 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile8(undefined);
            return;
        }
        setSelectedFile8(e.target.files[0]);
    };
    const onSelectFile9 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile9(undefined);
            return;
        }
        setSelectedFile9(e.target.files[0]);
    };
    const onSelectFile10 = (e) => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile10(undefined);
            return;
        }
        setSelectedFile10(e.target.files[0]);
    };

    //IMAGE AND DISCOUNT STATES
    const [discount, setDiscount] = useState({
        title: "",
        description: "",
        category_id: "",
        sub_category_id: "",
        phone: "",
        price: "",
        discount: "",
        start_date: "",
        end_date: "",
    })

    //SUB CATEGORY FILTERED IN CATEGORY
    const [categories] = useFetch("/api/v1/category/list", "data", true);
    const [subCategories, setSubCategory] = useState([])

    const filterSubCategory = (e) => {
        const subId = e.target[e.target.selectedIndex].id
        setSubCategory(categories[subId]?.sub_categories)
        setDiscount((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    //ARRAY TAGS
    const [input, setInput] = useState("");
    const [tags, setTags] = useState([]);
    const [isKeyReleased, setIsKeyReleased] = useState(false);

    const onChange = (e) => {
        const { value } = e.target;
        setInput(value);
    };

    const onKeyDown = (e) => {
        const { key } = e;
        const trimmedInput = input.trim();
        if (key === " " && trimmedInput.length && !tags.includes(trimmedInput)) {
            e.preventDefault();
            setTags((prevState) => [...prevState, trimmedInput]);
            setInput("");
        }

        if (key === "Backspace" && !input.length && tags.length && isKeyReleased) {
            const tagsCopy = [...tags];
            const poppedTag = tagsCopy.pop();
            e.preventDefault();
            setTags(tagsCopy);
            setInput(poppedTag);
        }

        setIsKeyReleased(false);
    };

    const onKeyUp = () => {
        setIsKeyReleased(true);
    };

    const deleteTag = (index) => {
        setTags((prevState) => prevState.filter((tag, i) => i !== index));
    };

    //HANDLE CHANGE
    const handleChange = (e) => {
        setDiscount((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }


    //POST METHOD
    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('title', discount.title)
        formData.append('description', discount.description)
        formData.append('category_id', discount.category_id)
        formData.append('sub_category_id', discount.sub_category_id)
        formData.append('tags', JSON.stringify(tags))
        formData.append('phone', discount.phone)
        formData.append('price', discount.price)
        formData.append('discount', discount.discount)
        formData.append('start_date', discount.start_date)
        formData.append('end_date', discount.end_date)

        if (selectedFile1 !== undefined) {
            formData.append("image", selectedFile1);
        }
        if (selectedFile2 !== undefined) {
            formData.append("image", selectedFile2);
        }
        if (selectedFile3 !== undefined) {
            formData.append("image", selectedFile3);
        }
        if (selectedFile4 !== undefined) {
            formData.append("image", selectedFile4);
        }
        if (selectedFile5 !== undefined) {
            formData.append("image", selectedFile5);
        }
        if (selectedFile6 !== undefined) {
            formData.append("image", selectedFile6);
        }
        if (selectedFile7 !== undefined) {
            formData.append("image", selectedFile7);
        }
        if (selectedFile8 !== undefined) {
            formData.append("image", selectedFile8);
        }
        if (selectedFile9 !== undefined) {
            formData.append("image", selectedFile9);
        }
        if (selectedFile10 !== undefined) {
            formData.append("image", selectedFile10);
        }

        if (!discount.title) {
            toast.error("Title giriziň")
        }
        else if (!discount.description) {
            toast.error("Description giriziň")
        }
        else if (!tags) {
            toast.error("Description giriziň")
        }
        else if (!discount.category_id) {
            toast.error("Category giriziň")
        }
        else if (!discount.sub_category_id) {
            toast.error("Sub category giriziň")
        }
        else if (!discount.price) {
            toast.error("Price giriziň")
        }
        else if (!discount.discount) {
            toast.error("Discount Price giriziň")
        }
        else if (!discount.phone) {
            toast.error("Phone number giriziň")
        }
        else if (!discount.start_date) {
            toast.error("Giriş wagty giriziň")
        }
        else if (!discount.end_date) {
            toast.error("Cykys wagty giriziň")
        }
        else {
            await axios.post(`/api/v1/post/create`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
                },
            })
                .then((res) => {
                    toast.success(res.data.message)
                    navigate("/profile")
                }).catch((err) => {
                    toast.error(err.response.data.message)
                });
        }
    }

    return (
        <>
            <div className='container mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='h3'>{t('post_gosmak')}</div>
                </div>

                <div className='d-flex justify-content-center'>
                    <div style={{ width: "70%" }}>
                        <div className='row mt-3 gx-2'>
                            <div className="col-md-3">
                                {!selectedFile1 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile1} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview1} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile1(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile2 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile2} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview2} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile2(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile3 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile3} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview3} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile3(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile4 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile4} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview4} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile4(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile5 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile5} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview5} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile5(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile6 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile6} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview6} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile6(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile7 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile7} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview7} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile7(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile8 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile8} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview8} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile8(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile9 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile9} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview9} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile9(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-md-3">
                                {!selectedFile10 ? (
                                    <>
                                        <label className="label text-center d-flex justify-content-center align-items-center flex-column" htmlFor="image">
                                            <img src={img_icon} alt="add" className="img-fluid mb-2" />
                                            <div className="text-green">Surat goş</div>
                                        </label>

                                        <input type="file" id="image" accept="image/*" className="form-control" name="image" onChange={onSelectFile10} hidden />
                                    </>
                                ) : (
                                    <div className="position-relative">
                                        <img alt="preview" src={preview10} className="img-fluid w-100 rounded" />
                                        <div className="delete-button">
                                            <button className="btn btn-danger" onClick={() => setSelectedFile10(undefined)}>
                                                <FontAwesomeIcon icon={faTrash} className="" />
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="col-xl-12 my-4">
                                <input name='title' onChange={handleChange} type="text" className="form-control" placeholder={t('post_ady')} required />
                            </div>
                            <div className='col-xl-12 mb-4'>
                                <textarea name='description' onChange={handleChange} className="form-control" id="exampleFormControlTextarea1" rows="4" placeholder={t('doly_maglumaty')} required></textarea>
                            </div>
                            <div className='col-xl-6 mb-4'>
                                <select name='category_id' id='category_id' onChange={(e) => filterSubCategory(e)} className="form-select" required>
                                    <option defaultValue>{t('kategoriya_sayla')}</option>
                                    {categories?.map((category, index) => (
                                        <option key={index} value={category.id} id={index}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='col-xl-6 mb-4'>
                                <select name='sub_category_id' id='sub_category_id' onChange={handleChange} className="form-select" required>
                                    <option defaultValue>{t('kategoriya_sayla')}</option>
                                    {subCategories?.map((subCategory, index) => (
                                        <option key={index} value={subCategory.id}>
                                            {subCategory.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <input type="text" className="form-control" id="title" name="title" value={input} onKeyDown={onKeyDown} onKeyUp={onKeyUp} onChange={onChange} />
                            <div className="d-flex mt-3 align-items-center">
                                {tags.map((tag, index) => (
                                    <div key={index} className="bg-green text-white rounded px-2 d-flex align-items-center me-2" onClick={() => deleteTag(index)}>
                                        <FontAwesomeIcon icon={faTimes} className='me-1' />
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <div className='col-xl-12 my-4'>
                                <div className='d-flex align-items-center'>
                                    <input className="form-check-input me-3" type="checkbox" value="" style={{ width: "20px", height: "20px", borderRadius: "3px" }} required />
                                    <input name='phone' onChange={handleChange} className="form-control ps-5" type="text" placeholder={t('telefon_belgi')} style={{ background: `url(${phone}) no-repeat left`, backgroundPositionX: "20px" }} required />
                                </div>
                            </div>
                            <div className='col-xl-6 mb-3'>
                                <div className='d-flex align-items-center'>
                                    <input className="form-check-input me-3" type="checkbox" value="" style={{ width: "20px", height: "20px", borderRadius: "3px" }} required />
                                    <input name='price' onChange={handleChange} type="text" className="form-control" placeholder={t('baha')} required />
                                </div>
                            </div>
                            <div className='col-xl-6 mb-3'>
                                <input name='discount' onChange={handleChange} type="text" className="form-control" placeholder={t('arzanladys')} required />
                            </div>
                            <div className='ms-4 ps-3 mb-1'>{t('mahabat_dowri')}</div>
                            <div className='col-xl-6 mb-4'>
                                <div className='d-flex align-items-center'>
                                    <input className="form-check-input me-3" type="checkbox" value="" style={{ width: "20px", height: "20px", borderRadius: "3px" }} required />
                                    <input name='start_date' onChange={handleChange} type="date" className="form-control" required />
                                </div>
                            </div>
                            <div className='col-xl-6 mb-5'>
                                <input name='end_date' onChange={handleChange} type="date" className="form-control" />
                            </div>
                            <div className='col-xl-12 d-flex justify-content-between align-items-center mb-4'>
                                <div className='d-flex align-items-center'>
                                    <input className="form-check-input me-3" type="checkbox" value="" style={{ width: "20px", height: "20px", borderRadius: "3px" }} id="flexCheckDefault" required />
                                    <label className="form-check-label" htmlFor="flexCheckDefault">
                                        {t('duzgunleri_okadym')}
                                    </label>
                                </div>
                                <Link to="/" className='d-flex align-items-center text-green text-decoration-none'>
                                    <FontAwesomeIcon icon={faEye} className='me-2' />
                                    {t('onunden_syn')}
                                </Link>
                            </div>
                            <div className='col-xl-12 text-center mb-5'>
                                <button onClick={handleClick} className='btn btn-green' style={{ padding: "10px 145px" }}>{t('gosmak')}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default PostAdd