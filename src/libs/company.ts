import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

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

export const getCompanies = async (): Promise<Company[]> => {
  try {
    const response = await axios.get("/companies");
    console.log("Companies API Response:", response.data);
    return response.data || [];
  } catch (err) {
    console.error("Error fetching companies:", err);
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
