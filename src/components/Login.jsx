import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser } from "../services/UserService";

function Login() {
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validationSchema: yup.object({
            email: yup.string()
                .required("Email is required")
                .email("Invalid email address"),
            password: yup.string()
                .required("Password is required")
                .min(6, "Password must be at least 6 characters"),
        }),
        onSubmit: (values) => {
            checkUser(values)
                .then((user) => {
                    navigate("/Profile");
                    localStorage.setItem("userId", JSON.stringify(user.id));
                })
                .catch((err) => {
                    alert("User not found. Please check the entered credentials.");
                    console.error("Error:", err);
                });
        },
    });

    return (
        <section className="vh-100">
            <div className="container-fluid h-custom">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-md-9 col-lg-6 col-xl-5">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="img-fluid"
                            alt="Sample image"
                        />
                    </div>
                    <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="form-outline mb-4">
                                <input
                                    type="email"
                                    id="email"
                                    className={`form-control form-control-lg ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
                                    placeholder="Enter a valid email address"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label className="form-label" htmlFor="email">
                                    Email Address
                                </label>
                                {formik.touched.email && formik.errors.email ? (
                                    <div className="invalid-feedback">{formik.errors.email}</div>
                                ) : null}
                            </div>

                            <div className="form-outline mb-3">
                                <input
                                    type="password"
                                    id="password"
                                    className={`form-control form-control-lg ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
                                    placeholder="Enter your password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                <label className="form-label" htmlFor="password">
                                    Password
                                </label>
                                {formik.touched.password && formik.errors.password ? (
                                    <div className="invalid-feedback">{formik.errors.password}</div>
                                ) : null}
                            </div>

                            <div className="text-center text-lg-start mt-4 pt-2">
                                <button
                                    type="submit"
                                    className="btn btn-primary btn-lg"
                                    style={{ paddingLeft: "2.5rem", paddingRight: "2.5rem" }}
                                >
                                    Login
                                </button>
                                <p className="small fw-bold mt-2 pt-1 mb-0">
                                    Don't have an account? <a href="#!" className="link-danger">Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
