import "./ResultCard.css";
import { ITest } from "../../Store/Store.ts";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.ts";
import { applySnapshot } from "mobx-state-tree";
import { getNewTestSnapShot } from "../../Helpers/Utils.ts";

//Компонент результата прохождения теста
export const ResultCard = ({ result }: { result: ITest }) => {
  const { Store } = useContext(StoreContext);
  const navigation = useNavigate();

  //Перепройти тест
  const handleOpenTest = () => {
    const findTest = Store.TestList.find((test) => test.Id === result.Id);

    if (findTest) {
      const name = prompt(
        "Введите имя (если хотите оставить такое же, оставьте строку пустой)",
      );

      if (name !== null) {
        const newName = name.length > 0 ? name : result.userName;
        applySnapshot(Store.CurrentTest, [
          getNewTestSnapShot(findTest, newName),
        ]);
        navigation("/passingtest");
      }

      return;
    }

    alert("Тест не найден в доступных");
  };

  //Открыть подробный отчет о прохождении теста
  const handleOpenReport = () => {
    Store.setCurrentReport(result);
    navigation("/results/report");
  };

  return (
    <div className="result-card">
      <div className="result-title">
        <div>
          <span>{result.Name}</span>
          <span>({result.getCompleteDate()})</span>
        </div>
        <div>
          <button className="btn-primary outline" onClick={handleOpenReport}>
            Подробнее
          </button>
          <button className="btn-primary outline" onClick={handleOpenTest}>
            Пройти еще раз
          </button>
        </div>
      </div>
      <div className="result-body">
        <span>Имя: {result.userName}</span>
        <span>
          Баллы: {result.getCorrectQuestion().length}/
          {result.getQuestionList().length}
        </span>
      </div>
    </div>
  );
};
