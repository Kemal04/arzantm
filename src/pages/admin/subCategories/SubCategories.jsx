import {faEye, faPen, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useEffect} from "react";
import {useState} from "react";
import {toast} from "react-hot-toast";
import {Link} from "react-router-dom";

const SubCategories = () => {
    const [subCategories, setSubCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = async () => {
        setIsLoading(true);
        const response = await fetch(`/admin-api/sub-category`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("adACto")}`,
            },
        });

        if (!response.ok) {
            setIsLoading(false);
            return null;
        }
        const resData = await response.json();
        console.log(resData);
        setSubCategories(resData.data);
        setIsLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = async (e, id) => {
        e.preventDefault();
        console.log(id);
        const response = await fetch(`/admin-api/sub-category/${id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("adACto")}`,
            },
        });

        const resData = await response.json();
        console.log(resData);
        if (resData.status === false) {
            toast.error(resData.message);
            return null;
        } else if (resData.status === true) {
            toast.success(resData.message);
            fetchData();
        } else {
            toast.error(resData.message);
            return null;
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                            <h3 className="mb-3">Sub Category</h3>
                            <Link to="create" className="btn btn-primary add-list">
                                <FontAwesomeIcon icon={faPlus} className="mr-3" />
                                Sub Category goş
                            </Link>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="table-responsive rounded mb-3">
                            <table className="data-table table mb-0 tbl-server-info">
                                <thead className="bg-white text-uppercase">
                                    <tr className="ligth ligth-data">
                                        <th>№</th>
                                        <th>Id</th>
                                        <th>Title</th>
                                        <th>Category</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {isLoading ? (
                                    <tbody>
                                        <tr>
                                            <td>Loading...</td>
                                        </tr>
                                    </tbody>
                                ) : (
                                    <tbody className="ligth-body">
                                        {/* MAP ETMELI YERI */}
                                        {subCategories?.length > 0 ? (
                                            subCategories?.map((subCategory, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{subCategory.id}</td>
                                                    <td>{subCategory.name}</td>
                                                    <td>{subCategory.category.name}</td>
                                                    <td>
                                                        <div className="d-flex align-items-center list-action">
                                                            <button className="badge badge-primary mr-2">
                                                                <FontAwesomeIcon icon={faEye} className="mr-0" />
                                                            </button>
                                                            <button className="badge bg-warning mr-2">
                                                                <FontAwesomeIcon icon={faPen} className="mr-0" />
                                                            </button>
                                                            <button className="badge bg-danger mr-2" onClick={(e) => handleDelete(e, subCategory.id)}>
                                                                <FontAwesomeIcon icon={faTrash} className="mr-0" />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <div>Maglumat yok</div>
                                        )}
                                        {/* MAP ETMELI YERI */}
                                    </tbody>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SubCategories;
