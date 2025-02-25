import axios from "@/helpers/axios"
import { toastErrAxios } from "@/helpers/toast"
import UseOpen from "@/hooks/useOpen"
import { jobSchema } from "@/libs/jobSchemas"
import { FormValueJob } from "@/types/form"
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik"
import { useEffect, useState } from "react"
import { FaPencilAlt } from "react-icons/fa"
import { IoMdClose } from "react-icons/io"
import { toast } from "react-toastify"
import { BannerUploader } from "../createJob/bannerUploader"
import SelectProvince from "../createJob/selectProvince"
import SelectCity from "../createJob/selectCity"
import SelectCategory from "../createJob/selectCategory"
import SelectWage from "../createJob/selectWage"
import SelectDate from "../createJob/selectDate"
import RichTextEditor from "../createJob/textEditor"
import { IJob } from "@/types/jobs"
import { mutate } from "swr"
import { sweetAlertWarning } from "@/helpers/sweetAlert"

export default function EditJob({ job }: { job: IJob }) {
  const { open, hidden, menuHandler } = UseOpen()
  const [isLoading, SetIsLoading] = useState<boolean>(false);
  const [provinceId, setProvinceId] = useState<string>('')

  const initialValue: FormValueJob = {
    title: job.title,
    role: job.role,
    banner: job.banner,
    endDate: job.endDate.split('T')[0],
    province: job.location.province,
    salary: String(job.salary),
    city: job.location.city,
    category: job.category,
    description: job.description,
    tags: job.tags.join(','),
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open])

  const handleUpdate = async (values: FormValueJob) => {
    const { isConfirmed } = await sweetAlertWarning("You are able to revert by editing it back", "Confirm!")
    if (!isConfirmed) return
    try {
      SetIsLoading(true)
      const formData = new FormData()
      for (const key in values) {
        if (values[key as keyof FormValueJob] instanceof File) {
          formData.append(key, values[key as keyof FormValueJob]!)
        } else {
          let newValue = values[key as keyof FormValueJob]
          let oldValue = initialValue[key as keyof FormValueJob]
          if (key.includes('endDate')) {
            newValue = `${newValue}T00:00:00Z`
            oldValue = `${oldValue}T00:00:00Z`
          }
          if (newValue !== oldValue) {
            formData.append(key, newValue!)
          }
        }
      }
      const { data } = await axios.patch(`/jobs/${job.id}`, formData)
      toast.success(data.message)
      mutate((key: string) => key.startsWith(`/jobs`));
    } catch (err: unknown) {
      toastErrAxios(err)
    } finally {
      SetIsLoading(false)
    }
  }

  return (
    <>
      <button type="button" onClick={menuHandler}><FaPencilAlt className="text-lightBlue" /></button>
      <div className={`fixed ${hidden ? '' : 'hidden'} overflow-y-scroll z-40 inset-0 bg-[rgba(0,0,0,0.5)]`} />
      <div className={`${open ? 'scale-100' : 'scale-0'} h-[80vh] overflow-y-scroll w-full sm:w-[75%] xl:w-[50%] py-5 px-6 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 transition duration-300 bg-white z-50 ${hidden ? '' : 'hidden'}`}>
        <button type="button" onClick={menuHandler} className="w-fit text-[1.5rem] hover:text-red-500 mb-6"><IoMdClose /></button>
        <Formik
          initialValues={initialValue}
          validationSchema={jobSchema}
          enableReinitialize={true}
          onSubmit={(values) => {
            handleUpdate(values)
          }}
        >
          {(props: FormikProps<FormValueJob>) => {
            const { handleChange, values, errors, dirty } = props
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
                      className='outline-none p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blueNavy'
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
                      className='outline-none p-2 border bg-white rounded-lg focus:ring-2 focus:ring-blueNavy'
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
                  <button disabled={isLoading || !dirty} type='submit' className={`${isLoading || !dirty ? 'disabled:opacity-[0.5] disabled:bg-lightBlue text-white' : 'hover:opacity-90'} rounded-lg py-2 px-4 transition ease-linear font-semibold text-white bg-lightBlue self-end`}>
                    {isLoading ? 'Loading ...' : !dirty ? "You haven't made change yet" : 'Edit'}
                  </button>
                </div>
              </Form>
            )
          }}
        </Formik>
      </div>
    </>
  )
}