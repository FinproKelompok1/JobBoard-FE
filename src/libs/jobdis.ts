import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { Job } from "@/types/jobdis";

interface DiscoveryParams {
  searchTerm?: string;
  city?: string;
  province?: string;
  category?: string;
}

export async function discoverJobs(params?: DiscoveryParams): Promise<Job[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.searchTerm) queryParams.append("search", params.searchTerm);
    if (params?.city) queryParams.append("city", params.city);
    if (params?.province) queryParams.append("province", params.province);
    if (params?.category) queryParams.append("category", params.category);

    const url = `/discover${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;
    console.log("Calling API:", url);

    const response = await axios.get(url);
    return response.data.result || [];
  } catch (err) {
    console.error("API Error:", err);
    toastErrAxios(err);
    return [];
  }
}

export async function getJobDetail(jobId: string): Promise<Job | null> {
  try {
    const response = await axios.get(`/discover/${jobId}`);
    return response.data.result;
  } catch (err) {
    console.error("API Error:", err);
    toastErrAxios(err);
    return null;
  }
}

export async function getRelatedJobs(jobId: string): Promise<Job[]> {
  try {
    const url = `/discover/${jobId}/related`;
    const response = await axios.get(url);
    return response.data.result || [];
  } catch (err) {
    console.error("API Error:", err);
    toastErrAxios(err);
    return [];
  }
}

export const applyJob = async (
  jobId: string,
  formData: FormData,
  token: string,
) => {
  try {
    console.log("Submitting application:", {
      jobId,
      formData: Object.fromEntries(formData.entries()),
    });

    const response = await axios.post(`/apply/submit/${jobId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error: any) {
    console.error("Application submission error:", error);
    throw error;
  }
};

export const getUserApplications = async () => {
  try {
    const response = await axios.get("/apply/submitted");
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    throw error;
  }
};

export const getJobApplications = async (jobId: string) => {
  try {
    const response = await axios.get(`/apply/job/${jobId}`);
    return response.data;
  } catch (error) {
    toastErrAxios(error);
    throw error;
  }
};

export const checkUserApplication = async (jobId: string) => {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    if (!token) return false;

    const response = await axios.post(`/apply/check/${jobId}`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.hasApplied;
  } catch (error) {
    console.error("Error checking application:", error);
    return false;
  }
};
