import login_img from '../../../assets/auth/login.png'

const Login = () => {
    return (
        <>
            <section className="login-content">
                <div className="container">
                    <div className="row align-items-center justify-content-center height-self-center">
                        <div className="col-lg-8">
                            <div className="card auth-card shadow-sm">
                                <div className="d-flex align-items-center auth-content">
                                    <div className="col-xl-7 align-self-center">
                                        <div className="p-3">
                                            <h2 className="fw-bold">Ulgama gir</h2>
                                            <p className="my-4 text-secondary">Administrator paneline girmek.</p>
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
                                                <button type="submit" className="btn btn-primary rounded-3 ">
                                                    Ulgama gir
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                    <div className="col-xl-5">
                                        <img src={login_img} alt="" className="img-fluid" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
