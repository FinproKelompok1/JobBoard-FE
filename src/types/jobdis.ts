export interface Job {
  id: string;
  title: string;
  adminId: number;
  banner?: string;
  category: JobCategory;
  role: string;
  salary?: number;
  description: string;
  endDate: string;
  isPublished: boolean;
  isTestActive: boolean;
  tags: string[];
  locationId: number;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  location: {
    city: string;
    province: string;
  };
  admin: {
    companyName: string;
    logo?: string;
    description: string;
  };
}

export enum JobCategory {
  accountancy = "accountancy",
  sales = "sales",
  marketing = "marketing",
  engineering = "engineering",
  construction = "construction",
  tourism = "tourism",
  administration = "administration",
  manufacture = "manufacture",
  informatics = "informatics",
}
