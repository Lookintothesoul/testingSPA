import { ITest, ITestSnapIn, ITestSnapOut } from "../Store/Store.ts";
import { getSnapshot } from "mobx-state-tree";
import dayjs from "dayjs";

//Форматы
export const DateFormat = "DD.MM.YYYY HH:mm:ss";

//Перетасовывание массива
const shuffleArr = <T>(arr: T[]) => {
  for (let i = arr.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1)); // случайный индекс от 0 до i
    [arr[i], arr[j]] = [arr[j], arr[i]]; //меняем элементы местами через деструкторизацию
  }
};

//Получение снимка модели теста для прохождения
export const getNewTestSnapShot = (test: ITest, value: string): ITestSnapIn => {
  const selectTest: ITestSnapOut = getSnapshot(test);

  return {
    ...selectTest,
    durationTime: dayjs().format(DateFormat),
    userName: value,
    QuestionsList: selectTest.QuestionsList.map((question) => {
      const answersArr = [...question.answers];
      shuffleArr(answersArr);
      return {
        ...question,
        answers: answersArr,
      };
    }),
  };
};

//Форматирование даты
const reverseDate = (date: string) => {
  const splitDate = date.split(" ");
  const reverseDate = splitDate[0].split(".").reverse().join("-");

  return `${reverseDate} ${splitDate[1]}`;
};

//Получение час,мин,сек на прохождение теста
export const getTestDuration = (date: string) => {
  const currentDate = dayjs();
  const startDate = dayjs(reverseDate(date));
  const diff = currentDate.diff(startDate);
  const diffHours = Math.floor(diff / 3600000);
  const diffMinutes = Math.floor((diff - diffHours * 3600000) / 60000);
  const diffSeconds = Math.floor(
    (diff - diffHours * 3600000 - diffMinutes * 60000) / 1000,
  );
  let duration = "";

  if (diffHours > 0) {
    duration += `${diffHours} час.`;
  }

  if (diffMinutes > 0) {
    duration += ` ${diffMinutes} мин.`;
  }

  if (diffSeconds > 0) {
    duration += ` ${diffSeconds} сек.`;
  }

  return duration;
};
