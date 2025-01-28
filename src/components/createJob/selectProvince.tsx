import { ErrorMessage, Field, FormikProps } from "formik";
import React, { useEffect, useState } from "react";
import { FormValueJob } from "@/types/form";
import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

interface IProvince {
  id: string
  name: string
}

interface IProps {
  formikProps: FormikProps<FormValueJob>
  setProvinceId: (key: string) => void
}

export default function SetLocation({ formikProps, setProvinceId }: IProps) {
  const [province, setProvince] = useState<IProvince[]>([])

  useEffect(() => {
    const getProvince = async () => {
      try {
        const { data } = await axios.get('https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/provinces.json')
        setProvince(data)
      } catch (err) {
        toastErrAxios(err)
      }
    }
    getProvince()
  }, [])
  return (
    <>
      <Field
        as="select"
        name='province'
        id='province'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          formikProps.handleChange(e)
          const selectedProvince = province.find((item) => item.name === e.target.value)
          if (selectedProvince) setProvinceId(selectedProvince.id)
        }}
        value={formikProps.values.province}
        className='outline-none px-2 cursor-pointer appearance-none border py-2'
      >
        <option value={''} disabled className='text-black/50'>
          Select Province
        </option>
        {province.map((item) => (
          <option key={item.id} value={item.name} onClick={() => setProvinceId(item.id)}>
            {item.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="province" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
    </>
  )
}