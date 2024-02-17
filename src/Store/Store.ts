import dayjs from "dayjs";
import {
  clone,
  detach,
  Instance,
  SnapshotIn,
  SnapshotOut,
  types,
} from "mobx-state-tree";
import { getTestDuration } from "../Helpers/Utils.ts";

const Answer = types.model({
  text: types.optional(types.string, ""),
  isCorrect: types.optional(types.boolean, false),
  value: types.number,
});

const Question = types
  .model({
    text: types.optional(types.string, ""),
    imageURL: types.optional(types.string, ""),
    Id: types.optional(types.number, 0),
    answers: types.optional(types.array(Answer), []),
    userSelect: types.optional(types.number, 0),
  })
  .actions((self) => ({
    setUserSelect(val: number) {
      self.userSelect = val;
    },
  }))
  .views((self) => ({
    getUserSelect() {
      return self.userSelect;
    },
  }));

const Test = types
  .model({
    Id: types.number,
    Name: types.optional(types.string, ""),
    QuestionsList: types.optional(types.array(Question), []),
    Progress: types.optional(types.number, 0),
    CurrentQuestion: types.optional(types.number, 0),
    userName: types.optional(types.string, ""),
    completeDate: types.optional(types.string, ""),
    durationTime: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setProgress(val: number) {
      self.Progress = val;
    },
    setCurrentQuestion(val: number) {
      self.CurrentQuestion = val;
    },
    setCompleteDate(str: string) {
      self.completeDate = str;
    },
    setUserName(val: string) {
      self.userName = val;
    },
  }))
  .views((self) => ({
    getProgress() {
      return self.Progress;
    },
    getCurrentQuestion() {
      return self.CurrentQuestion;
    },
    getCorrectQuestion() {
      return self.QuestionsList.filter((question) => {
        const findQuestion = question.answers.find(
          (answer) => answer.value === question.userSelect,
        ) as IAnswer;

        return findQuestion.isCorrect;
      });
    },
    getQuestionList() {
      return self.QuestionsList;
    },
    getCompleteDate() {
      return self.completeDate;
    },
  }));

export const StoreRoot = types
  .model({
    TestList: types.optional(types.array(Test), []),
    CurrentTest: types.optional(types.array(Test), []),
    CurrentReport: types.optional(types.array(Test), []),
    Results: types.optional(types.array(Test), []),
  })
  .actions((self) => ({
    setTestList(arr: ITestSnapIn[]) {
      self.TestList.replace([]);
      self.TestList.push(...arr);
    },
    clearCurrentTest() {
      if (self.CurrentTest[0]) {
        detach(self.CurrentTest[0]);
      }
    },
    addResult() {
      self.CurrentTest[0].setCompleteDate(
        dayjs().format("DD.MM.YYYY HH:mm:ss"),
      );
      self.CurrentTest[0].durationTime = getTestDuration(
        self.CurrentTest[0].durationTime,
      );
      self.Results.push(clone(self.CurrentTest[0]));
      detach(self.CurrentTest[0]);
    },
    clearResults() {
      self.Results.replace([]);
    },
    setCurrentReport(report: ITest) {
      self.CurrentReport.replace([]);
      self.CurrentReport.push(clone(report));
    },
    clearReport() {
      self.CurrentReport.replace([]);
    },
  }))
  .views((self) => ({
    getCurrentTest() {
      return self.CurrentTest[0];
    },
  }));

export interface IStore extends Instance<typeof StoreRoot> {}
export interface ITest extends Instance<typeof Test> {}
export interface ITestSnapIn extends SnapshotIn<ITest> {}
export interface ITestSnapOut extends SnapshotOut<ITest> {}
export interface IQuestion extends Instance<typeof Question> {}
export interface IAnswer extends Instance<typeof Answer> {}
