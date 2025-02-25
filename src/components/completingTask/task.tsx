'use client'

import { IPreselectionQuestion } from "@/types/preselection";
import { Form, Formik, FormikProps } from "formik";
import { FormValueCompletingTask } from "@/types/form";
import { completingTaskInitialValue, completingTaskSchema } from "@/libs/completingTaskSchema";
import { useState } from "react";
import { toast } from "react-toastify";
import { toastErrAxios } from "@/helpers/toast";
import axios from "@/helpers/axios";
import { useParams, useRouter } from "next/navigation";
import { BsQuestionSquareFill } from "react-icons/bs";
import Options from "./options";
import { getToken } from "@/libs/token";

export default function Task({ data }: { data: IPreselectionQuestion[] }) {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const { id: jobId } = useParams();
  const router = useRouter();

  const handleAdd = async (answer: FormValueCompletingTask) => {
    try {
      const token = getToken();
      SetIsLoading(true);
      const { data } = await axios.post(`/preselection/questions/${jobId}`, answer, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success(data.message);
      router.push("/jobs");
    } catch (err: unknown) {
      toastErrAxios(err);
    } finally {
      SetIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <Formik
        initialValues={completingTaskInitialValue}
        validationSchema={completingTaskSchema}
        onSubmit={(values) => {
          handleAdd(values);
        }}
      >
        {(props: FormikProps<FormValueCompletingTask>) => {
          return (
            <Form className="space-y-6">
              {data.map((item, idx) => {
                return (
                  <div key={item.id} className="mb-6 p-6 border border-gray-300 rounded-lg bg-gray-50">
                    <div className="flex gap-3 items-center mb-3">
                      <BsQuestionSquareFill className="text-blue-500 text-xl" />
                      <h3 className="font-semibold text-lg text-gray-800">Question {idx + 1}</h3>
                    </div>
                    <p className="bg-gray-100 p-4 rounded-md text-gray-700">{item.question}</p>
                    <Options
                      options={item.options}
                      questionIdx={item.id}
                      correctAnswer={item.correctAnswer}
                      formikProps={props}
                    />
                  </div>
                );
              })}
              <button
                disabled={isLoading}
                type="submit"
                className={`w-full py-3 text-center font-semibold text-white rounded-lg transition-all ease-in-out ${isLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
              >
                {isLoading ? 'Loading ...' : 'SUBMIT TEST'}
              </button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
}
