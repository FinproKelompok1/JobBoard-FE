export interface FormValueJob {
  title: string;
  role: string;
  banner: File | null | string;
  endDate: string;
  province: string;
  city: string;
  category: string;
  salary: string;
  description: string;
  tags: string;
}

export interface FormValuePreselection {
  title: string;
  description: string;
  preselectionQuestions: IPreselectionQuestion[];
}

interface IPreselectionQuestion {
  question: string;
  options: string[];
  correctAnswer: number | null;
}

export interface FormValueCompletingTask {
  answer: IAnswer[];
}

export interface IAnswer {
  id: number;
  correctAnswer: number;
  selectedOption: number | null;
}
