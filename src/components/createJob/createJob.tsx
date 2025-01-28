'use client'

import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'
import SelectDate from './selectDate';
// import SelectTime from './selectTime';
// import { categories } from './data';
// import SetLocation from './setLocation';
import RichTextEditor from './textEditor';
// import { FieldThumbnail } from './imageUploader';
import { FormValueJob } from '@/types/form';
import { eventSchema } from '@/libs/formSchemas';
import axios from '@/helpers/axios'
import { toastErrAxios } from '@/helpers/toast'
import SelectProvince from './selectProvince'
import SelectCity from './selectCity'
import SelectCategory from './selectCategory'
import SelectWage from './selectWage'
import { FieldThumbnail } from './imageUploader'

export default function CreateJob() {
  const initialValue: FormValueJob = {
    title: '',
    role: '',
    banner: null,
    endDate: '',
    province: '',
    salary: '',
    city: '',
    category: '',
    description: '',
  }
  // const router = useRouter();
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [provinceId, setProvinceId] = useState<string>('')

  const handleAdd = async (job: FormValueJob) => {
    try {
      SetIsLoading(true)
      const formData = new FormData()
      for (const key in job) {
        let value = job[key as keyof FormValueJob]
        if (key.includes('date')) value = `${value}T00:00:00Z`
        if (value) {
          formData.append(key, value)
        }
      }
      console.table(formData.entries().map((item) => item))
      // const { data } = await axios.post('/events', formData, {
      //   headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      // })

      // router.push(`/create-event/${data.event_id}`)
      // toast.success(data.message)
    } catch (err: unknown) {
      toastErrAxios(err)
    } finally {
      SetIsLoading(false)
    }
  }

  return (
    <div className='max-w-[940px] xl:mx-auto mx-4'>
      <Formik
        initialValues={initialValue}
        validationSchema={eventSchema}
        onSubmit={(values, action) => {
          console.log(values)
          action.resetForm()
          handleAdd(values)
        }}
      >
        {(props: FormikProps<FormValueJob>) => {
          const { handleChange, values } = props
          return (
            <Form className='flex flex-col gap-4 mt-4'>
              <div className='overflow-hidden aspect-[16/9]'>
                <FieldThumbnail name="banner" formik={props} />
              </div>
              <ErrorMessage name='banner'>{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
              <h1 className='text-xl sm:text-3xl font-medium'>Classify your demanded role</h1>
              <div className='flex flex-col gap-6 pb-4'>
                <div className='flex flex-col'>
                  <label htmlFor='title' className='text-normal sm:text-xl font-medium mb-2 w-fit'>title</label>
                  <Field
                    type='text'
                    name='title'
                    id='title'
                    onChange={handleChange}
                    value={values.title}
                    placeholder='Enter job title'
                    className='outline-none p-2 border bg-white placeholder:text-black'
                  />
                  <ErrorMessage name="name" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='role' className='text-normal sm:text-xl font-medium mb-2 w-fit'>role</label>
                  <Field
                    type='text'
                    name='role'
                    id='role'
                    onChange={handleChange}
                    value={values.role}
                    placeholder='Enter job role'
                    className='outline-none p-2 border bg-white placeholder:text-black'
                  />
                  <ErrorMessage name="name" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='province' className='text-normal sm:text-xl font-medium mb-2 w-fit'>Location</label>
                  <div className='flex flex-col sm:flex-row justify-around gap-2'>
                    <div className='flex flex-col sm:flex-1'>
                      <SelectProvince formikProps={props} setProvinceId={setProvinceId} />
                    </div>
                    <div className={`sm:flex-1 flex flex-col ${!values.province && 'hidden'}`}>
                      <SelectCity formikProps={props} provinceId={provinceId} />
                    </div>
                  </div>
                </div>
                <div className='flex flex-col'>
                  <SelectCategory {...props} />
                </div>
                <div className='flex flex-col'>
                  <SelectWage {...props} />
                </div>
                <div className='flex flex-col'>
                  <SelectDate {...props} />
                </div>
                <div className='flex flex-col'>
                  <RichTextEditor setFieldValue={props.setFieldValue} values={values} name='description' />
                </div>
                <button disabled={isLoading} type='submit' className={`${isLoading ? 'disabled:opacity-[0.5] disabled:bg-lightBlue text-white' : 'hover:opacity-90'} py-2 px-4 transition ease-linear font-semibold text-white bg-lightBlue self-end`}>
                  {isLoading ? 'Loading ...' : 'Create Job'}
                </button>
              </div>
            </Form>
          )
        }}
      </Formik>
    </div>
  )
}