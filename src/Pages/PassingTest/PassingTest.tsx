import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext.ts";
import { Question } from "../../Components/Question/Question.tsx";

import "./PassingTest.css";
import { ProgressBar } from "../../Components/ProgressBar/ProgressBar.tsx";
import { useNavigate } from "react-router-dom";
import {
  addResultsLocal,
  getCurrentTestLocal,
  saveCurrentTestLocal,
} from "../../Helpers/LocalStorage.ts";
import { applySnapshot, getSnapshot } from "mobx-state-tree";

//Страница прохождения теста
export const PassingTest = observer(() => {
  const { Store } = useContext(StoreContext);
  const navigation = useNavigate();
  const curTest = Store.getCurrentTest();

  //Проверяем, был ли открытый тест до загрузки страницы, если есть, отображаем его
  useEffect(() => {
    getCurrentTestLocal().then((localTest) => {
      if (localTest !== null) {
        applySnapshot(Store.CurrentTest, [localTest]);
        navigation("/passingtest");
        return;
      }
    });

    if (!curTest) {
      navigation("/");
      return;
    }

    saveCurrentTestLocal(getSnapshot(curTest));
  }, []);

  //Переключение на след. вопрос
  const handleNextQuestion = () => {
    curTest.setCurrentQuestion(curTest.CurrentQuestion + 1);
    saveCurrentTestLocal(getSnapshot(curTest));
  };

  //Заверешние теста
  const handleEndTest = () => {
    Store.addResult();
    addResultsLocal(getSnapshot(Store.Results));
    navigation("/results");
  };

  //Закрытие теста
  const handleCloseTest = () => {
    const result = confirm("Тест не завершен, продолжить?");

    if (result) {
      navigation("/");
      Store.clearCurrentTest();
    }
  };

  return curTest ? (
    <div className="selected-test-container">
      <ProgressBar />
      {<Question question={curTest.QuestionsList[curTest.CurrentQuestion]} />}
      <div className="selected-test-footer">
        {curTest.getProgress() !== curTest.getQuestionList().length ? (
          <button
            className="btn-primary"
            disabled={
              curTest.QuestionsList[curTest.CurrentQuestion].getUserSelect() ===
              0
            }
            onClick={handleNextQuestion}
          >
            Следующий вопрос
          </button>
        ) : (
          <button
            className="btn-success"
            disabled={
              curTest.QuestionsList[curTest.CurrentQuestion].getUserSelect() ===
              0
            }
            onClick={handleEndTest}
          >
            Завершить тест
          </button>
        )}
        <button className="btn-danger" onClick={handleCloseTest}>
          Выйти
        </button>
      </div>
    </div>
  ) : null;
});
