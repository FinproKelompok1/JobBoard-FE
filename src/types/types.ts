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

export interface ISubscriptionUsers {
  startDate: string;
  endDate: string;
  isActive: boolean;
  assessmentCount: string;
  user: { email: string };
  subscription: { category: string };
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
