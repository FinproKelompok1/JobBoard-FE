import axios from "@/helpers/axios";

export async function getTransactions({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc",
  status = "",
  email = "",
} = {}) {
  try {
    const response = await axios.get("/transactions", {
      params: { page, limit, sort, order, status, email },
    });
    console.log("get transactions response:", response.data.transactions);
    return {
      transactions: response.data.transactions,
      totalPages: response.data.totalPages,
    };
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return { transactions: [], totalPages: 1 };
  }
}

export async function getTransactionsById(transactionId: string) {
  try {
    const response = await axios.get(`/transactions/${transactionId}`);

    return response.data.transaction;
  } catch (error) {
    console.error("Error get transactions:", error);
  }
}

export async function getTransactionToken(id: string, amount: number) {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];

    const { data } = await axios.post(
      "/transactions/payment",
      {
        order_id: id,
        gross_amount: +amount,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return data.transactionToken;
  } catch (error) {
    console.error("Error get transaction token:", error);
  }
}

export async function getUserTransaction(username: string) {
  try {
    const response = await axios.get(`/user-transactions/${username}`);

    return response.data.userTransactions;
  } catch (error) {
    console.error("Error get user transactions", error);
  }
}
