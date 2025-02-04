import axios from "@/helpers/axios";

export async function getTransactions() {
  try {
    const response = await axios.get("/transactions");

    return response.data.transactions;
  } catch (error) {
    console.log("Error get transactions:", error);
  }
}

export async function getTransactionsById(transactionId: string) {
  try {
    const response = await axios.get(`/transactions/${transactionId}`);

    return response.data.transaction;
  } catch (error) {
    console.log("Error get transactions:", error);
  }
}

export async function getTransactionToken(id: string, amount: number) {
  try {
    const { data } = await axios.post("/transactions/payment", {
      order_id: id,
      gross_amount: +amount,
    });

    return data.transactionToken;
  } catch (error) {
    console.log("Error get transaction token:", error);
  }
}
