import "./ProgressBar.css";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.ts";
import { IStore } from "../../Store/Store.ts";

//Получение прогресса прохождения теста
const getTestProgress = (Store: IStore): [number, string] => {
  const progress = Math.round(
    (100 * Store.getCurrentTest().getProgress()) /
      Store.getCurrentTest().getQuestionList().length,
  );

  if (progress <= 50) return [progress, " progress-50"];
  if (progress <= 75) return [progress, " progress-75"];
  if (progress <= 100) return [progress, " progress-100"];

  return [0, " progress-50"];
};

//Компонент полоски прогресса прохождения теста
export const ProgressBar = observer(() => {
  const { Store } = useContext(StoreContext);
  const [progress, className] = getTestProgress(Store);

  return (
    <div className="progress-bar-container">
      <div className={"progress-bar"}>
        <div
          className={"progress-strip" + className}
          style={{ width: progress + "%" }}
        ></div>
      </div>
      <div className="progress-counter">
        <span>
          {Store.getCurrentTest().getProgress()}/
          {Store.getCurrentTest().getQuestionList().length}
        </span>
      </div>
    </div>
  );
});
