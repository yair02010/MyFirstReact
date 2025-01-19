import * as Yup from "yup";

export const addCardVal = Yup.object({
  Title: Yup.string()
    .required("Title is required")
    .min(2, "Title must be at least 2 characters")
    .max(50, "Title must be at most 50 characters"),
  Subtitle: Yup.string()
    .required("Subtitle is required")
    .min(2, "Subtitle must be at least 2 characters")
    .max(50, "Subtitle must be at most 50 characters"),
  Description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters")
    .max(500, "Description must be at most 500 characters"),
  Email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  Phone: Yup.string()
    .required("Phone is required")
    .matches(/^\+?\d{1,14}$/, "Phone number must be valid"),
  Web: Yup.string()
    .required("Website is required"),
  ImageUrl: Yup.string()
    .required("Image URL is required"),
  ImageAlt: Yup.string()
    .required("Image Alt is required")
    .min(2, "Image Alt must be at least 2 characters")
    .max(100, "Image Alt must be at most 100 characters"),
  State: Yup.string()
    .required("State is required")
    .min(2, "State must be at least 2 characters")
    .max(50, "State must be at most 50 characters"),
  Country: Yup.string()
    .required("Country is required")
    .min(2, "Country must be at least 2 characters")
    .max(50, "Country must be at most 50 characters"),
  City: Yup.string()
    .required("City is required")
    .min(2, "City must be at least 2 characters")
    .max(50, "City must be at most 50 characters"),
  Street: Yup.string()
    .required("Street is required")
    .min(2, "Street must be at least 2 characters")
    .max(100, "Street must be at most 100 characters"),
  Housenumber: Yup.string()
    .required("House number is required")
    .matches(/^\d+$/, "House number must be numeric"),
  Zip: Yup.string()
    .required("Zip code is required")
    .matches(/^\d{5}$/, "Zip code must be 5 digits"),
});
