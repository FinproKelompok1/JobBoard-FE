'use client'

import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { FormValuePreselection } from '@/types/form';
import { toastErrAxios } from '@/helpers/toast'
import { preselectionInitialValue, preselectionSchema } from '@/libs/preselectionSchema';
import CreateQuestion from './createQuestion';
import axios from '@/helpers/axios';
import { toast } from 'react-toastify';
import { useParams, useRouter } from 'next/navigation';

export default function CreateSelectionTest() {
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const { jobId } = useParams()
  const router = useRouter()

  const handleAdd = async (preselection: FormValuePreselection) => {
    try {
      SetIsLoading(true)
      const { data } = await axios.post("/preselection", { ...preselection, jobId })
      toast.success(data.message)
      router.push("/admin/job")
    } catch (err: unknown) {
      toastErrAxios(err)
    } finally {
      SetIsLoading(false)
    }
  }

  return (
    <div className='max-w-[940px] xl:mx-auto mx-4 py-4'>
      <h1 className='text-2xl font-medium mb-6'>Create Preselection Test</h1>
      <Formik
        initialValues={preselectionInitialValue}
        validationSchema={preselectionSchema}
        onSubmit={(values, action) => {
          // action.resetForm()
          console.log(values)
          handleAdd(values)
        }}
      >
        {(props: FormikProps<FormValuePreselection>) => {
          const { handleChange, values, errors } = props
          return (
            <Form className='flex flex-col gap-4 mt-4'>
              <div className='flex flex-col gap-6 pb-4'>
                <div className='flex flex-col'>
                  <label htmlFor='title' className='font-medium mb-1 w-fit'>Title</label>
                  <Field
                    type='text'
                    name='title'
                    id='title'
                    onChange={handleChange}
                    value={values.title}
                    placeholder='Enter your title preselection test'
                    className='outline-none p-2 border bg-white'
                  />
                  <ErrorMessage name="title" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='description' className='font-medium mb-1 w-fit'>description</label>
                  <Field
                    as='textarea'
                    name='description'
                    id='description'
                    onChange={handleChange}
                    value={values.description}
                    placeholder='Enter preselection test description'
                    className='outline-none p-2 h-28 border bg-white'
                  />
                  <ErrorMessage name="description" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
                </div>
                <div className='flex flex-col'>
                  <CreateQuestion {...props} />
                  {errors.preselectionQuestions && typeof errors.preselectionQuestions === "string" && (
                    <div className="text-red-500 text-xs mt-1 ml-1">
                      <sup>*</sup>{errors.preselectionQuestions}
                    </div>
                  )}
                </div>
                <button disabled={isLoading} type='submit' className={`${isLoading ? 'disabled:opacity-[0.5] disabled:bg-lightBlue text-white' : 'hover:opacity-90'} py-2 px-4 transition ease-linear font-semibold text-white bg-lightBlue self-end`}>
                  {isLoading ? 'Loading ...' : 'Create preselection test'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}