import axios from "@/helpers/axios";

export async function getSubscriptions() {
  try {
    const response = await axios.get("/subscriptions");

    return response.data.subscriptions;
  } catch (error) {
    console.log("Error get subscriptions:", error);
  }
}
