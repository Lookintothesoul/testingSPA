import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext.ts";
import { useNavigate } from "react-router-dom";
import "./TestReport.css";
import { IAnswer } from "../../Store/Store.ts";
import { FaCheck } from "react-icons/fa";
import { FaTimes } from "react-icons/fa";

export const TestReport = observer(() => {
  const { Store } = useContext(StoreContext);
  const currReport = Store.CurrentReport[0];
  const navigation = useNavigate();

  useEffect(() => {
    if (!currReport) {
      navigation("/results");
      return;
    }
  }, []);

  const goBackResults = () => {
    Store.clearReport();
    navigation("/results");
  };

  return currReport ? (
    <>
      <h3>
        {currReport.Name} ({currReport.completeDate})
      </h3>
      <div className="UserInfo">
        <span>Имя: {currReport.userName}</span>
        <span>Время прохождения: {currReport.durationTime}</span>
      </div>
      <div className="test-report-container">
        {currReport.QuestionsList.map((question, index) => {
          const userSelected = question.answers.find(
            (el) => el.value === question.userSelect,
          ) as IAnswer;
          const correctAnswer = question.answers.find(
            (el) => el.isCorrect,
          ) as IAnswer;

          return (
            <div key={index} className="test-report-question">
              <div>
                <div>
                  {userSelected.value === correctAnswer.value ? (
                    <FaCheck color={"#198754"} />
                  ) : (
                    <FaTimes color={"#dc3545"} />
                  )}
                </div>
                <span>
                  № {index + 1}. {question.text}
                </span>
              </div>
              <span>Ваш ответ: {userSelected.text}</span>
              <span>Правильный ответ: {correctAnswer.text}</span>
            </div>
          );
        })}
      </div>
      <button className="btn-primary outline" onClick={goBackResults}>
        Вернуться назад
      </button>
    </>
  ) : null;
});
