import { FormValuePreselection } from "@/types/form";
import * as Yup from "yup";

export const preselectionSchema = Yup.object().shape({
  title: Yup.string().required("Test title is required"),
  description: Yup.string().required("Enter test description"),
  preselectionQuestions: Yup.array()
    .of(
      Yup.object()
        .shape({
          question: Yup.string().required("Enter the question"),
          options: Yup.array().of(
            Yup.string().required("Enter the answer options"),
          ),
          correctAnswer: Yup.number().required("Select the correct answer"),
        })
        .required("Preselection test question are required"),
    )
    .test(
      "min-length",
      "Minimum 5 questions required",
      (value) => Array.isArray(value) && value.length >= 5,
    ),
});

export const preselectionInitialValue: FormValuePreselection = {
  title: "",
  description: "",
  preselectionQuestions: [
    { question: "", options: [""], correctAnswer: null },
    { question: "", options: [""], correctAnswer: null },
    { question: "", options: [""], correctAnswer: null },
    { question: "", options: [""], correctAnswer: null },
    { question: "", options: [""], correctAnswer: null },
  ],
};
