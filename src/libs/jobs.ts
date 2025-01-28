import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getJobs() {
  try {
    const { data } = await axios.get("/jobs");
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}
