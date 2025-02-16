export interface IAgeDemography {
  age: string;
  total: number;
}

export interface IGenderDemography {
  total: number;
  type: "male" | "female";
}

export interface ILocationDemography {
  city: string;
  total: number;
}

export interface IEducationDemography {
  education: string;
  total: number;
  avgSalary: number;
}

export interface IDemography {
  age: IAgeDemography[];
  gender: IGenderDemography[];
  location: ILocationDemography[];
  education: IEducationDemography[];
}

export interface IJobRole {
  role: string;
  avgsalary: number;
}

export interface IJobLocation {
  city: string;
  avgsalary: number;
}

export interface ISalaryTrend {
  basedOnJobRole: IJobRole[];
  basedOnJobLocation: IJobLocation[];
}

export interface IApplicantsInterestCategory {
  category: string;
  total: number;
}

export interface IExptectedSalary {
  category: string;
  avgsalary: number;
}

export interface IApplicantsInterest {
  basedOnJobCategory: IApplicantsInterestCategory[];
  basedOnExpectedSalary: IExptectedSalary[];
}
