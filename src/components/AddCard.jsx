import React from "react";
import { useFormik } from "formik";
import { addCardVal } from "../validation/addCardval";
import { createCard } from "../services/CardsService";

function AddCard({ onHide, requestRender }) {
  const formik = useFormik({
    initialValues: {
      Title: "",
      Subtitle: "",
      Description: "",
      Email: "",
      Phone: "",
      Web: "",
      ImageUrl: "",
      ImageAlt: "",
      State: "",
      Country: "",
      City: "",
      Street: "",
      Housenumber: "",
      Zip: "",
      ownerId:"",
    },
    validationSchema: addCardVal,
    onSubmit: (values) => {
      createCard(values)
        .then(() => {
          onHide();
          requestRender();
          alert(`${values.Title} was added successfully`);
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="container mt-5 p-4 rounded shadow-lg bg-light">
      <h2 className="text-center mb-4">Add New Card</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* Title */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <label htmlFor="Title" className="form-label">
              Title
            </label>
            <input
              type="text"
              id="Title"
              name="Title"
              className={`form-control ${formik.touched.Title && formik.errors.Title ? "is-invalid" : ""}`}
              value={formik.values.Title}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Title && formik.errors.Title && (
              <div className="invalid-feedback">{formik.errors.Title}</div>
            )}
          </div>
          {/* Subtitle */}
          <div className="col-md-6 mb-3">
            <label htmlFor="Subtitle" className="form-label">
              Subtitle
            </label>
            <input
              type="text"
              id="Subtitle"
              name="Subtitle"
              className={`form-control ${formik.touched.Subtitle && formik.errors.Subtitle ? "is-invalid" : ""}`}
              value={formik.values.Subtitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Subtitle && formik.errors.Subtitle && (
              <div className="invalid-feedback">{formik.errors.Subtitle}</div>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            id="Description"
            name="Description"
            rows="4"
            className={`form-control ${formik.touched.Description && formik.errors.Description ? "is-invalid" : ""}`}
            value={formik.values.Description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.Description && formik.errors.Description && (
            <div className="invalid-feedback">{formik.errors.Description}</div>
          )}
        </div>

        {/* Email, Phone, and Web */}
        <div className="row">
          <div className="col-md-4 mb-3">
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="Email"
              name="Email"
              className={`form-control ${formik.touched.Email && formik.errors.Email ? "is-invalid" : ""}`}
              value={formik.values.Email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Email && formik.errors.Email && (
              <div className="invalid-feedback">{formik.errors.Email}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="Phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              id="Phone"
              name="Phone"
              className={`form-control ${formik.touched.Phone && formik.errors.Phone ? "is-invalid" : ""}`}
              value={formik.values.Phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Phone && formik.errors.Phone && (
              <div className="invalid-feedback">{formik.errors.Phone}</div>
            )}
          </div>

          <div className="col-md-4 mb-3">
            <label htmlFor="Web" className="form-label">
              Website
            </label>
            <input
              type="url"
              id="Web"
              name="Web"
              className={`form-control ${formik.touched.Web && formik.errors.Web ? "is-invalid" : ""}`}
              value={formik.values.Web}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.touched.Web && formik.errors.Web && (
              <div className="invalid-feedback">{formik.errors.Web}</div>
            )}
          </div>
        </div>

        {/* Remaining fields dynamically */}
        <div className="row">
          {[
            "ImageUrl",
            "ImageAlt",
            "State",
            "Country",
            "City",
            "Street",
            "Housenumber",
            "Zip",
          ].map((field, index) => (
            <div className="col-md-6 mb-3" key={index}>
              <label htmlFor={field} className="form-label">
                {field}
              </label>
              <input
                type="text"
                id={field}
                name={field}
                className={`form-control ${formik.touched[field] && formik.errors[field] ? "is-invalid" : ""}`}
                value={formik.values[field]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[field] && formik.errors[field] && (
                <div className="invalid-feedback">{formik.errors[field]}</div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success mt-4 px-5">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCard;
