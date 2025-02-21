import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getPreselection(id: string) {
  try {
    const { data } = await axios.get(`/preselection/${id}`);
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
