'use client'

import { ErrorMessage, Field, Form, Formik, FormikProps } from 'formik'
import { useState } from 'react'
import { toast } from 'react-toastify'
import SelectDate from './selectDate';
import RichTextEditor from './textEditor';
import { FormValueJob } from '@/types/form';
import { jobSchema } from '@/libs/formSchemas';
import axios from '@/helpers/axios'
import { toastErrAxios } from '@/helpers/toast'
import SelectProvince from './selectProvince'
import SelectCity from './selectCity'
import SelectCategory from './selectCategory'
import SelectWage from './selectWage'
import { BannerUploader } from './bannerUploader'

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
    tags: '',
  }
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [provinceId, setProvinceId] = useState<string>('')

  const handleAdd = async (job: FormValueJob) => {
    try {
      SetIsLoading(true)
      const formData = new FormData()
      for (const key in job) {
        let value = job[key as keyof FormValueJob]
        if (key.includes('endDate')) value = `${value}T00:00:00Z`
        if (value) {
          formData.append(key, value)
        }
      }
      const { data } = await axios.post('/jobs', formData)
      toast.success(data.message)
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
        validationSchema={jobSchema}
        onSubmit={(values, action) => {
          action.resetForm()
          handleAdd(values)
        }}
      >
        {(props: FormikProps<FormValueJob>) => {
          const { handleChange, values, errors } = props
          let imageUrl: string | null | File = values.banner
          if (imageUrl instanceof File) {
            imageUrl = URL.createObjectURL(imageUrl)
          }
          return (
            <Form className='flex flex-col gap-4 mt-4'>
              <div className='overflow-hidden aspect-[16/9]'>
                <BannerUploader name="banner" formik={props} value={imageUrl} />
              </div>
              <div className={`${errors.banner && 'hidden'} text-xs ml-2 text-blue-400`}>Optional</div>
              <ErrorMessage name='banner'>{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
              <h1 className='text-xl sm:text-3xl font-medium'>Classify your demanded role</h1>
              <div className='flex flex-col gap-6 pb-4'>
                <div className='flex flex-col'>
                  <label htmlFor='title' className='text-normal sm:text-xl font-medium mb-2 w-fit'>Title</label>
                  <Field
                    type='text'
                    name='title'
                    id='title'
                    onChange={handleChange}
                    value={values.title}
                    placeholder='Enter job title'
                    className='outline-none p-2 border bg-white'
                  />
                  <ErrorMessage name="name" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor='role' className='text-normal sm:text-xl font-medium mb-2 w-fit'>Role</label>
                  <Field
                    type='text'
                    name='role'
                    id='role'
                    onChange={handleChange}
                    value={values.role}
                    placeholder='Enter job role'
                    className='outline-none p-2 border bg-white'
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
                <div className='flex flex-col'>
                  <label htmlFor='title' className='text-normal sm:text-xl font-medium mb-2 w-fit'>Tags</label>
                  <Field
                    type='text'
                    name='tags'
                    id='tags'
                    onChange={handleChange}
                    value={values.tags}
                    placeholder='Enter job tags, seprated with ","'
                    className='outline-none p-2 border bg-white'
                  />
                  <ErrorMessage name="tags" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
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