import localforage from "localforage";
import { ITestSnapOut } from "../Store/Store.ts";

export const saveCurrentTestLocal = (test: ITestSnapOut) => {
  localforage
    .setItem("currentTest", test)
    .then(() => {})
    .catch(function (err) {
      alert("ошибка сохранения теста локально");
      console.log(err);
    });
};

export const clearCurrentTestLocal = () => {
  localforage.setItem("currentTest", null).then((err) => {
    if (err) {
      alert("Ошибка сохранения текущего теста локально");
    }
  });
};

export const getCurrentTestLocal = () =>
  localforage
    .getItem<ITestSnapOut>("currentTest")
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      alert("Ошибка получения последнего теста");
      console.log(err);
      return null;
    });

export const addResultsLocal = (results: ITestSnapOut[]) => {
  localforage
    .setItem<ITestSnapOut[]>("results", results)
    .then(() => {})
    .catch(function (err) {
      alert("ошибка сохранения результата локально");
      console.log(err);
    });
};

export const getResultsLocal = () =>
  localforage
    .getItem<ITestSnapOut[]>("results")
    .then(function (value) {
      return value;
    })
    .catch(function (err) {
      alert("Ошибка получения последнего теста");
      console.log(err);
      return null;
    });

export const clearResultsLocal = () => {
  localforage
    .setItem("results", [])
    .then(() => {})
    .catch(function (err) {
      alert("Ошибка очистки результатов");
      console.log(err);
    });
};
