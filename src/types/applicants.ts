export interface IApplicants {
  userId: number;
  createdAt: string;
  expectedSalary: number;
  rejectedReview: string;
  selectionTestResult: number | null;
  resume: string;
  status: string;
  user: IUser;
}

interface IUser {
  avatar: string;
  fullname: string;
  dob: string;
  lastEdu: string;
  email: string;
}
