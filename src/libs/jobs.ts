import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getJobs(query: string, search: string) {
  try {
    const { data } = await axios.get(`/jobs?${query}&${search}`);
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}

export async function getTotalJobs() {
  try {
    const { data } = await axios.get("/jobs/total");
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}
