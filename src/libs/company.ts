import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";
import { createQueryString } from "@/helpers/createQuery";

export interface Company {
  id: number;
  companyName: string;
  email: string;
  description: string;
  logo: string | null;
  isVerified: boolean;
  jobCount: number;
  createdAt: string;
  Job: Array<{
    id: number;
    title: string;
    location: {
      city: string;
      province: string;
    };
  }>;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
}

export interface CompaniesResponse {
  data: Company[];
  meta: PaginationMeta;
}

export const getCompanies = async (
  page: number = 1,
  limit: number = 2,
): Promise<CompaniesResponse> => {
  try {
    const queryParams =
      createQueryString("page", page.toString()) +
      "&" +
      createQueryString("limit", limit.toString());
    const response = await axios.get(`/companies?${queryParams}`);
    console.log("Companies API Response:", response.data);

    if (!response.data.meta && Array.isArray(response.data)) {
      return {
        data: response.data,
        meta: {
          page: 1,
          limit: response.data.length,
          totalItems: response.data.length,
          totalPages: 1,
        },
      };
    }

    return response.data;
  } catch (err) {
    console.error("Error fetching companies:", err);
    toastErrAxios(err);

    return {
      data: [],
      meta: {
        page: page,
        limit: limit,
        totalItems: 0,
        totalPages: 0,
      },
    };
  }
};

export const getAllCompanies = async (): Promise<Company[]> => {
  try {
    const response = await axios.get("/companies");
    return Array.isArray(response.data)
      ? response.data
      : response.data.data
        ? response.data.data
        : [];
  } catch (err) {
    console.error("Error fetching all companies:", err);
    toastErrAxios(err);
    return [];
  }
};

export const getCompanyDetail = async (id: string) => {
  try {
    console.log("Fetching company details for ID:", id);
    const response = await axios.get(`/companies/${id}`);
    console.log("Raw API Response:", response.data);
    console.log("Company details response:", response.data);
    return response.data;
  } catch (err) {
    console.error("Error fetching company details:", err);
    toastErrAxios(err);
    throw err;
  }
};
