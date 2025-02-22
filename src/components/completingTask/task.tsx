'use client'

import { IPreselectionQuestion } from "@/types/preselection"
import { Form, Formik, FormikProps } from "formik"
import { FormValueCompletingTask } from "@/types/form"
import { completingTaskInitialValue, completingTaskSchema } from "@/libs/completingTaskSchema"
import { useState } from "react"
import { toast } from "react-toastify"
import { toastErrAxios } from "@/helpers/toast"
import axios from "@/helpers/axios"
import { useParams, useRouter } from "next/navigation"
import { BsQuestionSquareFill } from "react-icons/bs"
import Options from "./options"

export default function Task({ data }: { data: IPreselectionQuestion[] }) {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const { id: jobId } = useParams()
  const router = useRouter()

  const handleAdd = async (answer: FormValueCompletingTask) => {
    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('token='))
        ?.split('=')[1];

      if (!token) {
        toast.error('Session expired. Please login again');
        router.push('/auth/login');
        return;
      }
      SetIsLoading(true)
      const { data } = await axios.post(`/preselection/questions/${jobId}`, answer, {
        headers: { Authorization: `Bearer ${token}` }
      })
      toast.success(data.message)
      router.push("/jobs")
    } catch (err: unknown) {
      toastErrAxios(err)
    } finally {
      SetIsLoading(false)
    }
  }

  return (
    <Formik
      initialValues={completingTaskInitialValue}
      validationSchema={completingTaskSchema}
      onSubmit={(values) => {
        handleAdd(values)
      }}
    >
      {(props: FormikProps<FormValueCompletingTask>) => {
        return (
          <Form>
            {data.map((item, idx) => {
              return (
                <div className="mb-4 tablet:mt-4 border border-black py-4 px-6">
                  <div className="flex gap-2 items-center mb-2">
                    <BsQuestionSquareFill />
                    <h3 className="font-medium">Question {idx + 1}</h3>
                  </div>
                  <p className="bg-grey p-4 mb-2">{item.question}</p>
                  <Options
                    options={item.options}
                    questionIdx={item.id}
                    correctAnswer={item.correctAnswer}
                    formikProps={props}
                  />
                </div>
              )
            })}
            < button
              disabled={isLoading}
              type='submit'
              className={`${isLoading ? 'disabled:opacity-[0.5] disabled:bg-lightBlue text-white' : 'hover:opacity-90'} py-2 px-4 mb-4 transition ease-linear font-semibold text-white bg-lightBlue self-end`}
            >
              {isLoading ? 'Loading ...' : 'SUBMIT TEST'}
            </button>
          </Form>
        )
      }}
    </Formik >
  )
}