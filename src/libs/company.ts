import axios from "@/helpers/axios";

export const getCompanies = async () => {
  try {
    const response = await axios.get("/companies");
    console.log("Companies response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching companies:", error);
    throw error;
  }
};
