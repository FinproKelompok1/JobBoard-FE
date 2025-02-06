export interface IApplicants {
  userId: number;
  createdAt: string;
  expectedSalary: number;
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
