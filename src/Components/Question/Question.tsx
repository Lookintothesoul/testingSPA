import { IAnswer, IQuestion } from "../../Store/Store.ts";
import { observer } from "mobx-react-lite";
import { saveCurrentTestLocal } from "../../Helpers/LocalStorage.ts";
import { getSnapshot } from "mobx-state-tree";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.ts";

const getAnswerColor = (question: IQuestion, answer: IAnswer): string => {
  const userSelectVal = question.getUserSelect();

  if (userSelectVal !== 0) {
    if (answer.isCorrect) {
      return " correct";
    }

    return " incorrect";
  }

  return "";
};

export const Question = observer(({ question }: { question: IQuestion }) => {
  const { Store } = useContext(StoreContext);

  const handleChange = (val: number) => {
    question.setUserSelect(val);
    Store.getCurrentTest().setProgress(
      Store.getCurrentTest().getProgress() + 1,
    );
    saveCurrentTestLocal(getSnapshot(Store.getCurrentTest()));
  };

  return (
    <div className="question-card">
      <div className="question-title">
        {question.imageURL !== "" ? (
          <img src={question.imageURL} alt="img" />
        ) : null}
        <h3>{question.text}</h3>
      </div>
      <div className="question-body">
        {question.answers.map((answer, index) => {
          const selector = `question-${question.Id}-answer-${index}`;

          return (
            <div
              className={"answer-card" + getAnswerColor(question, answer)}
              key={index}
            >
              <input
                onChange={() => handleChange(answer.value)}
                type="radio"
                disabled={question.getUserSelect() !== 0}
                name={`question-${question.Id}`}
                key={`question-${question.Id}`}
                id={selector}
              />
              <label htmlFor={selector}>{answer.text}</label>
            </div>
          );
        })}
      </div>
    </div>
  );
});
