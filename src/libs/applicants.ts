import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getApplicants(url: string) {
  try {
    const {data} = await axios.get(url)
    return data.result
  } catch (err) {
    toastErrAxios(err)
    return 0
  }
}

export async function getTotalApplicants(url: string) {
  try {
    const {data} = await axios.get(url)
    return data.result
  } catch (err) {
    toastErrAxios(err)
    return 0
  }
}