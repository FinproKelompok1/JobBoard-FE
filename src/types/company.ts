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

export interface Location {
  city: string;
  province: string;
  latitude: number;
  longitude: number;
}

export interface AdminProfile {
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo: string | null;
  location?: Location;
}

export interface CityCoordinates {
  latitude: number;
  longitude: number;
}

export interface ProfileFormData {
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo?: File;
  city?: string;
  province?: string;
  cityCoordinates?: CityCoordinates;
}

export interface Job {
  id: string;
  title: string;
  adminId: number;
  banner: string | null;
  category: string;
  location?: Location;
}

export interface CompanyDetail {
  id: number;
  companyName: string;
  email: string;
  noHandphone: string;
  description: string;
  logo: string | null;
  jobCount: number;
  createdAt: string;
  jobs: Job[];
  location?: Location;
}
