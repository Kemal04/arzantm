const Login = () => {
    return (
        <section className="login-content">
            <div className="container">
                <div className="row align-items-center justify-content-center height-self-center">
                    <div className="col-lg-6">
                        <div className="card auth-card">
                            <div className="card-body p-0">
                                <div className="d-flex align-items-center auth-content">
                                    <div className="col-lg-12 align-self-center text-center">
                                        <div className="p-3">
                                            <h2 className="mb-2">Ulgama gir</h2>
                                            <p>Administrator paneline girmek üçin maglumatlary giriziň.</p>
                                            <form>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input className="floating-input form-control" type="email" placeholder=" " />
                                                            <label>Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input className="floating-input form-control" type="password" placeholder=" " />
                                                            <label>Parol</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary">
                                                    Ulgama gir
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Login;
