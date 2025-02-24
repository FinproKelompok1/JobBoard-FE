import { FormValueJob } from "@/types/form";
import * as Yup from "yup";

export const jobSchema = Yup.object().shape({
  title: Yup.string().required("Job title is required"),
  role: Yup.string().required("Job role is required"),
  banner: Yup.mixed()
    .test(
      "filesize",
      "the image is too large",
      (value) =>
        !value || (value instanceof File && value.size <= 2 * 1024 * 1024),
    )
    .test(
      "fileExtension",
      "The extension is not proper",
      (value) =>
        !value ||
        (value instanceof File &&
          ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
            value.type,
          )),
    )
    .nullable(),
  endDate: Yup.date().required("Deadline is required"),
  province: Yup.string().required("Province is required"),
  city: Yup.string().required("Name of city is required"),
  salary: Yup.string(),
  category: Yup.string()
    .oneOf([
      "accountancy",
      "sales",
      "marketing",
      "engineering",
      "construction",
      "tourism",
      "administration",
      "manufacture",
      "informatics",
    ])
    .required("Category is required"),
  description: Yup.string().required("Enter your job detail"),
  tags: Yup.string().required("Tags is required"),
});

export const jobInitialValue: FormValueJob = {
  title: "",
  role: "",
  banner: null,
  endDate: "",
  province: "",
  salary: "",
  city: "",
  category: "",
  description: "<h1>Requirements</h1><br/><h1>Responsibilities</h1>",
  tags: "",
};
