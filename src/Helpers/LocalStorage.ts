import localforage from "localforage";
import { ITestSnapOut } from "../Store/Store.ts";

//Сохранение текущего теста локально
export const saveCurrentTestLocal = (test: ITestSnapOut) => {
  localforage
    .setItem("currentTest", test)
    .then(() => {})
    .catch(function (err) {
      alert("ошибка сохранения теста локально");
      console.log(err);
    });
};

//Очистка текущего теста из локального хранилища
export const clearCurrentTestLocal = () => {
  localforage.setItem("currentTest", null).then((err) => {
    if (err) {
      alert("Ошибка сохранения текущего теста локально");
    }
  });
};

//Получение текущего теста из локального хранилища
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

//Добавление результата теста в локальное хранилище
export const addResultsLocal = (results: ITestSnapOut[]) => {
  localforage
    .setItem<ITestSnapOut[]>("results", results)
    .then(() => {})
    .catch(function (err) {
      alert("ошибка сохранения результата локально");
      console.log(err);
    });
};

//Получение результатов тестов из локального хранилища
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

//Очистка локального хранилища результатов теста
export const clearResultsLocal = () => {
  localforage
    .setItem("results", [])
    .then(() => {})
    .catch(function (err) {
      alert("Ошибка очистки результатов");
      console.log(err);
    });
};
