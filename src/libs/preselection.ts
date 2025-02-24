import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getPreselection(url: string) {
  try {
    const { data } = await axios.get(url);
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}

export async function getPreselectionQuestions(id: string) {
  try {
    const { data } = await axios.get(`/preselection/questions/${id}`);
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}
