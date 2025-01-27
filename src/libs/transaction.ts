import axios from "@/helpers/axios";

export async function getTransactions() {
  try {
    const response = await axios.get("/transactions");

    return response.data.transactions;
  } catch (error) {
    console.log("Error get transactions:", error);
  }
}
