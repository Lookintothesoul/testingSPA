import { useEffect } from "react";
import "./App.css";
import { requests } from "./Backend/requests.ts";
import { Header } from "./Components/Header/Header.tsx";
import { Route, Routes, useNavigate } from "react-router-dom";
import { TestList } from "./Pages/TestsList/TestList.tsx";
import { Results } from "./Pages/Results/Results.tsx";
import { PassingTest } from "./Pages/PassingTest/PassingTest.tsx";
import { IStore, StoreRoot } from "./Store/Store.ts";
import { StoreContext } from "./Context/StoreContext.ts";
import { getResultsLocal } from "./Helpers/LocalStorage.ts";
import { applySnapshot } from "mobx-state-tree";
import { ResultList } from "./Components/ResultList/ResultList.tsx";
import { TestReport } from "./Pages/TestReport/TestReport.tsx";

const Store: IStore = StoreRoot.create();

function App() {
  const navigation = useNavigate();
  //Получаем список тестов при загрузке страницы
  useEffect(() => {
    requests
      .GetQuestions()
      .then((res) => {
        Store.setTestList(res.data);
        //Проверяем, есть ли сохраненные локально результаты, если есть, забираем их
        getResultsLocal().then((res) => {
          if (res) {
            applySnapshot(Store.Results, res);
          }
        });
      })
      .catch((er) => {
        console.log(er);
        navigation("/");
        alert("Ошибка загрузки списка тестов");
      });
  }, []);

  return (
    <StoreContext.Provider value={{ Store }}>
      <main className="main-container">
        <Header />
        <div className="main-body">
          <Routes>
            <Route path="/" element={<TestList />} />
            <Route path="/results" element={<Results />}>
              <Route path="/results" element={<ResultList />} />
              <Route path="report" element={<TestReport />} />
            </Route>
            <Route path="/passingtest" element={<PassingTest />} />
          </Routes>
        </div>
      </main>
    </StoreContext.Provider>
  );
}

export default App;
