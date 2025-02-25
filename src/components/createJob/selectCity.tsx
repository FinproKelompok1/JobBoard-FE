import { ErrorMessage, Field, FormikProps } from "formik";
import { useEffect, useState } from "react";
import { FormValueJob } from "@/types/form";
import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

interface ICity {
  id: string
  province_id: string
  name: string
}

interface IProps {
  formikProps: FormikProps<FormValueJob>
  provinceId: string
}

export default function SelectCity({ formikProps, provinceId }: IProps) {
  const [city, setCity] = useState<ICity[]>([])

  useEffect(() => {
    if (!provinceId) return
    const getCity = async () => {
      try {
        const { data } = await axios.get(`https://muhammadwildansapoetro.github.io/api-wilayah-indonesia/api/regencies/${provinceId}.json`)
        setCity(data)
      } catch (err) {
        toastErrAxios(err)
      }
    }
    getCity()
  }, [provinceId])
  return (
    <>
      <Field
        as="select"
        name='city'
        id='city'
        onChange={formikProps.handleChange}
        value={formikProps.values.city}
        className='outline-none px-2 cursor-pointer appearance-none border py-2 rounded-lg focus:ring-2 focus:ring-blueNavy'
      >
        <option value={''} disabled className='text-black/50'>
          Select City
        </option>
        {city.map((item) => (
          <option key={item.id} value={item.name}>
            {item.name}
          </option>
        ))}
      </Field>
      <ErrorMessage name="city" >{msg => <div className='text-red-500 text-xs mt-1 ml-1'><sup>*</sup>{msg}</div>}</ErrorMessage>
    </>
  )
}