export interface IJob {
  id: string;
  title: string;
  category: string;
  isPublished: boolean;
  isTestActive: boolean;
}

export interface IJobEdit {
  title: string;
  role: string;
  banner: null | string;
  endDate: string;
  salary: string;
  category: string;
  description: string;
  tags: string[];
  location: ILocation;
}

interface ILocation {
  city: string;
  province: string;
}
