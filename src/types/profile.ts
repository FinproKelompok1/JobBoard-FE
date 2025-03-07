import { IReview, IUserAssessment } from "./types";

export enum Gender {
  female = "female",
  male = "male",
}

export interface Interview {
  startTime: string;
  jobId: string;
  userId: number;
}

export enum LastEdu {
  highSchoolDiploma = "highSchoolDiploma",
  bachelor = "bachelor",
  diploma = "diploma",
  doctoral = "doctoral",
  master = "master",
}

export enum JobApplicationStatus {
  rejected = "rejected",
  accepted = "accepted",
  processed = "processed",
  interviewed = "interviewed",
}

export interface JobApplication {
  job: {
    title: string;
    admin: {
      id: number;
      companyName: string;
    };
  };
  jobId: string;
  status: JobApplicationStatus;
  expectedSalary: number;
  createdAt: string;
  interview?: Interview;
  rejectedReview?: string;
  selectionTestResult?: number;
  isTaken: boolean;
}

export interface CurriculumVitae {
  id: number;
  summary: string;
  experience: string;
  skill: string;
  education: string;
}

export interface Location {
  id: number;
  city: string;
  province: string;
  latitude: number;
  longitude: number;
}

export interface UserProfile {
  id: number;
  username: string;
  fullname: string | null;
  email: string;
  isVerified: boolean;
  avatar: string;
  gender: Gender | null;
  dob: string | null;
  lastEdu: LastEdu | null;
  province: string | null;
  city: string | null;
  domicileId: number | null;
  location: Location | null;
  CurriculumVitae: CurriculumVitae[];
  JobApplication: JobApplication[];
  Interview: Interview[];
  createdAt: string;
  Review: IReview[];
  UserAssessment: IUserAssessment[];
  UserSubscription: {
    subscriptionId: number;
    isActive: boolean;
    endDate: string;
  }[];
}

export interface AdminProfile {
  id: number;
}

export interface FormValueProfile {
  fullname: string;
  gender: string;
  dob: string;
  lastEdu: string;
  province: string;
  city: string;
  domicileId: number | string;
}
