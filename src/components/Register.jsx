import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../css/signup.css";
import { addUser, checkUserExists } from "../services/UserService";
function Signup() {
  const navigate = useNavigate();

  // Formik configuration
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
      state: yup.string().required("State is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City is required"),
      street: yup.string().required("Street is required"),
      houseNumber: yup.string().required("House number is required"),
      zipCode: yup.string().required("Zip code is required"),
    }),
    onSubmit: async (values) => {
      checkUserExists(values) .then((res)=>{
        if(res.data.length){
          alert("The email address you entered is already registered. Please use a different email or log in to your account.")
        }else{
          addUser({...values,isAdmin:false}).then((res =>{
            navigate("/home")
            localStorage.setItem("userId",JSON.stringify(res.data.id))
          }))
        }
      }) .catch((err) =>{
        console.log(err);
        
      })
    },
  });

  return (
    <div className="container mt-5">
      <h1 className="text-center">Sign Up</h1>
      <form onSubmit={formik.handleSubmit} className="mt-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className={`form-control ${formik.touched.firstName && formik.errors.firstName ? "is-invalid" : ""}`}
              value={formik.values.firstName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <div className="invalid-feedback">{formik.errors.firstName}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="middleName" className="form-label">Middle Name (Optional)</label>
            <input
              type="text"
              id="middleName"
              name="middleName"
              className="form-control"
              value={formik.values.middleName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className={`form-control ${formik.touched.lastName && formik.errors.lastName ? "is-invalid" : ""}`}
              value={formik.values.lastName}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <div className="invalid-feedback">{formik.errors.lastName}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              className={`form-control ${formik.touched.email && formik.errors.email ? "is-invalid" : ""}`}
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.email && formik.errors.email && (
              <div className="invalid-feedback">{formik.errors.email}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className={`form-control ${formik.touched.password && formik.errors.password ? "is-invalid" : ""}`}
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.password && formik.errors.password && (
              <div className="invalid-feedback">{formik.errors.password}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="phone" className="form-label">Phone Number</label>
            <input
              type="text"
              id="phone"
              name="phone"
              className={`form-control ${formik.touched.phone && formik.errors.phone ? "is-invalid" : ""}`}
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="invalid-feedback">{formik.errors.phone}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="imageUrl" className="form-label">Image URL (Optional)</label>
            <input
              type="text"
              id="imageUrl"
              name="imageUrl"
              className="form-control"
              value={formik.values.imageUrl}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="imageAlt" className="form-label">Image Alt Text (Optional)</label>
            <input
              type="text"
              id="imageAlt"
              name="imageAlt"
              className="form-control"
              value={formik.values.imageAlt}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="state" className="form-label">State</label>
            <input
              type="text"
              id="state"
              name="state"
              className={`form-control ${formik.touched.state && formik.errors.state ? "is-invalid" : ""}`}
              value={formik.values.state}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.state && formik.errors.state && (
              <div className="invalid-feedback">{formik.errors.state}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="country" className="form-label">Country</label>
            <input
              type="text"
              id="country"
              name="country"
              className={`form-control ${formik.touched.country && formik.errors.country ? "is-invalid" : ""}`}
              value={formik.values.country}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.country && formik.errors.country && (
              <div className="invalid-feedback">{formik.errors.country}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              id="city"
              name="city"
              className={`form-control ${formik.touched.city && formik.errors.city ? "is-invalid" : ""}`}
              value={formik.values.city}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.city && formik.errors.city && (
              <div className="invalid-feedback">{formik.errors.city}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="street" className="form-label">Street</label>
            <input
              type="text"
              id="street"
              name="street"
              className={`form-control ${formik.touched.street && formik.errors.street ? "is-invalid" : ""}`}
              value={formik.values.street}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.street && formik.errors.street && (
              <div className="invalid-feedback">{formik.errors.street}</div>
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="houseNumber" className="form-label">House Number</label>
            <input
              type="text"
              id="houseNumber"
              name="houseNumber"
              className={`form-control ${formik.touched.houseNumber && formik.errors.houseNumber ? "is-invalid" : ""}`}
              value={formik.values.houseNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.houseNumber && formik.errors.houseNumber && (
              <div className="invalid-feedback">{formik.errors.houseNumber}</div>
            )}
          </div>

          <div className="col-md-6 mb-3">
            <label htmlFor="zipCode" className="form-label">Zip Code</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              className={`form-control ${formik.touched.zipCode && formik.errors.zipCode ? "is-invalid" : ""}`}
              value={formik.values.zipCode}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.zipCode && formik.errors.zipCode && (
              <div className="invalid-feedback">{formik.errors.zipCode}</div>
            )}
          </div>
        </div>

        <div className="form-check mb-3">
          <input
            type="checkbox"
            id="isBusiness"
            name="isBusiness"
            className="form-check-input"
            checked={formik.values.isBusiness}
            onChange={formik.handleChange}
          />
          <label htmlFor="isBusiness" className="form-check-label">Sign up as a Business</label>
        </div>

        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;
