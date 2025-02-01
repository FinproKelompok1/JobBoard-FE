export interface IJob {
  id: string;
  title: string;
  role: string;
  banner: null | string;
  endDate: string;
  salary: string;
  category: string;
  isPublished: boolean;
  isTestActive: boolean;
  description: string;
  tags: string[];
  location: ILocation;
}

interface ILocation {
  city: string;
  province: string;
}
