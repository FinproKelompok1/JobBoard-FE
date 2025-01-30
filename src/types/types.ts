export interface ISubscription {
  id: number;
  category: string;
  price: number;
  feature: string;
}

export interface ISubscriptionForm {
  category: string;
  price: number;
  feature: string;
}

export interface ITransaction {
  id: string;
  userId: number;
  subscriptionId: number;
  amount: number;
  status: string;
  createdAt: string;
  updatedAt: string;
  user: {
    email: string;
  };
  subscription: {
    category: string;
  };
}
