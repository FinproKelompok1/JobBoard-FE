import * as Yup from "yup";

export const completingTaskSchema = Yup.object().shape({
  answer: Yup.array()
    .of(
      Yup.object().shape({
        id: Yup.number().required(),
        correctAnswer: Yup.number().required(
          "You have to answer this question",
        ),
        selectedOption: Yup.number().required("You have to select an option"),
      }),
    )
    .test(
      "all-answered",
      "You must answer all questions",
      (answers) =>
        answers && answers.every((a) => a.selectedOption !== null),
    ),
});
