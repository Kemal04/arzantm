import { useState } from 'react'
import img_icon from '../../../assets/icons/img.svg'
import phone from '../../../assets/icons/phone-bold.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faTimes, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import useFetch from '../../../hooks/useFetch'
import { useTranslation } from 'react-i18next'

const PostAdd = () => {

    const [formData, setFormData] = useState([]);

    const handleChangeImg = (e) => {
        var files = e.target.files;
        for (let i = 0; i < files.length; i++) {
            setImg([...formData, files[i]]);
            // setFormData([...formData, URL.createObjectURL(files[i])])
        }
    };

    const handleDelete = async (id) => {
        try {
            const afterDelete = formData.filter((formData, index) => {
                return index !== id
            })
            setFormData(afterDelete)
        } catch (error) {
            console.log(error);
        }
    }

    const navigate = useNavigate()

    const [img, setImg] = useState([])
    console.log(img);

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

    const [categories] = useFetch("/api/v1/category/list", "data", true);
    const [subCategories, setSubCategory] = useState([])

    const filterSubCategory = (e) => {
        const subId = e.target[e.target.selectedIndex].id
        setSubCategory(categories[subId]?.sub_categories)
        setDiscount((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

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

    const handleChange = (e) => {
        setDiscount((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async (e) => {
        e.preventDefault()

        const formData = new FormData()
        formData.append('image', img)
        formData.append('title', discount.title)
        formData.append('description', discount.description)
        formData.append('category_id', discount.category_id)
        formData.append('sub_category_id', discount.sub_category_id)
        formData.append('tags', tags)
        formData.append('phone', discount.phone)
        formData.append('price', discount.price)
        formData.append('discount', discount.discount)
        formData.append('start_date', discount.start_date)
        formData.append('end_date', discount.end_date)

        if (!img) {
            toast.error("Surat yok")
        }
        else if (!discount.title) {
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
                    console.log(res);
                    toast.success(res.data.message)
                    navigate("/profile")
                }).catch((err) => {
                    toast.error(err.response.data.message)
                    console.log(err);
                });
        }
    }

    const { t } = useTranslation();

    return (
        <>
            <div className='container mt-3'>
                <div className='d-flex justify-content-between align-items-center'>
                    <div className='h3'>{t('post_gosmak')}</div>
                </div>

                <div className='d-flex justify-content-center'>
                    <div style={{ width: "70%" }}>
                        <div className='row mt-3 gx-2'>
                            {
                                formData.map((item, index) =>
                                    <div className='col-xl-6 mb-2' key={index}>
                                        <div className='card border-0 '>
                                            <img src={item} alt="" className='card-img' />
                                            <div className='position-absolute end-0 bottom-0'>
                                                <button onClick={() => handleDelete(index)} className='btn btn-danger' style={{ borderRadius: "5px 0px 0px 0px!important" }}><FontAwesomeIcon icon={faTrashAlt} /></button>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            <div className='col-xl-6 mb-2 '>
                                <label className='label text-center w-100 d-flex justify-content-center align-items-center flex-column' htmlFor="upload">
                                    <img src={img_icon} alt="" className='img-fluid mb-2' />
                                    <div className='text-green'>{t('surat_gos')}</div>
                                </label>
                                <input name='img' type="file" title="" id="upload" hidden multiple onChange={handleChangeImg} />
                            </div>
                            <div className="col-xl-12 mb-4">
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
                            <div className="tags-container mt-3">
                                {tags.map((tag, index) => (
                                    <div key={index} className="tag" onClick={() => deleteTag(index)}>
                                        <span>
                                            <FontAwesomeIcon icon={faTimes} />
                                        </span>
                                        {tag}
                                    </div>
                                ))}
                            </div>
                            <div className='col-xl-12 mb-4'>
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
            </div>
        </>
    )
}

export default PostAdd