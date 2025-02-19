import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  isCompany: Yup.boolean(),
  username: Yup.string().notRequired(),
  companyName: Yup.string().notRequired(),
  phone: Yup.string().notRequired(),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms and conditions")
    .required("You must accept the terms and conditions"),
});
