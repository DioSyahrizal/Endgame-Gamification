export interface SoalInterface {
  id: number;
  question: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  answer: string;
  level: string;
  image: string;
  matpel: string;
}

export interface SoalUserInterface {
  id: number;
  question: string;
  opt1: string;
  opt2: string;
  opt3: string;
  opt4: string;
  answer: string;
  level: string;
  image: string;
  matpel: string;
  id_soaluser: number;
  result: boolean | null;
}
