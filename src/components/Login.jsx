import React from "react";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { checkUser } from "../services/UserService";
import Navbar from "./NavBar";
import "../css/login.css";

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
        <>
            <Navbar />
            <div className="pageFull">
            <section className="login-page">
                <div className="login-container">
                    <div className="login-image-container">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                            className="login-image"
                            alt="Sample"
                        />
                    </div>
                    <div className="login-form-container">
                        <form onSubmit={formik.handleSubmit}>
                            <div className="login-form-group">
                                <label htmlFor="email" className="login-label">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    className={`login-input ${formik.touched.email && formik.errors.email ? "login-error" : ""}`}
                                    placeholder="Enter a valid email address"
                                    name="email"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.email && formik.errors.email && (
                                    <div className="login-feedback">{formik.errors.email}</div>
                                )}
                            </div>

                            <div className="login-form-group">
                                <label htmlFor="password" className="login-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    className={`login-input ${formik.touched.password && formik.errors.password ? "login-error" : ""}`}
                                    placeholder="Enter your password"
                                    name="password"
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                />
                                {formik.touched.password && formik.errors.password && (
                                    <div className="login-feedback">{formik.errors.password}</div>
                                )}
                            </div>

                            <div className="login-button-container">
                                <button type="submit" className="login-button">
                                    Login
                                </button>
                                <p className="login-register-link">
                                    Don't have an account? <a href="#!" className="login-register-anchor">Register</a>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            </div>
        </>
    );
}

export default Login;
