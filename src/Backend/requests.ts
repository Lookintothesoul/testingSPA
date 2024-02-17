import axios, { AxiosResponse } from "axios";

type Questions = {
  Id: number;
  name: string;
  QuestionsList: {
    text: string;
    Id: number;
    imageURL: string;
    answers: {
      text: string;
      isCorrect: boolean;
      value: number;
    }[];
  }[];
}[];

type Requests = {
  GetQuestions: () => Promise<AxiosResponse<Questions>>;
};

export const requests: Requests = {
  GetQuestions: () => axios.get("/questions.json"),
};
