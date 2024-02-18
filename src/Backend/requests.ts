import axios, { AxiosResponse } from "axios";

//Тип ответа на получение тестов
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

//Тип запроса на получение тестов
type Requests = {
  GetQuestions: () => Promise<AxiosResponse<Questions>>;
};

//обращения к беку
export const requests: Requests = {
  GetQuestions: () => axios.get("/questions.json"),
};
