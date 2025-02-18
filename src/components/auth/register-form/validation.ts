import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  username: Yup.string().when("isCompany", {
    is: false,
    then: (schema) =>
      schema
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .matches(
          /^[a-zA-Z0-9_]+$/,
          "Username can only contain letters, numbers, and underscores"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .max(20, "Password cannot exceed 20 characters")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one digit")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character (@, $, !, %, *, ?, &, #)"
    )
    .required("Password is required"),
  companyName: Yup.string().when("isCompany", {
    is: true,
    then: (schema) =>
      schema
        .required("Company Name is required")
        .min(3, "Company Name must be at least 3 characters")
        .max(50, "Company Name cannot exceed 50 characters"),
    otherwise: (schema) => schema.notRequired(),
  }),
  phone: Yup.string().when("isCompany", {
    is: true,
    then: (schema) =>
      schema
        .required("Phone number is required")
        .matches(
          /^[0-9]{10,15}$/,
          "Phone number must be between 10 and 15 digits and contain only numbers"
        ),
    otherwise: (schema) => schema.notRequired(),
  }),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});