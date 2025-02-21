export interface Company {
  id: number;
  companyName: string;
  email: string;
  description: string;
  logo: string | null;
  isVerified: boolean;
  jobCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProfile {
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo: string | null;
}

export interface ProfileFormData {
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo?: File;
}
