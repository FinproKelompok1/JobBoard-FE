export interface IPreselection {
  id: number;
  title: string;
  description: string;
}

export interface IPreselectionQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
}
