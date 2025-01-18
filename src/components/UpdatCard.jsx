import React from "react";
import { useFormik } from "formik";
import { addCardVal } from "../validation/addCardval";
import { updateCard, createCard } from "../services/CardsService";

function UpdateCard({ onHide, requestRender, initialCard }) {
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
      <h2 className="text-center mb-4">
        {initialCard ? "Edit Card" : "Create Card"}
      </h2>
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          {[
            { name: "Title", label: "Title" },
            { name: "Subtitle", label: "Subtitle" },
            { name: "Description", label: "Description" },
            { name: "Email", label: "Email", type: "email" },
            { name: "Phone", label: "Phone", type: "tel" },
            { name: "Web", label: "Website", type: "url" },
            { name: "ImageUrl", label: "Image URL" },
            { name: "ImageAlt", label: "Image Alt Text" },
            { name: "State", label: "State" },
            { name: "Country", label: "Country" },
            { name: "City", label: "City" },
            { name: "Street", label: "Street" },
            { name: "Housenumber", label: "House Number" },
            { name: "Zip", label: "Zip Code" },
          ].map((field) => (
            <div className="col-md-6 mb-3" key={field.name}>
              <label htmlFor={field.name} className="form-label">
                {field.label}
              </label>
              <input
                type={field.type || "text"}
                id={field.name}
                name={field.name}
                className={`form-control ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "is-invalid"
                    : ""
                }`}
                value={formik.values[field.name]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched[field.name] && formik.errors[field.name] && (
                <div className="invalid-feedback">
                  {formik.errors[field.name]}
                </div>
              )}
            </div>
          ))}
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

export default UpdateCard;
