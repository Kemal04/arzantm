import { faEye, faPen, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import useFetch from "../../../hooks/useFetch";
import { Link } from "react-router-dom";

const Users = () => {
    const [users, loading, error] = useFetch("v1/user", "users");

    if (error) {
        toast.error(error.message);
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-12">
                    <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                        <div>
                            <h3 className="mb-3">Ulanyjylar</h3>
                        </div>
                        <Link to="/admin/user-create" className="btn btn-primary add-list">
                            <FontAwesomeIcon icon={faPlus} className="mr-3" />
                            Ulanyjy goş
                        </Link>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="table-responsive rounded mb-3">
                        <table className="data-table table mb-0 tbl-server-info">
                            <thead className="bg-white text-uppercase">
                                <tr className="ligth ligth-data">
                                    <th>ID</th>
                                    <th>Avatar / Username</th>
                                    <th>Phone</th>
                                    <th>Email</th>
                                    <th>Type</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            {loading ? (
                                <tbody><tr><td>Loading...</td></tr></tbody>
                            ) : (
                                <tbody className="ligth-body">
                                    {/* MAP ETMELI YERI */}
                                    {users?.map((user, index) => (
                                        <tr key={index}>
                                            <td>{user.id}</td>
                                            <td>{user.name}</td>
                                            <td>+993 {user.phone_num}</td>
                                            <td>{!user.email && "E-mail girizilmedik"}</td>
                                            <td>{user.role}</td>
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
                                    ))}
                                    {/* MAP ETMELI YERI */}
                                </tbody>
                            )}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Users;
