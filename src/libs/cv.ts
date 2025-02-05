import axios from "@/helpers/axios";

export async function getUserCv(username: string) {
  try {
    const response = await axios.get(`/cv/${username}`);

    return response.data.userCv;
  } catch (error) {
    console.log("Error get user CV:", error);
  }
}

export async function getCvById(cvId: number) {
  try {
    const response = await axios.get(`/cv/detail/${cvId}`);

    console.log("response", response.data);

    return response.data.cv;
  } catch (error) {
    console.log("Error get CV:", error);
  }
}
