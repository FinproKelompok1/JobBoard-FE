import axios from "@/helpers/axios";

export async function getAssessments() {
  try {
    const response = await axios.get("/assessments");

    return response.data.assessments;
  } catch (error) {
    console.error("Error get assessments:", error);
  }
}

export async function getAssessmentById(assessmentId: number) {
  try {
    const response = await axios.get(`/assessments/${assessmentId}`);

    return response.data.assessment;
  } catch (error) {
    console.error("Error get assessments:", error);
  }
}

export async function getAssessmentQuestions(
  assessmentId: number,
  page: number = 1,
  limit: number = 5,
) {
  try {
    const response = await axios.get(
      `/assessments/${assessmentId}/questions?page=${page}&limit=${limit}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error get assessments:", error);
  }
}

export async function getUserAssessmentById(userAssessmentId: number) {
  try {
    const response = await axios.get(`/user-assessments/${userAssessmentId}`);

    return response.data.userAssessment;
  } catch (error) {
    console.error("Error get user assessment by ID:", error);
  }
}
