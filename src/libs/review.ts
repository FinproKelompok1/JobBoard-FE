import axios from "@/helpers/axios";

export async function getUserReview(jobId: string) {
  try {
    const response = await axios.get(`/reviews/${jobId}`);

    return response.data.userReview;
  } catch (error) {
    console.error("Error get user review:", error);
  }
}

export async function getCompanyReviews(adminId: number) {
  try {
    const response = await axios.get(`/reviews/company/${adminId}`);

    return {
      companyReviews: response.data.companyReviews || [], // Corrected key for reviews
      companyName: response.data.companyName || "",
    };
  } catch (error) {
    console.error("Error get company reviews:", error);
    return {
      companyReviews: [],
      companyName: "",
    };
  }
}
