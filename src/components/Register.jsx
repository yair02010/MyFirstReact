import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
import { addUser, checkUserExists } from "../services/UserService";
import { Navbar } from "react-bootstrap";
import NavBar from "./NavBar"
import { notify } from "../utils/notify";

function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
      phone: "",
      imageUrl: "",
      imageAlt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zipCode: "",
      isBusiness: false,
    },
    validationSchema: yup.object({
      firstName: yup.string().required("First name is required"),
      middleName: yup.string(),
      lastName: yup.string().required("Last name is required"),
      email: yup.string().email("Invalid email address").required("Email is required"),
      password: yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
      phone: yup.string().required("Phone number is required"),
      imageUrl: yup.string().url("Invalid URL"),
      imageAlt: yup.string(),
      state: yup.string().required("State is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      street: yup.string().required("Street is required"),
      houseNumber: yup.string().required("House number is required"),
      zipCode: yup.string().required("Zip code is required"),
    }),
    onSubmit: async (values) => {
      try {
        const userExists = await checkUserExists(values);
        if (userExists && userExists.data && userExists.data.length) {
          alert("The email address you entered is already registered. Please use a different email or log in to your account.");
        } else {
          const newUser = await addUser({ ...values, isAdmin: false });
          localStorage.setItem("userId", JSON.stringify(newUser.data.id));
          notify("singup")
          navigate("/profile");
        }

      } catch (err) {
        console.error(err);
      }
    },
  });

  return (
    <>
      <NavBar />
      <div className="signup-page">
        <div className="signup-container">
          <h1 className="signup-title">Sign Up</h1>
          <form onSubmit={formik.handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="firstName" className="signup-label">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  className={`signup-input ${formik.touched.firstName && formik.errors.firstName ? "signup-error" : ""}`}
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName && (
                  <div className="signup-error">{formik.errors.firstName}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="middleName" className="signup-label">Middle Name (Optional)</label>
                <input
                  type="text"
                  id="middleName"
                  name="middleName"
                  className="signup-input"
                  value={formik.values.middleName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="lastName" className="signup-label">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  className={`signup-input ${formik.touched.lastName && formik.errors.lastName ? "signup-error" : ""}`}
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName && (
                  <div className="signup-error">{formik.errors.lastName}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="email" className="signup-label">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`signup-input ${formik.touched.email && formik.errors.email ? "signup-error" : ""}`}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <div className="signup-error">{formik.errors.email}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="password" className="signup-label">password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`signup-input ${formik.touched.password && formik.errors.password ? "signup-error" : ""}`}
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <div className="signup-error">{formik.errors.password}</div>
                )}
              </div>
            </div>


            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="phone" className="signup-label">Phone Number</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  className={`signup-input ${formik.touched.phone && formik.errors.phone ? "signup-error" : ""}`}
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <div className="signup-error">{formik.errors.phone}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="imageUrl" className="signup-label">Image URL (Optional)</label>
                <input
                  type="text"
                  id="imageUrl"
                  name="imageUrl"
                  className={`signup-input ${formik.touched.imageUrl && formik.errors.imageUrl ? "signup-error" : ""}`}
                  value={formik.values.imageUrl}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="state" className="signup-label">State</label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className={`signup-input ${formik.touched.state && formik.errors.state ? "signup-error" : ""}`}
                  value={formik.values.state}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.state && formik.errors.state && (
                  <div className="signup-error">{formik.errors.state}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="country" className="signup-label">Country</label>
                <input
                  type="text"
                  id="country"
                  name="country"
                  className={`signup-input ${formik.touched.country && formik.errors.country ? "signup-error" : ""}`}
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.country && formik.errors.country && (
                  <div className="signup-error">{formik.errors.country}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city" className="signup-label">City</label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={`signup-input ${formik.touched.city && formik.errors.city ? "signup-error" : ""}`}
                  value={formik.values.city}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.city && formik.errors.city && (
                  <div className="signup-error">{formik.errors.city}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="street" className="signup-label">Street</label>
                <input
                  type="text"
                  id="street"
                  name="street"
                  className={`signup-input ${formik.touched.street && formik.errors.street ? "signup-error" : ""}`}
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.street && formik.errors.street && (
                  <div className="signup-error">{formik.errors.street}</div>
                )}
              </div>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="houseNumber" className="signup-label">House Number</label>
                <input
                  type="text"
                  id="houseNumber"
                  name="houseNumber"
                  className={`signup-input ${formik.touched.houseNumber && formik.errors.houseNumber ? "signup-error" : ""}`}
                  value={formik.values.houseNumber}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.houseNumber && formik.errors.houseNumber && (
                  <div className="signup-error">{formik.errors.houseNumber}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label htmlFor="zipCode" className="signup-label">Zip Code</label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  className={`signup-input ${formik.touched.zipCode && formik.errors.zipCode ? "signup-error" : ""}`}
                  value={formik.values.zipCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.zipCode && formik.errors.zipCode && (
                  <div className="signup-error">{formik.errors.zipCode}</div>
                )}
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                id="isBusiness"
                name="isBusiness"
                className="signup-checkbox"
                checked={formik.values.isBusiness}
                onChange={formik.handleChange}
              />
              <label htmlFor="isBusiness" className="signup-checkbox-label">Sign up as a Business</label>
            </div>

            <button type="submit" className="signup-button">Sign Up</button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
