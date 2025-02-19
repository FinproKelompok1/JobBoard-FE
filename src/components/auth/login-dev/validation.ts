import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
  otp: Yup.string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
});
