import React from "react";
import { useFormik } from "formik";
import { addCardVal } from "../validation/addCardval";
import { updateCard, createCard } from "../services/CardsService";

function UpdateCard({ onHide, requestRender, initialCard }) {
  const formik = useFormik({
    initialValues: initialCard || {
      title: "",
      subtitle: "",
      description: "",
      email: "",
      phone: "",
      web: "",
      url: "",
      alt: "",
      state: "",
      country: "",
      city: "",
      street: "",
      houseNumber: "",
      zip: ""
      
      
    },
    
      onSubmit: (values) => {
      if (values.id) {
        const card = {
          title: values.title,
          subtitle: values.subtitle,
          description: values.description,
          email: values.email,
          phone: values.phone,
          web: values.web,
          image:{
            url: values.url,
            alt: values.alt,
          },
          address:{
            state: values.state,
            country: values.country,
            city: values.city,
            street: values.street,
            houseNumber: values.houseNumber,
            zip: values.zip  
          }
                            
        }  
        updateCard(card,values.id)
          .then(() => {
            onHide();
            requestRender();
            alert(`${values.Title} was updated successfully`);
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
            { name: "title", label: "Title" },
            { name: "subtitle", label: "Subtitle" },
            { name: "description", label: "Description" },
            { name: "email", label: "Email", type: "email" },
            { name: "phone", label: "Phone", type: "tel" },
            { name: "web", label: "Website", type: "url" },
            { name: "url", label: "Image URL" },
            { name: "alt", label: "Image Alt Text" },
            { name: "state", label: "State" },
            { name: "country", label: "Country" },
            { name: "city", label: "City" },
            { name: "street", label: "Street" },
            { name: "houseNumber", label: "House Number" },
            { name: "zip", label: "Zip Code" },
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
          <button type="submit"  className="btn btn-success mt-4 px-5">
            {initialCard ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateCard;
