import {useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {toast} from "react-hot-toast";
import {useAuth} from "../../../context/AuthContext";
import login_img from "../../../assets/auth/login.png";

const Login = () => {
    const {setAdmin, setIsLoggedIn} = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const navigate = useNavigate();
    const email = useRef("");
    const password = useRef("");

    const submitHandler = async (e) => {
        setIsSubmitting(true);
        e.preventDefault();
        const loginData = {
            email: email.current.value,
            password: password.current.value,
        };
        const response = await fetch(`${import.meta.env.VITE_API_FETCH_ACTIVE}admin/account/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(loginData),
        });

        const resData = await response.json();
        console.log(resData);
        if (resData.status === false) {
            toast.error(resData.message);
            setIsSubmitting(false);
            return null;
        }

        if (resData.status === true) {
            toast.success(resData.message);
            setIsSubmitting(false);
            const token = resData.data.token;
            localStorage.setItem("adACto", token);

            setIsLoggedIn(true);
            setAdmin({
                id: 1,
                role: "Admin",
                status: true,
            });

            navigate("/admin");
        }

        setIsSubmitting(false);
    };
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
                                            <form onSubmit={submitHandler}>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input className="floating-input form-control" id="email" type="email" name="email" placeholder="" ref={email} required />
                                                            <label>Email</label>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="floating-label form-group">
                                                            <input className="floating-input form-control" id="password" type="password" name="password" placeholder=" " ref={password} required />
                                                            <label>Parol</label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn btn-primary rounded-3 " disabled={isSubmitting}>
                                                    {isSubmitting ? "Tassyklanýar..." : "Tassykla"}
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
