import axios from "@/helpers/axios";

export async function getSubscriptions() {
  try {
    const response = await axios.get("/subscriptions");

    return response.data.subscriptions;
  } catch (error) {
    console.log("Error get subscriptions:", error);
  }
}

export async function getSubscriptionById(subscriptionId: number) {
  try {
    const response = await axios.get(`/subscriptions/${subscriptionId}`);

    return response.data.subscription;
  } catch (error) {
    console.log("Error get subscriptions:", error);
  }
}

export async function deleteSubscription(id: number) {
  try {
    const response = await axios.delete(`/subscriptions/${id}`);

    return response.data.message;
  } catch (error) {
    console.log("Error get subscriptions:", error);
  }
}

export async function getSubscriptionUsers(id: number) {
  try {
    const response = await axios.get(`/subscriptions/${id}/users`);

    return response.data.subscriptionUsers;
  } catch (error) {
    console.log("Error get subscription users:", error);
  }
}
