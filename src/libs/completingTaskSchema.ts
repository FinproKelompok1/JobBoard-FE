import { FormValueCompletingTask } from "@/types/form";
import * as Yup from "yup";

export const completingTaskSchema = Yup.object().shape({
  answer: Yup.array().of(
    Yup.object().shape({
      id: Yup.number().required(),
      correctAnswer: Yup.number().required("You have to answer this question"),
      selectedOption: Yup.number().required(),
    }),
  ),
});

export const completingTaskInitialValue: FormValueCompletingTask = {
  answer: [],
};
