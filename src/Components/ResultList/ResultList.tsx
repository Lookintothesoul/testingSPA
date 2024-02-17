import { ResultCard } from "../ResultCard/ResultCard.tsx";
import { useContext } from "react";
import { StoreContext } from "../../Context/StoreContext.ts";
import { observer } from "mobx-react-lite";
import { clearResultsLocal } from "../../Helpers/LocalStorage.ts";

export const ResultList = observer(() => {
  const { Store } = useContext(StoreContext);

  const handleClearResults = () => {
    const result = confirm("Вы уверены?");

    if (result) {
      Store.clearResults();
      clearResultsLocal();
    }
  };

  return (
    <>
      <h3>Результаты</h3>
      {Store.Results.length > 0 ? (
        <>
          {Store.Results.map((result, index) => (
            <ResultCard key={index} result={result} />
          ))}
          <button onClick={handleClearResults} className="btn-danger outline">
            Удалить все
          </button>
        </>
      ) : (
        <span>Ничего не найдено</span>
      )}
    </>
  );
});
