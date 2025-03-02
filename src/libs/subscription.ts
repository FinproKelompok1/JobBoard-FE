import axios from "@/helpers/axios";

export async function getSubscriptions() {
  try {
    const response = await axios.get("/subscriptions");

    return response.data.subscriptions;
  } catch (error) {
    console.error("Error get subscriptions:", error);
  }
}

export async function getSubscriptionById(subscriptionId: number) {
  try {
    const response = await axios.get(`/subscriptions/${subscriptionId}`);

    return response.data.subscription;
  } catch (error) {
    console.error("Error get subscriptions:", error);
  }
}

export async function deleteSubscription(id: number) {
  try {
    const response = await axios.delete(`/subscriptions/${id}`);

    return response;
  } catch (error) {
    console.error(`Error delete subscription by ID ${id}`, error);
  }
}

export async function getSubscriptionUsers(id: number) {
  try {
    const response = await axios.get(`/subscriptions/${id}/users`);

    return response.data.subscriptionUsers;
  } catch (error) {
    console.error("Error get subscription users:", error);
  }
}

export async function getUserSubscription(username: string) {
  try {
    const response = await axios.get(`/user-subscriptions/${username}`);

    return response.data.userSubscription;
  } catch (error) {
    console.error("Error get user subscription:", error);
  }
}
