import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { Job } from "@/types/jobdis";

interface DiscoveryParams {
  searchTerm?: string;
  city?: string;
  province?: string;
  category?: string;
}

interface AllJobsParams extends DiscoveryParams {
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
}

interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface JobsResponse {
  jobs: Job[];
  pagination: PaginationData;
}

export async function getAllJobs(
  params?: AllJobsParams,
): Promise<JobsResponse> {
  try {
    const queryParams = new URLSearchParams();

    if (params?.searchTerm) queryParams.append("search", params.searchTerm);
    if (params?.city) queryParams.append("city", params.city);
    if (params?.province) queryParams.append("province", params.province);
    if (params?.category) queryParams.append("category", params.category);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.sort) queryParams.append("sort", params.sort);
    if (params?.order) queryParams.append("order", params.order);

    const url = `/discover${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await axios.get(url);

    return {
      jobs: response.data.result || [],
      pagination: response.data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  } catch (error) {
    toastErrAxios(error);

    return {
      jobs: [],
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
        hasNextPage: false,
        hasPrevPage: false,
      },
    };
  }
}

export async function discoverJobs(params?: DiscoveryParams): Promise<Job[]> {
  try {
    const queryParams = new URLSearchParams();
    if (params?.searchTerm) queryParams.append("search", params.searchTerm);
    if (params?.city) queryParams.append("city", params.city);
    if (params?.province) queryParams.append("province", params.province);
    if (params?.category) queryParams.append("category", params.category);

    const url = `/discover${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await axios.get(url);
    return response.data.result || [];
  } catch (error) {
    toastErrAxios(error);
    return [];
  }
}

export async function getJobDetail(jobId: string): Promise<Job | null> {
  try {
    const response = await axios.get(`/discover/${jobId}`);
    return response.data.result;
  } catch (error) {
    toastErrAxios(error);
    return null;
  }
}

export async function getRelatedJobs(jobId: string): Promise<Job[]> {
  try {
    const url = `/discover/${jobId}/related`;
    const response = await axios.get(url);
    return response.data.result || [];
  } catch (error) {
    toastErrAxios(error);
    return [];
  }
}

export const applyJob = async (
  jobId: string,
  formData: FormData,
  token: string,
) => {
  try {
    const response = await axios.post(`/apply/submit/${jobId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    toastErrAxios(error);
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
    toastErrAxios(error);
    return false;
  }
};
