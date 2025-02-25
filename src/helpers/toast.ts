import { toast } from "react-toastify";
import axios from "axios";

interface VerifyResponse {
  message: string;
}

export const toastErrAxios = (err: unknown) => {
  if (axios.isAxiosError(err) && err.response?.data) {
    toast.error(err.message);
    const errorData = err.response.data as VerifyResponse;
    toast.error(errorData.message);
  } else {
    toast.error("An unexpected error occurred");
  }
};
