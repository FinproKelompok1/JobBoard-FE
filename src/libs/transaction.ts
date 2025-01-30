import axios from "@/helpers/axios";

export async function getTransactions() {
  try {
    const response = await axios.get("/transactions");

    return response.data.transactions;
  } catch (error) {
    console.log("Error get transactions:", error);
  }
}

export async function getTransactionsById(id: string) {
  try {
    const response = await axios.get(`/transactions/${id}`);

    return response.data.transaction;
  } catch (error) {
    console.log("Error get transactions:", error);
  }
}
