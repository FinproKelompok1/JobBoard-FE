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

export interface IDemography {
  age: IAgeDemography[];
  gender: IGenderDemography[];
  location: ILocationDemography[];
}

export interface IJobRole {
  role: string
  avgsalary: number
}

export interface IJobLocation {
  city: string
  avgsalary: number
}

export interface ISalaryTrend {
  basedOnJobRole: IJobRole[]
  basedOnJobLocation: IJobLocation[]
}