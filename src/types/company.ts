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
