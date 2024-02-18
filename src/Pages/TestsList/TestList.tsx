import { TestCard } from "../../Components/TestCard/TestCard.tsx";
import { observer } from "mobx-react-lite";
import { useContext, useEffect } from "react";
import { StoreContext } from "../../Context/StoreContext.ts";
import "./TestList.css";
import { clearCurrentTestLocal } from "../../Helpers/LocalStorage.ts";

//Страница со списков тестов
export const TestList = observer(() => {
  const { Store } = useContext(StoreContext);

  //При каждом возвращении на эту страницу очищаем текущий тест из стора и локального хранилища
  useEffect(() => {
    Store.clearCurrentTest();
    clearCurrentTestLocal();
  }, []);

  return (
    <div className="tests-container">
      <h3>Список тестов</h3>
      {Store.TestList.length > 0 ? (
        Store.TestList.map((test) =>
          test.QuestionsList.length > 0 ? (
            <TestCard key={test.Id} test={test} />
          ) : null,
        )
      ) : (
        <h3>Ничего не найдено</h3>
      )}
    </div>
  );
});
