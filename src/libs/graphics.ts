import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getDemography(url: string) {
  try {
    const { data } = await axios.get(url);
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}
