import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getJobs(url: string, token: string) {
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.result;
  } catch (err) {
    toastErrAxios(err);
    return [];
  }
}

export async function getTotalJobs(url: string, token: string) {
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}

export async function getJobDetail(jobId: string) {
  try {
    const { data } = await axios.get(`/jobs/${jobId}`);
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}
