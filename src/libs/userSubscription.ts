import axios from "@/helpers/axios";

export async function getUserSubscription(username: string) {
  try {
    const response = await axios.get(`/user-subscription/${username}`);

    return response.data.userSubscription;
  } catch (error) {
    console.log("Error get user subscription:", error);
  }
}
