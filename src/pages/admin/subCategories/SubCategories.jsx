import { faEye, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const SubCategories = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                            <h3 className="mb-3">Sub Category</h3>
                            <Link to="/admin/sub-category-create" className="btn btn-primary add-list">
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
                                        <th>ID</th>
                                        <th>Title</th>
                                        <th>Category title</th>
                                        <th>Created at</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                {/* {loading ? (
                                    <tbody><tr><td>Loading...</td></tr></tbody>
                                ) : ( */}
                                <tbody className="ligth-body">
                                    {/* MAP ETMELI YERI */}
                                    {/* {users?.map((user, index) => ( */}
                                    <tr>
                                        <td>1</td>
                                        <td>Fizika</td>
                                        <td>Kitap</td>
                                        <td>14-06-2023</td>
                                        <td>
                                            <div className="d-flex align-items-center list-action">
                                                <a className="badge badge-primary mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="View" href="page-list-users.html#">
                                                    <FontAwesomeIcon icon={faEye} className="mr-0" />
                                                </a>
                                                <a className="badge bg-warning mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit" href="page-list-users.html#">
                                                    <FontAwesomeIcon icon={faPen} className="mr-0" />
                                                </a>
                                                <a className="badge bg-danger mr-2" data-toggle="tooltip" data-placement="top" title="" data-original-title="Delete" href="page-list-users.html#">
                                                    <FontAwesomeIcon icon={faTrash} className="mr-0" />
                                                </a>
                                            </div>
                                        </td>
                                    </tr>
                                    {/* // ))} */}
                                    {/* MAP ETMELI YERI */}
                                </tbody>
                                {/* )} */}
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default SubCategories