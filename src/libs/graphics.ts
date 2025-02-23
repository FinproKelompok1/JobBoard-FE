import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

export async function getDemography(url: string, token: string) {
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}

export async function getSalaryTrend(url: string, token: string) {
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}

export async function getApplicantsInterest(url: string, token: string) {
  try {
    const { data } = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data.result;
  } catch (err) {
    toastErrAxios(err);
  }
}
