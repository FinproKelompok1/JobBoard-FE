export interface ISubscription {
  id: number;
  category: string;
  price: number;
  feature: string;
  UserSubscription: { userId: number; isActive: boolean }[];
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

export interface ISubscriptionUsers {
  startDate: string;
  endDate: string;
  isActive: boolean;
  assessmentCount: string;
  user: { email: string; fullname: string };
  subscription: { category: string };
}

export interface IUserSubscription {
  subscriptionId: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  assessmentCount: number;
  subscription: { category: string; price: number };
}

export interface ICvForm {
  summary: string;
  experience: string;
  skill: string;
  education: string;
}

export interface ICv {
  id: number;
  summary: string;
  experience: string;
  skill: string;
  education: string;
}

export interface IUserCv {
  fullname: string;
  email: string;
  location: { city: string; province: string };
  CurriculumVitae: {
    id: number;
    summary: string;
    experience: string;
    skill: string;
    education: string;
  }[];
}

export interface IAssessmentForm {
  title: string;
  description: string;
}

export interface IAssessment {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
  AssessmentQuestion: IAssessmentQuestion[];
  UserAssessment: { User: { username: true } };
}

export interface IAssessmentQuestionForm {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface IAssessmentQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface IUserAssessment {
  userId: number;
  assessmentId: number;
  endTime: string;
  assessment: {
    title: string;
    AssessmentQuestion: {
      id: number;
      question: string;
      options: string[];
      correctAnswer: number;
    };
  };
  User: { username: string };
}
