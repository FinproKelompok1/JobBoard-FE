import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getJobs(url: string) {
  try {
    const { data } = await axios.get(url);
    return data.result;
  } catch (err) {
    toastErrAxios(err);
    return [];
  }
}

export async function getJobId(jobId: string) {
  try {
    const { data } = await axios.get(`/jobs/${jobId}`)
    return data.result
  } catch (err) {
    toastErrAxios(err);
    return null;
  }
}

export async function getTotalJobs(url: string) {
  try {
    const { data } = await axios.get(url);
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}
