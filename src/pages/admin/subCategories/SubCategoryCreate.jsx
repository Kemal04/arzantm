
const SubCategoryCreate = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-lg-8">
                        <div className="d-flex flex-wrap align-items-center justify-content-between mb-4">
                            <h3 className="mb-3">Sub Category Create</h3>
                        </div>
                    </div>
                    <div className="col-lg-8 mt-3">
                        <form>
                            <div className="form-row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault02">Title</label>
                                    <input type="text" className="form-control" id="validationDefault02" required />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="validationDefault04">Categories</label>
                                    <select className="form-control" id="validationDefault04" required>
                                        <option defaultValue>Categories</option>
                                        <option value="Ashgabat">Ashgabat</option>
                                        <option value="Ahal">Ahal</option>
                                        <option value="Mary">Mary</option>
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

export default SubCategoryCreate