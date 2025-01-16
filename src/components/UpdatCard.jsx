import React from "react";
import { useFormik } from "formik";
import { addCardVal } from "../validation/addCardval";
import { updateCard, createCard } from "../services/CardsService";

function UpdatCard({ onHide, requestRender, initialCard }) {
  const formik = useFormik({
    initialValues: initialCard || {
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
        },
    validationSchema: addCardVal,
    onSubmit: (values) => {
      if (values.id) {
        updateCard(values)
          .then(() => {
            onHide();
            requestRender();
            alert(`${values.Title} was updated successfully`);
          })
          .catch((err) => console.log(err));
      } else {
        createCard(values)
          .then(() => {
            onHide();
            requestRender();
            alert(`${values.Title} was created successfully`);
          })
          .catch((err) => console.log(err));
      }
    },
  });

  return (
    <div className="container mt-5 p-4 rounded shadow-lg bg-light">
      <h2 className="text-center mb-4">{initialCard ? "Edit Card" : "Create Card"}</h2>
      <form onSubmit={formik.handleSubmit}>
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
        </div>

        <div className="text-center">
          <button type="submit" className="btn btn-success mt-4 px-5">
            {initialCard ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdatCard;
