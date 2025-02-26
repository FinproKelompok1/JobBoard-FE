import axios from "@/helpers/axios";
import { toastErrAxios } from "@/helpers/toast";

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
    toastErrAxios(error);
  }
}

export async function getUserTransaction({
  page = 1,
  limit = 10,
  sort = "createdAt",
  order = "desc",
  status = "",
  email = "",
} = {}) {
  try {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    const response = await axios.get("/user-transactions", {
      params: { page, limit, sort, order, status, email },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      userTransactions: response.data.userTransactions ?? [],
      totalPages: response.data.totalPages ?? 1,
    };
  } catch (error) {
    console.error("Error get user transactions", error);
    return {
      userTransactions: [],
      totalPages: 1,
    };
  }
}
